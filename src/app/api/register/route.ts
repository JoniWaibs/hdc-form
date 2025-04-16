import { SuscriptorSchema } from "@/app/schema/suscriptor"
import { DataSource } from "@/services/datasource"
import { NextResponse } from "next/server"
import { z, ZodError } from "zod"
//import { createPreference } from "@/services/mercadopago"

export async function POST(req: Request) { 
  try {
    const body: { suscriptor: z.infer<typeof SuscriptorSchema>, resource_id: string } = await req.json()
    const data: z.infer<typeof SuscriptorSchema> = SuscriptorSchema.parse(body.suscriptor)
    
    const response = await new DataSource().createSuscriptor({
      ...data,
      resource_id: body.resource_id,
    })
    
    //TODO: Launch welcome email with payment_mathods

    return NextResponse.json({ message: 'Inscripción exitosa', data: response })
  } catch (error: unknown) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: 'Datos inválidos', issues: error.errors },
        { status: 400 }
      )
    }

    console.error('Error en /api/register:', (error as Error).message)

    return NextResponse.json(
      { error: `No se pudo completar el registro. Intentá más tarde. Error: ${(error as Error).message}` },
      { status: 500 }
    )
  }
}


