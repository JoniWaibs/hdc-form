import { Supabase } from "@/lib/supabase";
import { Suscriptor } from "@/models/Suscriptor";


export class DataSource extends Supabase {
  async createSuscriptor(payload: Suscriptor) {
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
