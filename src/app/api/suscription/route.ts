import {  Suscriptor, SuscriptorSchema } from "@/app/schema"
import { DataSource } from "@/services/datasource"
import { NextResponse, NextRequest } from "next/server"
import {  ZodError } from "zod"
//import { createPreference } from "@/services/mercadopago"

export async function POST(req: NextRequest) { 
  try {
    const body: { suscriptor: Suscriptor, resource_id: string } = await req.json()
    const suscriptorData: Suscriptor = SuscriptorSchema.parse(body.suscriptor)
    
    const {data: responseData, status} = await new DataSource().createSuscriptor({
      ...suscriptorData,
      resource_id: body.resource_id,
    })

    if(status !== 201) {
      return NextResponse.json({ error: 'No se pudo completar el registro' }, { status: 400 })
    }

    const resource = await new DataSource().getResource(body.resource_id)
    
    if(resource.length > 0) {
      await fetch(`${process.env.APP_URL}/api/notifier`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          suscriptor: suscriptorData,
          resource: resource[0],
          type: 'welcome'
        })
      })
    }
    
    return NextResponse.json({ message: 'Inscripción exitosa', data: responseData, redirect_url: `/congrats/${body.resource_id}` }, { status: 201 })
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
