import { NextResponse, NextRequest } from "next/server";
import { DataSource } from "@/services/datasource";
import {
  SubscriberResourcesList,
  SubscriberResourcesSchema,
} from "@/app/schema";
import { EmailService } from "@/services/email";
import { getConfirmationEmail } from "@/lib/emails/templates/confirmation";

export async function GET(req: NextRequest) {
  const subscriberId = req.nextUrl.searchParams.get("subscriber_id");
  const resourceId = req.nextUrl.searchParams.get("resource_id");

  try {
    const subscriberResources: SubscriberResourcesList =
      await new DataSource().getSubscriberResources({
        ...(subscriberId && { subscriber_id: subscriberId }),
        ...(resourceId && { resource_id: resourceId }),
      });

    return NextResponse.json({
      message: "Todos los recursos obtenidos",
      data: subscriberResources,
      status: 200,
    });
  } catch (error) {
    console.error(
      "Error en /api/subscriber-resources:",
      (error as Error).message,
    );
    return NextResponse.json(
      {
        error: `No se pudieron obtener los recursos. Intentá más tarde. Error: ${(error as Error).message}`,
      },
      { status: 500 },
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const rawBody = await req.json();
    const { subscriber_resource, payment_confirmed } = rawBody;

    const subscriberResource =
      SubscriberResourcesSchema.parse(subscriber_resource);

    const {
      id: subscriberResourceId,
      subscriber,
      resource,
    } = subscriberResource;

    if (!subscriberResourceId) {
      return NextResponse.json(
        { error: "El ID del recurso del suscriptor es requerido" },
        { status: 400 },
      );
    }

    const dataSource = new DataSource();
    const result = await dataSource.updateSubscriberResource(
      subscriberResourceId,
      {
        payment_confirmed,
      },
    );

    const response = NextResponse.json({
      message: "Recurso del suscriptor actualizado correctamente",
      data: result,
      status: 200,
    });

    try {
      if (result) {
        const emailContent = getConfirmationEmail({ subscriber, resource });
        await new EmailService().sendEmail({
          to: subscriber.email,
          subject: emailContent.subject,
          html: emailContent.html,
        });
      }
    } catch (error) {
      console.error(
        `Error al enviar el email de confirmación de pago: ${(error as Error).message}`,
      );
    }

    return response;
  } catch (error) {
    console.error(
      "Error en PATCH /api/subscriber-resources:",
      (error as Error).message,
    );
    return NextResponse.json(
      {
        error: `No se pudo actualizar el recurso del suscriptor. Intentá más tarde. Error: ${(error as Error).message}`,
      },
      { status: 500 },
    );
  }
}
