import {
  NotificationPayload,
  NotificationProvider,
} from "@/app/typings/notification";
import { EmailProvider } from "./providers/email";

export class NotificationService {
  private providers: Map<string, NotificationProvider>;

  constructor() {
    this.providers = new Map([["email", new EmailProvider()]]);
  }

  async send(payload: NotificationPayload) {
    const provider = this.providers.get(payload.type);
    if (!provider) {
      throw new Error(`Provider ${payload.type} not found`);
    }

    return provider.send(payload);
  }
}
