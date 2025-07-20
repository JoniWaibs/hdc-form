import { NextRequest, NextResponse } from "next/server";
import { NewsletterDataSource } from "@/services/datasource/newsletter";
import { NewsletterSubscriptionSchema } from "@/app/schema/newsletter";
import { z } from "zod";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email } = NewsletterSubscriptionSchema.parse(body);
    const datasource = new NewsletterDataSource();

    await datasource.createSubscriberNewsletter({ email });

    return NextResponse.json(
      { message: "Suscripción exitosa" },
      { status: 200 },
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "El correo electrónico no es válido" },
        { status: 400 },
      );
    }

    if (
      error instanceof Error &&
      error.message === "Ya estás suscripto a la newsletter."
    ) {
      return NextResponse.json({ error: error.message }, { status: 409 });
    }

    return NextResponse.json(
      { error: "Hubo un error al suscribirte. Inténtalo de nuevo." },
      { status: 500 },
    );
  }
}
