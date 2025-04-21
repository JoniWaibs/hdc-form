import { Resource, Suscriptor } from "@/app/schema"
import { getConfirmationEmail } from "@/lib/emails/templates/confirmation"
import { getReminderEmail } from "@/lib/emails/templates/reminder"
import { getWelcomeEmail } from "@/lib/emails/templates/welcome"
import { EmailService } from "@/services/email"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    const body: { suscriptor: Suscriptor, resource: Resource, type: string } = await req.json()

    const emailContentByType = new Map([
        ['welcome', getWelcomeEmail({ suscriptor: body.suscriptor, resource: body.resource })],
        ['reminder', getReminderEmail({ suscriptor: body.suscriptor, resource: body.resource })],
        ['confirmation', getConfirmationEmail({ suscriptor: body.suscriptor, resource: body.resource })],
    ])

    const emailContent = emailContentByType.get(body.type)!

    try {
        await new EmailService().sendEmail({
            to: 'joniwaibs@gmail.com',
            subject: emailContent.subject,
            html: emailContent.html,
        })

        return NextResponse.json({ message: 'Email enviado correctamente' }, { status: 200 })

    } catch (error) {
        return NextResponse.json({ error: `Error al enviar el email. Error: ${(error as Error).message}` }, { status: 500 })
    }
}