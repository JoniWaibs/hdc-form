import { Suscriptor, SuscriptorSchema } from "@/app/schema"
import { getWelcomeEmail } from "@/lib/emails/templates/welcome"
import { DataSource } from "@/services/datasource"
import { EmailService } from "@/services/email"
import { NextResponse, NextRequest } from "next/server"
import { ZodError } from "zod"

export async function POST(req: NextRequest) {
  try {
    const body: { suscriptor: Suscriptor; resource_id: string } = await req.json()
    const suscriptorData: Suscriptor = SuscriptorSchema.parse(body.suscriptor)

    const { data: responseData, status } = await new DataSource().createSuscriptor({
      ...suscriptorData,
      resource_id: body.resource_id,
    })
    if (status !== 201) {
      return NextResponse.json({ error: "No se pudo completar el registro" }, { status: 400 })
    }

    const response = NextResponse.json(
      {
        message: "Inscripción exitosa",
        data: responseData,
        redirect_url: `/congrats/${body.resource_id}`,
      },
      { status: 201 }
    );

    (async () => {
      try {
        const resource = await new DataSource().getResource(body.resource_id)
        if (resource.length > 0) {
          const emailContent = getWelcomeEmail({ suscriptor: body.suscriptor, resource: resource[0] })
          await new EmailService().sendEmail({
            to: body.suscriptor.email,
            subject: emailContent.subject,
            html: emailContent.html,
        })
        }
      } catch (err) {
        console.error(`Error al enviar el email de bienvenida: Error: ${(err as Error).message}`)
      }
    })()

    return response
  } catch (error: unknown) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: "Datos inválidos", issues: error.errors }, { status: 400 })
    }

    return NextResponse.json(
      {
        error: `No se pudo completar el registro. Error: ${(error as Error).message}`,
      },
      { status: 500 }
    )
  }
}
