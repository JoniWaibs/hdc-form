import { ResourceSchema, Suscriptor, SuscriptorSchema } from "@/app/schema"
import { DataSource } from "@/services/datasource"
import { NextResponse, NextRequest } from "next/server"
import { z, ZodError } from "zod"
//import { createPreference } from "@/services/mercadopago"

export async function POST(req: NextRequest) { 
  try {
    const body: { suscriptor: Suscriptor, resource_id: string } = await req.json()
    const data: Suscriptor = SuscriptorSchema.parse(body.suscriptor)
    
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

export async function GET(req: NextRequest) {
  const resourceId = req.nextUrl.searchParams.get('resource_id')
  if(!resourceId) {
    return NextResponse.json({ error: 'El id del recurso es requerido' }, { status: 400 })
  }
  try { 
    const response: z.infer<typeof ResourceSchema>[] = await new DataSource().getResource(resourceId)
    return NextResponse.json({ message: `Recurso ${response[0].name} obtenido`, data: response })
  } catch (error) {
    console.error('Error en /api/register:', (error as Error).message)
    return NextResponse.json({ error: `No se pudo obtener el recurso. Intentá más tarde. Error: ${(error as Error).message}` }, { status: 500 })
  }
}