import {
  PostgrestResponse,
  PostgrestSingleResponse,
} from "@supabase/supabase-js";
import { Email } from "@/app/schema/common/email";
import {
  CreateSubscriberNewsletter,
  SubscriberNewsletter,
  UnsubscribeToken,
} from "@/app/schema/subscriptions/newsletter";
import {
  ComposedSubscriberResource,
  SubscriberResource,
  SubscriberResourceCreate,
} from "@/app/schema/subscriptions/resource";
import { BaseSupabaseDataSource } from "@/services/datasource/base";

export class SubscriptionsDataSourceV1 extends BaseSupabaseDataSource {
  constructor() {
    super();
  }

  async createSubscriberNewsletter(
    payload: CreateSubscriberNewsletter,
  ): Promise<PostgrestSingleResponse<SubscriberNewsletter>> {
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

  async getSubscribersNewsletter({
    email,
    token,
  }: {
    email?: Email;
    token?: UnsubscribeToken;
  }): Promise<PostgrestResponse<SubscriberNewsletter[]>> {
    const query = this.supabase.from("subscriber_newsletter").select("*");

    if (email) {
      query.eq("email", email);
    }

    if (token) {
      query.eq("unsubscribe_token", token);
    }

    return await query;
  }

  async updateSubscriberNewsletter(
    id: string,
    updates: {
      is_active: boolean;
      unsubscribe_token: UnsubscribeToken;
      unsubscribed_at: string | null;
    },
  ): Promise<PostgrestSingleResponse<SubscriberNewsletter>> {
    return await this.supabase
      .from("subscriber_newsletter")
      .update(updates)
      .eq("id", id)
      .select()
      .single();
  }

  async createSubscriberResource(
    payload: SubscriberResourceCreate,
  ): Promise<PostgrestSingleResponse<SubscriberResource>> {
    return await this.supabase
      .from("subscriber_resources")
      .insert([
        {
          ...payload,
          payment_confirmed: false,
        },
      ])
      .select("*")
      .single();
  }

  async getSubscriberResources({
    resource_id,
    subscriber_id,
    id,
  }: {
    resource_id?: string;
    subscriber_id?: string;
    id?: string;
  }): Promise<PostgrestResponse<ComposedSubscriberResource[]>> {
    let query = this.supabase.from("subscriber_resources").select(`
        id,
        payment_confirmed,
        how_did_you_hear,
        why_you_are_interested,
        created_at,
        updated_at,
        subscriber:subscribers (
          id,
          name,
          email,
          identity_document,
          age,
          phone,
          city,
          province,
          country,
          profession
        ),
        resource:resources (
          id,
          name,
          description,
          start_date,
          end_date,
          price,
          meet_url,
          created_at
        )
      `);

    if (id) {
      query = query.eq("id", id);
    }

    if (resource_id) {
      query = query.eq("resource_id", resource_id);
    }

    if (subscriber_id) {
      query = query.eq("subscriber_id", subscriber_id);
    }

    return await query.single();
  }

  async updateSubscriberResource(
    subscriberResourceId: string,
    payload: {
      payment_confirmed: boolean;
    },
  ): Promise<PostgrestSingleResponse<ComposedSubscriberResource>> {
    return await this.supabase
      .from("subscriber_resources")
      .update({
        ...payload,
        updated_at: new Date().toISOString(),
      })
      .eq("id", subscriberResourceId)
      .select(
        `
          id,
          payment_confirmed,
          how_did_you_hear,
          why_you_are_interested,
          created_at,
          updated_at,
          subscriber:subscribers!inner (
            id,
            name,
            email,
            identity_document,
            age,
            phone,
            city,
            province,
            country,
            profession
          ),
          resource:resources!inner (
            id,
            name,
            description,
            start_date,
            end_date,
            price,
            meet_url,
            created_at
          )
        `,
      )
      .single();
  }
}
