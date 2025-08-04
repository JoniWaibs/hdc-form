import { Resource, Subscriber } from "@/app/schema";

export type EmailType =
  | "welcome"
  | "reminder"
  | "confirmation"
  | "subscribe_newsletter";

export interface BaseEmailTemplate {
  subject: string;
  text: string;
  html: string;
}

export interface RegisterEmailData {
  subscriber: Subscriber;
  resource: Resource;
}

interface NewsletterEmailData {
  unsubscribeToken: string;
}

export type EmailData = RegisterEmailData | NewsletterEmailData;

export interface NotificationPayload {
  to: string;
  type: "email" | "sms" | "whatsapp" | "push";
  template: EmailType;
  data: RegisterEmailData;
}

export interface NotificationProvider {
  send(payload: NotificationPayload): Promise<void>;
}
