import { NewsletterDataSource } from "@/services/datasource/newsletter";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const email = req.nextUrl.searchParams.get("email");

  if (!email) {
    return NextResponse.json(
      { error: "El email es requerido" },
      { status: 400 },
    );
  }

  const datasource = new NewsletterDataSource();

  try {
    const { data } = await datasource.getSubscriberNewsletter(email);

    return NextResponse.json(
      {
        message: "Suscriptores obtenidos",
        data: data[0],
      },
      { status: 200 },
    );
  } catch (error: unknown) {
    console.error("Error al obtener los suscriptores:", error);
    return NextResponse.json(
      { error: "Error al obtener los suscriptores" },
      { status: 500 },
    );
  }
}
