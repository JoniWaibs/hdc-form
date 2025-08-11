import { NextRequest } from "next/server";
import { withErrorHandler } from "@/app/api/v1/core/middleware/errorMiddleware";
import { ResponseBuilder } from "@/app/api/v1/core/responses/ResponseBuilder";
import { NotificationHandler } from "@/app/api/v1/subscriptions/handlers/NotificationHandler";
import { ResourceHandler } from "@/app/api/v1/subscriptions/handlers/ResourceHandler";
import { SubscriptionService } from "@/app/api/v1/subscriptions/services/Subscription";
import { subscribeBodySchema } from "@/app/api/v1/subscriptions/validators";
import { SubscriptionsDataSourceV1 } from "@/services/datasource/v1/subscriptions";
import { NotificationService } from "@/services/notifications/notification";

const dataSource = new SubscriptionsDataSourceV1();
const notificationService = new NotificationService();
const handler = new ResourceHandler(
  new SubscriptionService(dataSource),
  new NotificationHandler(notificationService),
);

export const POST = withErrorHandler(async (req: NextRequest) => {
  const body = await req.json();
  const { email } = subscribeBodySchema.parse(body);
  console.log(email);

  await handler.subscribe();
  return ResponseBuilder.success(null, "", 201);
});
