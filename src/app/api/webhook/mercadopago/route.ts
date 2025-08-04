import { NextResponse, NextRequest } from "next/server";
import { WebhookHandler } from "@/app/api/webhook/mercadopago/handlers/WebhookHandler";
import { MercadoPagoService } from "@/services/mercadopago";
import { PaymentProcessingService } from "@/app/api/webhook/mercadopago/services/PaymentProcessingService";
import { PaymentApprovalHandler } from "@/app/api/webhook/mercadopago/handlers/PaymentApprovalHandler";
import { DataSource } from "@/services/datasource";
import { NotificationHandler } from "@/app/api/webhook/mercadopago/handlers/NotificationHandler";
import { NotificationService } from "@/services/notifications/notification";

export async function POST(req: NextRequest) {
  const dataSource = new DataSource();
  const notificationService = new NotificationService();

  const paymentApprovalHandler = new PaymentApprovalHandler(
    new MercadoPagoService(),
    new PaymentProcessingService(dataSource),
    new NotificationHandler(dataSource, notificationService),
  );
  const Webhook = new WebhookHandler(paymentApprovalHandler);

  try {
    const body = await req.json();
    const result = await Webhook.process(body);

    return NextResponse.json({ message: result.message }, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json(
      {
        message: "Webhook received but processing failed",
        error,
      },
      { status: 200 },
    );
  }
}
