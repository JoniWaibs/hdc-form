import { NextRequest } from "next/server";
import { withErrorHandler } from "@/app/api/v1/core/middleware/errorMiddleware";
import { ResponseBuilder } from "@/app/api/v1/core/responses/ResponseBuilder";
import { NewsletterHandler } from "@/app/api/v1/subscriptions/handlers/NewsletterHandler";
import { NotificationHandler } from "@/app/api/v1/subscriptions/handlers/NotificationHandler";
import { SubscriptionService } from "@/app/api/v1/subscriptions/services/Subscription";
import {
  emailParamSchema,
  subscribeBodySchema,
  unsubscribeParamSchema,
} from "@/app/api/v1/subscriptions/validators";
import { NewsletterDataSourceV1 } from "@/services/datasource/v1/newsletter";
import { NotificationService } from "@/services/notifications/notification";

const dataSource = new NewsletterDataSourceV1();
const notificationService = new NotificationService();
const handler = new NewsletterHandler(
  new SubscriptionService(dataSource),
  new NotificationHandler(notificationService),
);

export const POST = withErrorHandler(async (req: NextRequest) => {
  const body = await req.json();
  const { email } = subscribeBodySchema.parse(body);

  const result = await handler.subscribe(email);
  return ResponseBuilder.success(null, result.message, 201);
});

export const GET = withErrorHandler(async (req: NextRequest) => {
  const emailFromQuery = req.nextUrl.searchParams.get("email");
  const email = emailFromQuery
    ? emailParamSchema.parse({ email: emailFromQuery }).email
    : undefined;

  const result = await handler.getSubscribers(email);
  return ResponseBuilder.success(result.data, result.message);
});

export const PATCH = withErrorHandler(async (req: NextRequest) => {
  const { token } = unsubscribeParamSchema.parse({
    token: req.nextUrl.searchParams.get("token"),
  });

  const result = await handler.unsubscribe(token);
  return ResponseBuilder.success(null, result.message);
});
