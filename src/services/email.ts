import { SubscriberResource } from "@/app/schema";
import { getConfirmationEmail } from "@/lib/emails/templates/confirmation";
import { getReminderEmail } from "@/lib/emails/templates/reminder";
import { getWelcomeEmail } from "@/lib/emails/templates/welcome";
import { EmailType } from "@/lib/enums/emails";
import { Resend } from "resend";

export class EmailService {
  private resend: Resend;

  constructor() {
    this.resend = new Resend(process.env.RESEND_API_KEY);
  }

  async sendEmail({
    to,
    subject,
    html,
    text,
  }: {
    to: string;
    subject: string;
    html: string;
    text?: string;
  }) {
    const emailPayload: {
      from: string;
      to: string;
      subject: string;
      html: string;
      replyTo: string;
      headers: Record<string, string>;
      text?: string;
    } = {
      from: "Hablemos de Cáncer <no-reply@hablemosdecancer.com.ar>",
      to,
      subject,
      html,
      replyTo: "contacto@hablemosdecancer.com.ar",
      ...(text && { text }),
      headers: {
        "X-Entity-Ref-ID": "hablemos-de-cancer-notification",
        "List-Unsubscribe":
          "<mailto:contacto@hablemosdecancer.com.ar?subject=Unsubscribe>",
        "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
        "X-Priority": "3",
        "X-MSMail-Priority": "Normal",
        "X-Mailer": "Hablemos de Cáncer Notification System",
        "X-MimeOLE": "Produced By Hablemos de Cáncer",
      },
    };

    return this.resend.emails.send(emailPayload);
  }

  send(type: EmailType, subscriberResource: SubscriberResource) {
    const { subscriber, resource } = subscriberResource;
    const contentByType = new Map([
      [
        EmailType.WELCOME,
        getWelcomeEmail({
          subscriber,
          resource,
        }),
      ],
      [
        EmailType.REMINDER,
        getReminderEmail({
          subscriber,
          resource,
        }),
      ],
      [
        EmailType.CONFIRMATION,
        getConfirmationEmail({
          subscriber,
          resource,
        }),
      ],
    ]);

    const content = contentByType.get(type);

    if (!content) {
      throw new Error(`Content for type ${type} not found`);
    }

    return this.sendEmail({
      to: subscriber.email,
      subject: content.subject,
      html: content.html,
      text: content.text,
    });
  }
}
