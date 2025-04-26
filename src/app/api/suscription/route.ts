import { Subscriber, SubscriberSchema } from "@/app/schema";
import { getWelcomeEmail } from "@/lib/emails/templates/welcome";
import { DataSource } from "@/services/datasource";
import { EmailService } from "@/services/email";
import { NextResponse, NextRequest } from "next/server";
import { ZodError } from "zod";

export async function POST(req: NextRequest) {
  try {
    const body: {
      subscriber: Subscriber;
      resource_id: string;
      how_did_you_hear: string;
      why_you_are_interested: string;
    } = await req.json();

    const subscriberData: Subscriber = SubscriberSchema.parse(body.subscriber);

    const datasource = new DataSource();

    let subscriber = await datasource.findSubscriberByEmailOrDocument(subscriberData.email, subscriberData.identity_document);

    if (!subscriber) {
      const { data: createdSubscriber, status } = await datasource.createSubscriber(subscriberData);
      if (status !== 201) {
        return NextResponse.json({ error: "No se pudo registrar el suscriptor" }, { status: 400 });
      }
      subscriber = createdSubscriber[0];
    }

    const { data: subscriberResource, status: subscriberResourceStatus } = await datasource.createSubscriberResource({
      subscriber_id: subscriber.id,
      resource_id: body.resource_id,
      how_did_you_hear: body.how_did_you_hear,
      why_you_are_interested: body.why_you_are_interested,
      payment_confirmed: false,
    });

    if (subscriberResourceStatus !== 201) {
      return NextResponse.json({ error: "No se pudo registrar la inscripción" }, { status: 400 });
    }

    console.log(subscriberResource)

    const response = NextResponse.json(
      {
        message: "Inscripción exitosa",
        redirect_url: `/congrats/${body.resource_id}`,
      },
      { status: 201 }
    );

    try {
      const resource = await datasource.getResource(body.resource_id);
      if (resource.length > 0) {
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
