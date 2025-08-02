import { NewsletterSubscriber } from "@/app/schema/newsletter";
import { DataSource } from "@/services/datasource";

export class NewsletterDataSource extends DataSource {
  constructor() {
    super();
  }

  async createSubscriberNewsletter(payload: {
    email: string;
    unsubscribeToken: string;
  }) {
    const { data, error, status } = await this.supabase
      .from("subscriber_newsletter")
      .insert({
        email: payload.email,
        unsubscribe_token: payload.unsubscribeToken,
      })
      .select("email");

    if (error) {
      // Avoid duplicates if the email already exists
      if (error.code === "23505") {
        throw new Error("Ya estás suscripto a la newsletter.");
      }
      throw error;
    }

    return { data, status };
  }

  async unsubscribeNewsletterByToken(token: string) {
    const { data, error, status } = await this.supabase
      .from("subscriber_newsletter")
      .delete()
      .eq("unsubscribe_token", token);

    if (error) {
      throw error;
    }

    return { data, status };
  }

  async getSubscriberNewsletter(
    email?: string,
  ): Promise<{ data: NewsletterSubscriber[]; status: number }> {
    const query = this.supabase.from("subscriber_newsletter").select("*");

    if (email) {
      query.eq("email", email);
    }

    const { data, error, status } = await query;

    if (error) {
      throw error;
    }

    return { data, status };
  }
}
