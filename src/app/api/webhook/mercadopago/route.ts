import { NextResponse, NextRequest } from "next/server";
import { WebhookHandler } from "./handlers/WebhookHandler";
import { MercadoPagoService } from "@/services/mercadopago";
import { NotificationService } from "./services/NotificationService";
import { PaymentProcessingService } from "./services/PaymentProcessingService";
import { PaymentApprovalHandler } from "./handlers/PaymentApprovalHandler";
import { DataSource } from "@/services/datasource";
import { EmailService } from "@/services/email";

export async function POST(req: NextRequest) {
  const dataSource = new DataSource();
  const emailService = new EmailService();
  const paymentApprovalHandler = new PaymentApprovalHandler(
    new MercadoPagoService(),
    new PaymentProcessingService(dataSource),
    new NotificationService(dataSource, emailService),
  );
  const Webhook = new WebhookHandler(paymentApprovalHandler);

  try {
    const body = await req.json();
    const result = await Webhook.process(body);

    return NextResponse.json({ message: result.message }, { status: 200 });
  } catch (error: unknown) {
    console.error("MP WEBHOOK::Webhook processing failed");

    return NextResponse.json(
      {
        message: "Webhook received but processing failed",
        error,
      },
      { status: 200 },
    );
  }
}
