import { DataSource } from "@/services/datasource";
import { parseISO, differenceInCalendarDays } from "date-fns";
import { NextResponse } from "next/server";
import { getReminderEmail } from "@/lib/emails/templates/reminder";
import { EmailService } from "@/services/email";


export async function GET() {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const datasource = new DataSource();

  try {
    const resources = await datasource.getAllResources();

    const resourcesStartingTomorrow = resources.filter(resource => {
      const startDate = parseISO(resource.start_date);
      return differenceInCalendarDays(startDate, tomorrow) === 0;
    });

    if (resourcesStartingTomorrow.length === 0) {
      return NextResponse.json({ message: "No hay cursos que comiencen mañana" });
    }

    for (const resource of resourcesStartingTomorrow) {
      const subscriberResources = await datasource.getSubscriberResources({ resource_id: resource.id });

      const confirmedSubscribers = subscriberResources.filter(subscriberResource => subscriberResource);

      if (confirmedSubscribers.length === 0) {
        console.log(`No hay suscriptores confirmados para el curso ${resource.name}`);
        continue;
      }

      for (const subscriberResource of confirmedSubscribers) {
        const subscriber = await datasource.getSubscriberById(subscriberResource.subscriber.id!);

        if (!subscriber) {
          console.warn(`No se encontró suscriptor con id ${subscriberResource.subscriber.id}`);
          continue;
        }

        const emailContent = getReminderEmail({ subscriber: subscriber[0], resource });
        try {
          await new EmailService().sendEmail({
            to: subscriber[0].email,
            subject: emailContent.subject,
            html: emailContent.html,
          });
        } catch (emailError) {
          console.error(`Error enviando email a ${subscriber[0].email}:`, (emailError as Error).message);
        }
      }
    }

    return NextResponse.json({ message: "Recordatorios enviados correctamente" });

  } catch (error) {
    console.error("Error general:", error);
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
