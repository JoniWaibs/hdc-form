import { NotificationError } from "@/lib/errors/Notifications";

import { NotificationService } from "@/services/notifications/notification";

export class NotificationHandler {
  private notificationService: NotificationService;

  constructor(notificationService: NotificationService) {
    this.notificationService = notificationService;
  }

  async sendSubscriptionConfirmationEmail(
    email: string,
    unsubscribeToken: string,
  ): Promise<void> {
    try {
      await this.notificationService.send({
        to: email,
        type: "email",
        template: "subscribe_newsletter",
        data: {
          unsubscribeToken,
        },
      });

      console.info(
        `NotificationHandler::Confirmation email sent to user: ${email}`,
      );

      return;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      console.error(
        `NotificationHandler::Webhook::Failed to send email: ${errorMessage}`,
      );

      throw new NotificationError(errorMessage);
    }
  }
}
