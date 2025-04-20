import {  Suscriptor, SuscriptorSchema } from "@/app/schema"
import { DataSource } from "@/services/datasource"
import { NextResponse, NextRequest } from "next/server"
import {  ZodError } from "zod"
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

    return NextResponse.json({ message: 'Inscripción exitosa', data: response, redirect_url: `/congrats/${body.resource_id}` }, { status: 201 })
  } catch (error: unknown) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: 'Datos inválidos', issues: error.errors },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: `No se pudo completar el registro. Error: ${(error as Error).message}` },
      { status: 500 }
    )
  }
}
