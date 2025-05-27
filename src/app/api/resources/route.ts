import { Resource, ResourcePostSchema } from "@/app/schema";
import { DataSource } from "@/services/datasource";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response: Resource[] = await new DataSource().getAllResources();
    return NextResponse.json({
      message: "Todos los recursos obtenidos",
      data: response,
      status: 200,
    });
  } catch (error) {
    console.error("Error en /api/resources:", (error as Error).message);
    return NextResponse.json(
      {
        error: `No se pudieron obtener los recursos. Intentá más tarde. Error: ${(error as Error).message}`,
      },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  const data = await request.json();
  const resource = ResourcePostSchema.parse(data);
  const datasource = new DataSource();
  try {
    const response = await datasource.createResource(resource);

    return NextResponse.json({
      message: "Recurso creado",
      data: response,
      status: 200,
    });
  } catch (error) {
    console.error("Error en /api/resources:", (error as Error).message);
    return NextResponse.json(error);
  }
}
