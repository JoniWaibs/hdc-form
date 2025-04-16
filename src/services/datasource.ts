import { Suscriptor } from "@/app/schema";
import { Supabase } from "@/lib/supabase";



export class DataSource extends Supabase {
  async getResource(id: string) {
    const { data, error } = await this.supabase.from('resources').select('*').eq('id', id)
    if (error) {
      throw new Error(error.message)
    }
    return data
  };

  async createSuscriptor(payload: Suscriptor & { resource_id: string }) {
    const { data, error } = await this.supabase.from('students').insert({
      ...payload,
      payment_confirmed: false,
    })

    if (error) {
      throw new Error(error.message)
    }

    return data
  }
}
