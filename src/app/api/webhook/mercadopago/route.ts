import { NextResponse, NextRequest } from "next/server";
import { MercadoPagoConfig, Payment } from "mercadopago";
import { DataSource } from "@/services/datasource";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("Webhook MercadoPago received:", JSON.stringify(body));

    if (body.type !== "payment") {
      console.error("No es una notificación de pago");
      return NextResponse.json(
        { message: "No es una notificación de pago" },
        { status: 200 }
      );
    }

    const paymentId = body.data?.id;

    console.log("🔧 Payment ID recibido:", paymentId);
    console.log("🔧 Tipo de Payment ID:", typeof paymentId);
    console.log("🔧 live_mode del webhook:", body.live_mode);
    console.log("🔧 user_id del webhook:", body.user_id);
    console.log(
      "🔧 ACCESS_TOKEN usado:",
      process.env.MERCADOPAGO_ACCESS_TOKEN?.substring(0, 20) + "..."
    );

    if (!paymentId) {
      console.error("No se encontró el ID de pago");
      return NextResponse.json(
        { message: "No se encontró el ID de pago" },
        { status: 200 }
      );
    }

    const client = new MercadoPagoConfig({
      accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN!,
    });
    const payment = new Payment(client);
    console.log("🔧 Payment client creado correctamente");

    let paymentInfo;
    try {
      paymentInfo = await payment.get({
        id: paymentId,
      });
      console.log("🔧 Payment info obtenida:", paymentInfo);
    } catch (paymentError: unknown) {
      console.error("❌ Error al obtener payment info:", paymentError);

      // Si es un 404, significa que el pago no existe (posiblemente de otro ambiente)
      if (
        paymentError &&
        typeof paymentError === "object" &&
        "status" in paymentError &&
        paymentError.status === 404
      ) {
        console.log(
          "Payment not found - posiblemente de diferente ambiente (test vs prod)"
        );
        return NextResponse.json(
          {
            message:
              "Pago no encontrado - posiblemente de diferente ambiente (test vs prod)",
          },
          { status: 200 }
        );
      }

      throw paymentError;
    }

    if (!paymentInfo) {
      console.error("No se pudo obtener la información del pago");
      return NextResponse.json(
        { message: "No se pudo obtener la información del pago" },
        { status: 200 }
      );
    }

    if (paymentInfo.status === "approved") {
      const resourceId = paymentInfo.external_reference;

      if (!resourceId) {
        throw new Error("No se encontró el ID del recurso");
      }

      const dataSource = new DataSource();
      const subscriberResources = await dataSource.getSubscriberResources({
        resource_id: resourceId,
        subscriber_id: paymentInfo.payer?.identification?.number,
      });

      if (!subscriberResources.length) {
        throw new Error("No se encontro el subscriber resource");
      }

      await dataSource.updateSubscriberResource(subscriberResources[0].id, {
        payment_confirmed: true,
      });

      console.log(
        `Se actualizo el estado del pago para el subscriber resource: ${subscriberResources[0].id}`
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
