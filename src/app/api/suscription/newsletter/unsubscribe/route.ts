import { NextRequest, NextResponse } from "next/server";
import { NewsletterDataSource } from "@/services/datasource/newsletter";

export async function DELETE(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("unsubscribe_token");

  if (!token) {
    return NextResponse.json({ error: "Token is required." }, { status: 400 });
  }

  const datasource = new NewsletterDataSource();

  try {
    await datasource.unsubscribeNewsletterByToken(token);

    return NextResponse.json(
      { message: "Te has desuscrito de la newsletter correctamente." },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error al desuscribirse de la newsletter:", error);
    return NextResponse.json(
      { error: "Error al desuscribirse de la newsletter." },
      { status: 500 },
    );
  }
}
