import { Supabase } from "@/lib/supabase";
import { Suscriptor } from "@/app/schema";

export class DataSource extends Supabase {
  async getResource(id: string) {
    const { data, error } = await this.supabase.from('resources').select('*').eq('id', id)
    if (error) {
      throw new Error(error.message)
    }
    return data
  };

  async createSuscriptor(payload: Suscriptor & { resource_id: string }) {
    const response = await this.supabase.from('students').insert({
      ...payload,
      payment_confirmed: false,
    })

    if (response.status !== 201) {
      throw new Error(response.error?.message || 'Error en la base de datos')
    }

    return response
  }
}
