import { NewsletterDataSource } from "@/services/datasource/newsletter";
import { NextResponse } from "next/server";

export async function GET() {
  const datasource = new NewsletterDataSource();

  try {
    const { data } = await datasource.getSubscriberNewsletter();

    return NextResponse.json(
      {
        message: "Suscriptores obtenidos",
        data,
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
