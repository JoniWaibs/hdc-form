import { EmailFunctionMap } from "@/app/typings/notification";
import { getNewsletterSubscribeEmail } from "./emails/newsletter/subscribe";
import { getConfirmationEmail } from "./emails/register/confirmation";
import { getReminderEmail } from "./emails/register/reminder";
import { getWelcomeEmail } from "./emails/register/welcome";

export const emailTemplates: EmailFunctionMap = {
  welcome: getWelcomeEmail,
  confirmation: getConfirmationEmail,
  reminder: getReminderEmail,
  subscribe_newsletter: getNewsletterSubscribeEmail,
};
