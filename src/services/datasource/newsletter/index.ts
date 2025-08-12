import { SubscribeError } from "@/lib/errors/Suscription";
import { NewsletterSubscriber } from "@/app/schema/newsletter";
import { BaseSupabaseDataSource } from "@/services/datasource/base";

/**
 * @deprecated Use the new datasource instead
 */
export class NewsletterDataSource extends BaseSupabaseDataSource {
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
      if (error.code === "23505") {
        throw new SubscribeError("Ya estás suscripto a la newsletter.", 409);
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

  async getSubscribersNewsletter(
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
