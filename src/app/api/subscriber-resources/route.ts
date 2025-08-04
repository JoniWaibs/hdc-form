import { NextResponse, NextRequest } from "next/server";
import { DataSource } from "@/services/datasource";
import { SubscriberResourcesList } from "@/app/schema";
import { NotificationService } from "@/services/notifications/notification";
import { PaymentProcessingService } from "./services/PaymentProcessingService";
import { NotificationHandler } from "./handlers/NotificationHandler";
import { PaymentApprovalHandler } from "./handlers/PaymentApprovalHandler";

export async function GET(req: NextRequest) {
  const subscriberId = req.nextUrl.searchParams.get("subscriber_id");
  const resourceId = req.nextUrl.searchParams.get("resource_id");

  try {
    const subscriberResources: SubscriberResourcesList =
      await new DataSource().getSubscriberResources({
        ...(subscriberId && { subscriber_id: subscriberId }),
        ...(resourceId && { resource_id: resourceId }),
      });

    return NextResponse.json({
      data: subscriberResources,
      status: 200,
    });
  } catch (error) {
    console.error(
      "Error en /api/subscriber-resources:",
      (error as Error).message,
    );
    return NextResponse.json(
      {
        error: `No se pudieron obtener los recursos. Intentá más tarde. Error: ${(error as Error).message}`,
      },
      { status: 500 },
    );
  }
}

export async function PATCH(req: NextRequest) {
  const subscriberResourceId = req.nextUrl.searchParams.get(
    "subscriber_resource_id",
  );

  if (!subscriberResourceId) {
    return NextResponse.json(
      { error: "subscriber_resource_id is required" },
      { status: 400 },
    );
  }

  const notificationService = new NotificationService();
  const dataSource = new DataSource();

  const paymentApprovalHandler = new PaymentApprovalHandler(
    new PaymentProcessingService(dataSource),
    new NotificationHandler(dataSource, notificationService),
  );

  try {
    const result = await paymentApprovalHandler.handlePaymentApproval({
      subscriberResourceId,
    });

    return NextResponse.json({
      message: result.message,
      status: 200,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: `No se pudo actualizar el recurso del suscriptor. Intentá más tarde. Error: ${(error as Error).message}`,
      },
      { status: 500 },
    );
  }
}
