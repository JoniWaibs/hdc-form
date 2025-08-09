import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { SubscribeError } from "@/lib/errors/Suscription";
import { NewsletterHandler } from "@/app/api/suscription/handlers/NewsletterHandler";
import { NotificationHandler } from "@/app/api/suscription/handlers/NotificationHandler";
import { SubscriptionService } from "@/app/api/suscription/services/Subscription";
import { NewsletterSubscriptionSchema } from "@/app/schema/newsletter";
import { NewsletterDataSource } from "@/services/datasource/newsletter";
import { NotificationService } from "@/services/notifications/notification";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email } = NewsletterSubscriptionSchema.parse(body);

    const notificationService = new NotificationService();
    const dataSource = new NewsletterDataSource();

    const newsletterHandler = new NewsletterHandler(
      new SubscriptionService(dataSource),
      new NotificationHandler(notificationService),
    );

    const result = await newsletterHandler.subscribe(email);

    return NextResponse.json(
      {
        message: result.message,
      },
      { status: 200 },
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "An error has occurred with the email provided" },
        { status: 400 },
      );
    }

    if (error instanceof SubscribeError && error.status === 409) {
      return NextResponse.json(
        { error: error.message },
        { status: error.status },
      );
    }

    return NextResponse.json({ error: "Unknown error" }, { status: 500 });
  }
}
