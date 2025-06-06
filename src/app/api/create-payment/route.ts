import { NextResponse, NextRequest } from "next/server";
import { MercadoPagoService } from "@/services/mercadopago";
import { DataSource } from "@/services/datasource";
import { z } from "zod";

const CreatePaymentSchema = z.object({
  resourceId: z.string().uuid(),
  subscriberEmail: z.string().email(),
  subscriberName: z.string().min(1),
});

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.json();
    const { resourceId, subscriberEmail, subscriberName } =
      CreatePaymentSchema.parse(rawBody);

    // Obtener información del recurso
    const dataSource = new DataSource();
    const resourceData = await dataSource.getResourceById(resourceId);

    if (!resourceData || resourceData.length === 0) {
      return NextResponse.json(
        { error: "Recurso no encontrado" },
        { status: 404 },
      );
    }

    const resource = resourceData[0];

    // Crear preferencia de pago
    const mercadoPagoService = new MercadoPagoService();
    const preference = await mercadoPagoService.createPreference({
      resourceId: resource.id,
      resourceName: resource.name,
      price: resource.price,
      subscriberEmail,
      subscriberName,
    });

    return NextResponse.json({
      message: "Preferencia de pago creada exitosamente",
      data: {
        preferenceId: preference.id,
        initPoint: preference.init_point,
        sandboxInitPoint: preference.sandbox_init_point,
      },
      status: 200,
    });
  } catch (error) {
    console.error("Error en /api/create-payment:", (error as Error).message);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Datos inválidos", details: error.errors },
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
