import { SubscriptionService } from "@/app/api/v1/subscriptions/services/Subscription";
import { NotificationHandler } from "./NotificationHandler";

export class ResourceHandler {
  constructor(
    private subscriptionService: SubscriptionService,
    private notificationHandler: NotificationHandler,
  ) {}

  async subscribe() {}

  async getSubscribers() {}

  async updateSubscriber() {}
}
