import { NextResponse, NextRequest } from "next/server";
import { DataSource } from "@/services/datasource";
import { MercadoPagoService } from "@/services/mercadopago";
import { EmailService } from "@/services/email";
import { getConfirmationEmail } from "@/lib/emails/templates/confirmation";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("Webhook MercadoPago received");

    if (body.type !== "payment") {
      console.error("No es una notificación de pago");
      return NextResponse.json(
        { message: "No es una notificación de pago" },
        { status: 200 }
      );
    }

    const mercadoPagoService = new MercadoPagoService();
    const paymentInfo = await mercadoPagoService.getPayment(body.data?.id);

    if (paymentInfo && paymentInfo.status === "approved") {
      const externalReference = jwt.verify(
        paymentInfo.external_reference!,
        process.env.JWT_SECRET!
      ) as { resourceId: string; subscriberId: string };

      console.log("externalReference", externalReference);

      const dataSource = new DataSource();
      const subscriberResources = await dataSource.getSubscriberResources({
        subscriber_id: externalReference.subscriberId,
        resource_id: externalReference.resourceId,
      });

      if (!subscriberResources.length) {
        throw new Error("No se encontro el subscriber resource");
      }

      await dataSource.updateSubscriberResource(subscriberResources[0].id, {
        payment_confirmed: true,
      });

      console.log(
        `Estado de pago actualizado, usuario ${subscriberResources[0].subscriber.id}, estado del pago: ${subscriberResources[0].payment_confirmed}`
      );

      const mailer = new EmailService();
      const emailContent = getConfirmationEmail({
        subscriber: subscriberResources[0].subscriber,
        resource: subscriberResources[0].resource,
      });

      await mailer.sendEmail({
        to: subscriberResources[0].subscriber.email,
        subject: emailContent.subject,
        html: emailContent.html,
      });

      console.log(
        `Email enviado al usuario ${subscriberResources[0].subscriber.id}`
      );
    }

    return NextResponse.json(
      {
        message: "Webhook procesado exitosamente",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(`Fallo al procesar el webhook: ${JSON.stringify(error)}`);
    return NextResponse.json(
      { error: `Fallo al procesar el webhook: ${JSON.stringify(error)}` },
      { status: 500 }
    );
  }
}
