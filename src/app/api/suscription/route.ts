import { Suscriptor, SuscriptorSchema } from "@/app/schema"
import { DataSource } from "@/services/datasource"
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
    console.log({responseData})
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
        console.log(resource[0])
        if (resource.length > 0) {
          const email =await fetch(`${process.env.APP_URL}/api/notifier`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              suscriptor: suscriptorData,
              resource: resource[0],
              type: "welcome",
            }),
          })
          console.log({email})
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
