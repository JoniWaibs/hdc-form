import {
  PostgrestResponse,
  PostgrestSingleResponse,
} from "@supabase/supabase-js";
import { Email } from "@/app/schema/common/email";
import {
  CreateNewsletterSubscriber,
  DDBBNewsletterSubscriber,
  UnsubscribeToken,
} from "@/app/schema/subscriptions/newsletter";
import { DataSource } from "@/services/datasource";

export class NewsletterDataSourceV1 extends DataSource {
  constructor() {
    super();
  }

  async createSubscriberNewsletter(
    payload: CreateNewsletterSubscriber,
  ): Promise<PostgrestSingleResponse<DDBBNewsletterSubscriber>> {
    const { email, unsubscribe_token } = payload;

    return await this.supabase
      .from("subscriber_newsletter")
      .insert({
        email,
        unsubscribe_token,
      })
      .select("*")
      .single();
  }

  async getSubscribersNewsletter(
    email?: Email,
  ): Promise<PostgrestResponse<DDBBNewsletterSubscriber[]>> {
    const query = this.supabase.from("subscriber_newsletter").select("*");

    if (email) {
      query.eq("email", email);
    }

    return await query;
  }

  async unsubscribeNewsletterByToken(
    token: UnsubscribeToken,
  ): Promise<PostgrestSingleResponse<DDBBNewsletterSubscriber>> {
    return await this.supabase
      .from("subscriber_newsletter")
      .update({ unsubscribed_at: new Date().toISOString(), is_active: false })
      .eq("unsubscribe_token", token)
      .select()
      .single();
  }

  async updateSubscriberNewsletter(
    id: string,
    updates: {
      is_active: boolean;
      unsubscribe_token: UnsubscribeToken;
      unsubscribed_at: null;
    },
  ): Promise<PostgrestSingleResponse<DDBBNewsletterSubscriber>> {
    return await this.supabase
      .from("subscriber_newsletter")
      .update(updates)
      .eq("id", id)
      .select()
      .single();
  }
}
