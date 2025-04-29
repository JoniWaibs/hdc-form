import { SubscriberResourcePostSchema } from "@/app/schema";
import { getWelcomeEmail } from "@/lib/emails/templates/welcome";
import { DataSource } from "@/services/datasource";
import { EmailService } from "@/services/email";
import { NextResponse, NextRequest } from "next/server";
import { ZodError } from "zod";

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.json();

    const body = SubscriberResourcePostSchema.parse(rawBody);

    const datasource = new DataSource();

    let subscriber = await datasource.findSubscriberByEmailOrDocument(body.subscriber.email, body.subscriber.identity_document);

    if (!subscriber.length) {
      const { data: createdSubscriber, status } = await datasource.createSubscriber(body.subscriber);
      if (status !== 201 || !createdSubscriber || createdSubscriber.length === 0) {
        return NextResponse.json({ error: "No se pudo registrar el suscriptor" }, { status: 400 });
      }
      subscriber = createdSubscriber;
    }

    try {
      await datasource.createSubscriberResource({
        subscriber_id: subscriber[0].id,
        resource_id: body.resource_id,
        how_did_you_hear: body.how_did_you_hear,
        why_you_are_interested: body.why_you_are_interested,
        payment_confirmed: false,
      });
    } catch (err) {
      const message = (err as Error).message;
      const statusCode = message.includes("Ya estás inscripto en este recurso") ? 409 : 400;
      return NextResponse.json({ error: message }, { status: statusCode });
    }

    const response = NextResponse.json(
      {
        message: "Inscripción exitosa",
        redirect_url: `/congrats/${body.resource_id}`,
      },
      { status: 201 }
    );

    try {
      const resource = await datasource.getResourceById(body.resource_id);
      if (resource) {
        const emailContent = getWelcomeEmail({ subscriber: body.subscriber, resource: resource[0] });
        await new EmailService().sendEmail({
          to: body.subscriber.email,
          subject: emailContent.subject,
          html: emailContent.html,
        });
      }
    } catch (err) {
      console.error(`Error al enviar el email de bienvenida: ${(err as Error).message}`);
    }

    return response;
  } catch (error: unknown) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: "Datos inválidos", issues: error.errors }, { status: 400 });
    }

    return NextResponse.json(
      {
        error: `No se pudo completar el registro. Error: ${(error as Error).message}`,
      },
      { status: 500 }
    );
  }
}
