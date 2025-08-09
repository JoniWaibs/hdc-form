import { createClient, SupabaseClient } from "@supabase/supabase-js";
import {
  Resource,
  ResourcePost,
  Subscriber,
  SubscriberResourcesList,
} from "@/app/schema";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export class DataSource {
  protected supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(supabaseUrl, supabaseAnonKey);
  }

  async getAllResources(): Promise<Resource[]> {
    const { data, error } = await this.supabase.from("resources").select("*");
    if (error) {
      throw error;
    }
    return data;
  }

  async getResourceById(id: string) {
    const { data, error } = await this.supabase
      .from("resources")
      .select("*")
      .eq("id", id);

    if (error) {
      throw error;
    }

    return data;
  }

  async getSubscriberById(subscriberId: string) {
    const { data, error } = await this.supabase
      .from("subscribers")
      .select("*")
      .eq("id", subscriberId);
    if (error) {
      throw error;
    }
    return data;
  }

  async getSubscriberResources({
    resource_id,
    subscriber_id,
    id,
  }: {
    resource_id?: string;
    subscriber_id?: string;
    id?: string;
  } = {}): Promise<SubscriberResourcesList> {
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
    const { data, error } = await query;

    if (error) {
      throw error;
    }

    return data as unknown as SubscriberResourcesList;
  }

  async createResource(payload: ResourcePost) {
    const { data, error } = await this.supabase
      .from("resources")
      .insert(payload)
      .select("id");

    if (error) {
      throw error;
    }

    return data;
  }

  async createSubscriber(payload: Subscriber) {
    const { data, error, status } = await this.supabase
      .from("subscribers")
      .insert(payload)
      .select("name, id, email");

    if (error) {
      throw error;
    }

    return { data, status };
  }

  async createSubscriberResource(payload: {
    subscriber_id: string;
    resource_id: string;
    how_did_you_hear: string;
    why_you_are_interested: string;
    payment_confirmed: boolean;
  }) {
    try {
      const { data, error, status } = await this.supabase
        .from("subscriber_resources")
        .insert([
          {
            subscriber_id: payload.subscriber_id,
            resource_id: payload.resource_id,
            how_did_you_hear: payload.how_did_you_hear,
            why_you_are_interested: payload.why_you_are_interested,
            payment_confirmed: payload.payment_confirmed ?? false,
          },
        ]);

      let statusCode = status;
      if (error) {
        if (error.code === "23505") {
          statusCode = 409;
          throw new Error("Ya estás inscripto en este recurso.");
        }
        throw error;
      }

      return { data, status: statusCode };
    } catch (err) {
      throw err;
    }
  }

  async updateSubscriberResource(
    subscriberResourceId: string,
    payload: {
      payment_confirmed: boolean;
    },
  ) {
    try {
      const { data, error, status } = await this.supabase
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

      if (error) {
        throw error;
      }

      return { data: data as unknown as SubscriberResourcesList[0], status };
    } catch (err) {
      throw err;
    }
  }

  async findSubscriberByEmailOrDocument(
    email: string,
    identity_document: string,
  ) {
    const { data, error } = await this.supabase
      .from("subscribers")
      .select("*")
      .or(`email.eq.${email},identity_document.eq.${identity_document}`);

    if (error) throw error;

    return data;
  }
}
