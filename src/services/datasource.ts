import { Supabase } from "@/lib/supabase";
import { Suscriptor } from "@/app/schema";

export class DataSource extends Supabase {
  async getAllResources() {
    const { data, error } = await this.supabase.from('resources').select('*')
    if (error) {
      throw error
    }
    return data
  }

  async getSuscribers(resourceId: string) {
    const { data, error } = await this.supabase.from('students').select('*').eq('resource_id', resourceId)
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

  async createSuscriptor(payload: Suscriptor & { resource_id: string }) {
    const { data, error, status } = await this.supabase.from('students').insert({
      ...payload,
      payment_confirmed: false,
    })

    if (error) {
      throw error
    }

    return {data, status}
  }
}