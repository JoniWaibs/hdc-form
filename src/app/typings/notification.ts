import { CreateEmailResponse } from "resend";
import { Resource, Subscriber } from "@/app/schema";
import { Email } from "@/app/schema/common/email";

export type EmailType =
  | "welcome"
  | "reminder"
  | "confirmation"
  | "subscribe_newsletter";

export interface EmailOutput {
  subject: string;
  text: string;
  html: string;
}

export interface NotificationResult {
  success: boolean;
  error?: string;
}

export interface RegisterEmailData {
  subscriber: Subscriber;
  resource: Resource;
}

export interface NewsletterEmailData {
  unsubscribeToken: string;
}

export type EmailData = RegisterEmailData | NewsletterEmailData;

export type TemplateToData = {
  welcome: RegisterEmailData;
  confirmation: RegisterEmailData;
  reminder: RegisterEmailData;
  subscribe_newsletter: NewsletterEmailData;
};

export type EmailFunctionMap = {
  [K in EmailType]: (data: TemplateToData[K]) => EmailOutput;
};

export interface NotificationPayload {
  to: string;
  type: Email | "sms" | "whatsapp" | "push";
  template: EmailType;
  data: EmailData;
}

export interface NotificationProvider {
  send(payload: NotificationPayload): Promise<CreateEmailResponse>;
}
