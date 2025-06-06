import { NextResponse, NextRequest } from "next/server";
import { MercadoPagoConfig, Payment } from "mercadopago";
import { DataSource } from "@/services/datasource";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("Webhook MercadoPago received:", JSON.stringify(body, null, 2));

    // Verificar que es una notificación de payment
    if (body.type !== "payment") {
      return NextResponse.json(
        { message: "Not a payment notification" },
        { status: 200 },
      );
    }

    const paymentId = body.data?.id;
    if (!paymentId) {
      return NextResponse.json(
        { message: "No payment ID found" },
        { status: 400 },
      );
    }

    // Configurar cliente de MercadoPago
    const client = new MercadoPagoConfig({
      accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN!,
    });

    // Obtener información del pago
    const payment = new Payment(client);
    const paymentInfo = await payment.get({ id: paymentId });

    console.log("Payment info:", JSON.stringify(paymentInfo, null, 2));

    // Verificar si el pago fue aprobado
    if (paymentInfo.status === "approved") {
      const externalReference = paymentInfo.external_reference;

      if (!externalReference) {
        console.error("No external reference found in payment");
        return NextResponse.json(
          { message: "No external reference" },
          { status: 400 },
        );
      }

      // Buscar la suscripción del usuario para este recurso
      const dataSource = new DataSource();

      // Obtener el subscriber_resource por resource_id y payer email
      const subscriberResources = await dataSource.getSubscriberResources({
        resource_id: externalReference,
      });

      // Buscar el subscriber resource que coincida con el email del pago
      const payerEmail = paymentInfo.payer?.email;
      const matchingSubscriberResource = subscriberResources.find(
        (sr) => sr.subscriber.email === payerEmail && !sr.payment_confirmed,
      );

      if (!matchingSubscriberResource) {
        console.error("No matching subscriber resource found for payment", {
          payerEmail,
          resourceId: externalReference,
        });
        return NextResponse.json(
          { message: "Subscriber resource not found" },
          { status: 404 },
        );
      }

      // Actualizar el estado del pago a confirmado
      await dataSource.updateSubscriberResource(matchingSubscriberResource.id, {
        payment_confirmed: true,
      });

      console.log(
        `Payment confirmed for subscriber resource: ${matchingSubscriberResource.id}`,
      );
    }

    return NextResponse.json(
      { message: "Webhook processed successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error processing MercadoPago webhook:", error);
    return NextResponse.json(
      { error: "Failed to process webhook" },
      { status: 500 },
    );
  }
}
