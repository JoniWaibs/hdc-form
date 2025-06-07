import { NextResponse, NextRequest } from "next/server";
import { DataSource } from "@/services/datasource";
import { MercadoPagoService } from "@/services/mercadopago";

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

    const mercadoPagoService = new MercadoPagoService();
    const paymentInfo = await mercadoPagoService.getPayment(body.data?.id);

    if (paymentInfo.status === "approved") {
      const resourceId = paymentInfo.external_reference;

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
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing MercadoPago webhook:", error);
    return NextResponse.json(
      { error: "Failed to process webhook" },
      { status: 500 }
    );
  }
}
