import { Resource } from "@/app/schema"
import { DataSource } from "@/services/datasource"
import { parseISO, differenceInCalendarDays } from "date-fns"
import { NextResponse } from "next/server"
import { getReminderEmail } from "@/lib/emails/templates/reminder"
import { EmailService } from "@/services/email"

export async function GET() {
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(today.getDate() + 1)

    try {
       const resources = await new DataSource().getAllResources()
    
        const resourcesStartingTomorrow = resources.filter((resource: Resource) => {
            const startDate = parseISO(resource.start_date)
            return differenceInCalendarDays(startDate, tomorrow) === 0
        })

        if (resourcesStartingTomorrow.length === 0) {
            return NextResponse.json({ message: 'No hay cursos para mañana' })
        }

        for (const resource of resourcesStartingTomorrow) {
            const suscriptors = await new DataSource().getSuscribers(resource.id)
      
            if (!suscriptors) {
                return NextResponse.json({ message: 'No hay suscriptores para este curso' })
            }

            for (const suscriptor of suscriptors) {
              const emailContent = getReminderEmail({ suscriptor, resource })
              await new EmailService().sendEmail({
                to: suscriptor.email,
                subject: emailContent.subject,
                html: emailContent.html,
            })
            }
          }
      
          return NextResponse.json({ message: 'Peticion de recordatorios enviada correctamente' })

    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 })
    }
}