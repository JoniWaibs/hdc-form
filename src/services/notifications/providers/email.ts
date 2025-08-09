import { CreateEmailResponse, Resend } from "resend";
import {
  NotificationPayload,
  NotificationProvider,
  EmailType,
  EmailOutput,
  TemplateToData,
} from "@/app/typings/notification";
import { emailTemplates } from "@/services/notifications/templates";

export class EmailProvider implements NotificationProvider {
  private resend: Resend;

  constructor() {
    this.resend = new Resend(process.env.RESEND_API_KEY);
  }

  private async sendEmail({
    to,
    subject,
    html,
    text,
  }: {
    to: string;
    subject: string;
    html: string;
    text?: string;
  }): Promise<CreateEmailResponse> {
    const emailPayload = {
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

    try {
      return await this.resend.emails.send(emailPayload);
    } catch (error) {
      console.error("Error sending email:", error);
      throw error;
    }
  }

  async send(payload: NotificationPayload): Promise<CreateEmailResponse> {
    const { to, template, data } = payload;
    const content = await this.getEmailContent(template, data);
    return this.sendEmail({ to, ...content });
  }

  private async getEmailContent<K extends EmailType>(
    template: K,
    data: TemplateToData[K],
  ): Promise<EmailOutput> {
    return emailTemplates[template](data);
  }
}
