import { Email } from "@/app/schema/common/email";
import { UnsubscribeToken } from "@/app/schema/subscriptions/newsletter";
import { NotificationService } from "@/services/notifications/notification";

export class NotificationHandler {
  constructor(private notificationService: NotificationService) {}

  async sendSubscriptionConfirmationEmail(
    email: Email,
    token: UnsubscribeToken,
  ): Promise<boolean> {
    const { error } = await this.notificationService.send({
      to: email,
      type: "email",
      template: "subscribe_newsletter",
      data: {
        unsubscribeToken: token,
      },
    });

    if (error) {
      return false;
    }

    return true;
  }

  async sendResourceSubscriptionConfirmation() {}

  async sendPaymentConfirmation() {}
}
