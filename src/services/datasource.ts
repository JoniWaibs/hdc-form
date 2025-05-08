import { Supabase } from "@/lib/supabase";
import { Resource, ResourceSchema, Subscriber, SubscriberResourcePost, SubscriberResourcePostSchema, SubscriberSchema } from "@/app/schema";
import { ZodSchema } from "zod";

const safeParseOrNull = <T>(schema: ZodSchema<T>, data: unknown): T | null => {
  const parsed = schema.safeParse(data);
  return parsed.success ? parsed.data : null;
}

const safeParseArrayOrEmpty = <T>(schema: ZodSchema<T>, data: unknown): T[] => {
  const parsed = schema.array().safeParse(data);
  return parsed.success ? parsed.data : [];
}


export class DataSource extends Supabase {
  async getAllResources(): Promise<Resource[]> {
    const { data, error } = await this.supabase
      .from('resources')
      .select('*');

    if (error) throw error;
    return safeParseArrayOrEmpty(ResourceSchema, data);
  }

  async getResourceByCondition(params: {
    id?: string
    name?: string
  }): Promise<Resource | null> {
    const { id, name } = params
  
    const filters: string[] = []
    if (id) filters.push(`id.eq.${id}`)
    if (name) filters.push(`name.eq.${name}`)
  
    if (filters.length === 0) {
      throw new Error('Debes proporcionar al menos un criterio de búsqueda')
    }
  
    const { data, error } = await this.supabase
      .from('resources')
      .select('*')
      .or(filters.join(',')) // aplica OR entre todos
  
    if (error) throw error
  
    return safeParseOrNull(ResourceSchema, data?.[0])
  }

  async getSubscriberByCondition(params: {
    id?: string
    email?: string
    identity_document?: string
  }): Promise<Subscriber | null> {
    const { id, email, identity_document } = params
  
    const filters: string[] = []
    
    if (id) filters.push(`id.eq.${id}`)
    if (email) filters.push(`email.eq.${email}`)
    if (identity_document) filters.push(`identity_document.eq.${identity_document}`)
  
    if (filters.length === 0) {
      throw new Error('Debes proporcionar al menos un criterio de búsqueda')
    }
  
    const { data, error } = await this.supabase
      .from('subscribers')
      .select('*')
      .or(filters.join(','))
  
    if (error) throw error
  
    return safeParseOrNull(SubscriberSchema, data?.[0])
  }

  async getSubscriberResources({
    resource_id,
    subscriber_id,
  }: {
    resource_id?: string;
    subscriber_id?: string;
  } = {}): Promise<SubscriberResourcePost[]> {
    let query = this.supabase
      .from('subscriber_resources')
      .select(`
        id,
        payment_confirmed,
        how_did_you_hear,
        why_you_are_interested,
        created_at,
        subscriber:subscribers (
          id,
          name,
          email,
          identity_document,
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
          meet_url
        )
      `);
  
    if (resource_id) {
      query = query.eq('resource_id', resource_id);
    }
  
    if (subscriber_id) {
      query = query.eq('subscriber_id', subscriber_id);
    }
  
    const { data, error } = await query;
  
    if (error) {
      throw error;
    }
  
    return data as unknown as SubscriberResourcePost[];
  }

  async createSubscriber(subscriber: Subscriber) {
    const { data, error, status } = await this.supabase
      .from('subscribers')
      .insert(subscriber)
      .select();

    if (error) {
      throw error;
    }

    return { data: safeParseArrayOrEmpty(SubscriberSchema, data), status };
  }

  async createSubscriberResource(subscriberResource: SubscriberResourcePost) {
    const { data, error, status } = await this.supabase
      .from('subscriber_resources')
      .insert([subscriberResource])
      .select();

    if (error) {
      if (error.code === '23505') {
        throw new Error('Ya estás inscripto en este recurso.');
      }
      throw error;
    }

    return { data: safeParseArrayOrEmpty(SubscriberResourcePostSchema, data), status };
  }
}