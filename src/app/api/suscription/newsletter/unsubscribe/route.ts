import { NextRequest, NextResponse } from "next/server";
import { NewsletterDataSource } from "@/services/datasource/newsletter";
import { NotificationService } from "@/services/notifications/notification";
import { NewsletterHandler } from "@/app/api/suscription/handlers/NewsletterHandler";
import { NotificationHandler } from "@/app/api/suscription/handlers/NotificationHandler";
import { SubscriptionService } from "@/app/api/suscription/services/Subscription";
import { NewsletterUnsubscribeSchema } from "@/app/schema/newsletter";
import { z } from "zod";

export async function DELETE(req: NextRequest) {
  const parsedToken = NewsletterUnsubscribeSchema.safeParse({
    unsubscribe_token: req.nextUrl.searchParams.get("unsubscribe_token"),
  });

  if (!parsedToken.success) {
    return NextResponse.json({ error: "Token is required." }, { status: 400 });
  }

  const notificationService = new NotificationService();
  const dataSource = new NewsletterDataSource();

  const newsletterHandler = new NewsletterHandler(
    new SubscriptionService(dataSource),
    new NotificationHandler(notificationService),
  );

  try {
    const result = await newsletterHandler.unsubscribe(
      parsedToken.data.unsubscribe_token,
    );

    return NextResponse.json({ message: result.message }, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "An error has occurred with the token provided" },
        { status: 400 },
      );
    }

    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ error: "Unknown error" }, { status: 500 });
  }
}
