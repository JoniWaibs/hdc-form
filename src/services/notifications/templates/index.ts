import { getWelcomeEmail } from "./emails/register/welcome";
import { getConfirmationEmail } from "./emails/register/confirmation";
import { getReminderEmail } from "./emails/register/reminder";
import {
  EmailType,
  RegisterEmailData,
} from "@/app/typings/notification";

export const emailTemplates = new Map<
  EmailType,
  (data: RegisterEmailData) => { subject: string; text: string; html: string }
>([
  ["welcome", getWelcomeEmail],
  ["confirmation", getConfirmationEmail],
  ["reminder", getReminderEmail],
]);
