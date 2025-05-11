import { Resource } from "@/app/schema";
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
