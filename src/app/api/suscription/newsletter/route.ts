import { NewsletterDataSource } from "@/services/datasource/newsletter";
import { NextRequest, NextResponse } from "next/server";
import { NewsletterHandler } from "@/app/api/suscription/handlers/NewsletterHandler";
import { NotificationHandler } from "@/app/api/suscription/handlers/NotificationHandler";
import { SubscriptionService } from "@/app/api/suscription/services/Subscription";
import { NotificationService } from "@/services/notifications/notification";

export async function GET(req: NextRequest) {
  const email = req.nextUrl.searchParams.get("email");

  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { error: "Invalid email format" },
      { status: 400 },
    );
  }

  const dataSource = new NewsletterDataSource();
  const notificationService = new NotificationService();

  const newsletterHandler = new NewsletterHandler(
    new SubscriptionService(dataSource),
    new NotificationHandler(notificationService),
  );

  try {
    const result = await newsletterHandler.getSubscribers(email || undefined);

    return NextResponse.json({
      message: result.message,
      data: result.data || [],
      status: 200,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ error: "Unknown error" }, { status: 500 });
  }
}
