import { CreatePreference } from "@/app/schema/payment";
import { MercadoPagoConfig, Payment, Preference } from "mercadopago";
import { PreferenceRequest } from "mercadopago/dist/clients/preference/commonTypes";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";

export class MercadoPagoService {
  private client: MercadoPagoConfig;
  private generateIdempotencyKey(): string {
    return uuidv4();
  }

  constructor() {
    this.client = new MercadoPagoConfig({
      accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN!,
      options: {
        timeout: 5000,
        idempotencyKey: this.generateIdempotencyKey(),
      },
    });
  }

  async createPreference(data: CreatePreference) {
    if (!process.env.APP_URL) {
      throw new Error("APP_URL environment variable is not defined");
    }

    try {
      const preference = new Preference(this.client);

      const preferenceData: PreferenceRequest = {
        items: [
          {
            id: data.resource_id,
            title: data.resource_name,
            ...(data.resource_description && {
              description: data.resource_description,
            }),
            picture_url:
              "https://edqkxwgbbunlomuzarwt.supabase.co/storage/v1/object/public/assets/HDC-2-mda-logo-05.png",
            quantity: 1,
            unit_price: data.price,
            currency_id: "ARS",
          },
        ],
        back_urls: {
          success: `${process.env.APP_URL}/payment-success/${data.resource_id}`,
          failure: `${process.env.APP_URL}/payment-failure/${data.resource_id}`,
          pending: `${process.env.APP_URL}/payment-pending/${data.resource_id}`,
        },
        auto_return: "all",
        external_reference: jwt.sign(
          { resourceId: data.resource_id, subscriberId: data.subscriber_id },
          process.env.JWT_SECRET!,
        ),
        notification_url: `${process.env.APP_URL}/api/webhook/mercadopago`,
        statement_descriptor: data.resource_name,
        expires: true,
        expiration_date_from: new Date().toISOString(),
        expiration_date_to: new Date(
          Date.now() + 24 * 60 * 60 * 1000,
        ).toISOString(), // 24 hs
      };

      const result = await preference.create({ body: preferenceData });

      if (!result) {
        throw new Error("Can't create preference");
      }

      return {
        id: result.id,
        init_point: result.init_point,
        sandbox_init_point: result.sandbox_init_point,
      };
    } catch (error) {
      throw error;
    }
  }

  async getPayment(paymentId: string) {
    const payment = new Payment(this.client);
    try {
      const paymentInfo = await payment.get({ id: paymentId });
      return paymentInfo;
    } catch (error) {
      throw error;
    }
  }
}
