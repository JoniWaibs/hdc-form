import { Resource } from "@/app/schema"
import { DataSource } from "@/services/datasource"
import { NextResponse, NextRequest } from "next/server"

export async function GET(req: NextRequest) {
    const resourceId = req.nextUrl.searchParams.get('resource_id')
  
    if(!resourceId) {
      return NextResponse.json({ error: 'El id del recurso es requerido' }, { status: 400 })
    }
    try { 
      const response: Resource | null = await new DataSource().getResourceById(resourceId)
      return NextResponse.json({ message: `Recurso ${response?.name} obtenido`, data: response })
    } catch (error) {
      console.error('Error en /api/register:', (error as Error).message)
      return NextResponse.json({ error: `No se pudo obtener el recurso. Intentá más tarde. Error: ${(error as Error).message}` }, { status: 500 })
    }
  }