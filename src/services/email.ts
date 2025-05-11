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
  }: {
    to: string;
    subject: string;
    html: string;
  }) {
    return this.resend.emails.send({
      from: "Hablemos de Cáncer <no-reply@hablemosdecancer.com.ar>",
      to,
      subject,
      html,
      replyTo: "contacto@hablemosdecancer.com.ar",
    });
  }
}
