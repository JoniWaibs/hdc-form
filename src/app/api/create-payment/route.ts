import { NextResponse, NextRequest } from "next/server";
import { z } from "zod";
import { CreatePreferenceSchema } from "@/app/schema/payment";
import { MercadoPagoService } from "@/services/mercadopago";

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.json();
    const body = CreatePreferenceSchema.parse(rawBody);

    const mercadoPagoService = new MercadoPagoService();
    const preference = await mercadoPagoService.createPreference(body);

    return NextResponse.json({
      message: "Preferencia de pago creada exitosamente",
      data: {
        preferenceId: preference.id,
        initPoint: preference.init_point,
      },
      status: 200,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Input validator error", details: error.errors },
        { status: 400 },
      );
    }

    return NextResponse.json(
      {
        error: `No se pudo crear la preferencia de pago. Error: ${(error as Error).message}`,
      },
      { status: 500 },
    );
  }
}
