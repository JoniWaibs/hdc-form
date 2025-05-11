import { Supabase } from "@/lib/supabase";
import { Resource, Subscriber, SubscriberResourcesList } from "@/app/schema";

export class DataSource extends Supabase {
  async getAllResources(): Promise<Resource[]> {
    const { data, error } = await this.supabase.from('resources').select('*')
    if (error) {
      throw error
    }
    return data
  }

  async getResourceById(id: string) {
    const { data, error } = await this.supabase.from('resources').select('*').eq('id', id)
    if (error) {
      throw error
    }
  
    return data;
  };

  async getSubscriberById(subscriberId: string) {
    const { data, error } = await this.supabase.from('subscribers').select('*').eq('id', subscriberId)
    if (error) {
      throw error
    }
    return data;
  }

  async getSubscriberResources({
    resource_id,
    subscriber_id,
  }: {
    resource_id?: string;
    subscriber_id?: string;
  } = {}): Promise<SubscriberResourcesList> {
    let query = this.supabase
      .from('subscriber_resources')
      .select(`
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
  
    return data as unknown as SubscriberResourcesList;
  }

  async createSubscriber(payload: Subscriber) {
    const { data, error, status } = await this.supabase.from('subscribers').insert(payload).select('id')

    if (error) {
      throw error
    }
  
    return { data, status }
  }

  async createSubscriberResource(payload: {
    subscriber_id: string;
    resource_id: string;
    how_did_you_hear: string;
    why_you_are_interested: string;
    payment_confirmed: boolean;
  }) {

    try {
      const { data, error } = await this.supabase.from('subscriber_resources').insert([
        {
          subscriber_id: payload.subscriber_id,
          resource_id: payload.resource_id,
          how_did_you_hear: payload.how_did_you_hear,
          why_you_are_interested: payload.why_you_are_interested,
          payment_confirmed: payload.payment_confirmed ?? false,
        }
      ]);
  
      if (error) {
        if (error.code === '23505') {
          throw new Error('Ya estás inscripto en este recurso.');
        }
        throw error;
      }
  
      return { data };
    } catch (err) {
      throw new Error(`Error al crear la suscripción: ${(err as Error).message}`);
    }
  }

  async updateSubscriberResource(
    subscriberResourceId: string,
    payload: {
      payment_confirmed: boolean;
    }
  ) {
    try {
      const { data, error } = await this.supabase
        .from('subscriber_resources')
        .update({
          ...payload,
          updated_at: new Date().toISOString(),
        })
        .eq('id', subscriberResourceId)
        .select();

      if (error) {
        throw error;
      }

      return { data, status: 200 };
    } catch (err) {
      throw new Error(`Error al actualizar la suscripción: ${(err as Error).message}`);
    }
  }


  async findSubscriberByEmailOrDocument(email: string, identity_document: string) {
    const { data, error } = await this.supabase
      .from('subscribers')
      .select('*')
      .or(`email.eq.${email},identity_document.eq.${identity_document}`);
  
    if (error) throw error;

    return data;
  }
}