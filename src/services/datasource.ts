import { Supabase } from "@/lib/supabase";
import { Subscriber } from "@/app/schema";

export class DataSource extends Supabase {
  async getAllResources() {
    const { data, error } = await this.supabase.from('resources').select('*')
    if (error) {
      throw error
    }
    return data
  }

  async getSuscribers(resourceId: string) {
    const { data, error } = await this.supabase.from('subscribers').select('*').eq('resource_id', resourceId)
    if (error) {
      throw error
    }
    return data
  }

  async getResource(id: string) {
    const { data, error } = await this.supabase.from('resources').select('*').eq('id', id)
    if (error) {
      throw error
    }
    return data
  };

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
    const { data, error, status } = await this.supabase
      .from('subscriber_resources')
      .insert(payload)
      .select();
  
    if (error) throw error;
    return { data, status };
  }

  async findSubscriberByEmailOrDocument(email: string, identity_document: string) {
    const { data, error } = await this.supabase
      .from('subscribers')
      .select('*')
      .or(`email.eq.${email},identity_document.eq.${identity_document}`);
  
    if (error) throw error;
    return data?.[0] ?? null;
  }
}