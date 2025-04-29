import { Resource, Subscriber } from "@/app/schema"
import { getConfirmationEmail } from "@/lib/emails/templates/confirmation"
import { getReminderEmail } from "@/lib/emails/templates/reminder"
import { getWelcomeEmail } from "@/lib/emails/templates/welcome"
import { EmailService } from "@/services/email"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    const body: { subscriber: Subscriber, resource: Resource, type: string } = await req.json()

    const emailContentByType = new Map([
        ['welcome', getWelcomeEmail({ subscriber: body.subscriber, resource: body.resource })],
        ['reminder', getReminderEmail({ subscriber: body.subscriber, resource: body.resource })],
        ['confirmation', getConfirmationEmail({ subscriber: body.subscriber, resource: body.resource })],
    ])

    const emailContent = emailContentByType.get(body.type)!

    try {
        await new EmailService().sendEmail({
            to: body.subscriber.email,
            subject: emailContent.subject,
            html: emailContent.html,
        })

        return NextResponse.json({ message: 'Email enviado correctamente' }, { status: 200 })

    } catch (error) {
        return NextResponse.json({ error: `Error al enviar el email. Error: ${(error as Error).message}` }, { status: 500 })
    }
}