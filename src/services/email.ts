import nodemailer from 'nodemailer'

export class EmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || '587'),
        secure: false,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS
        },
      });
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
    return this.transporter.sendMail({
      from: `"Hablemos de Cáncer"`,
      to,
      subject,
      html,
    });
  }
}