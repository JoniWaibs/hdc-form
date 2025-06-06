import { MercadoPagoConfig, Preference } from "mercadopago";

export class MercadoPagoService {
  private client: MercadoPagoConfig;

  constructor() {
    this.client = new MercadoPagoConfig({
      accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN!,
      options: {
        timeout: 5000,
        idempotencyKey: "abc",
      },
    });
  }

  async createPreference(data: {
    resourceId: string;
    resourceName: string;
    price: number;
    subscriberEmail: string;
    subscriberName: string;
  }) {
    try {
      const preference = new Preference(this.client);

      const preferenceData = {
        items: [
          {
            id: data.resourceId,
            title: data.resourceName,
            quantity: 1,
            unit_price: data.price,
            currency_id: "ARS",
          },
        ],
        payer: {
          email: data.subscriberEmail,
          name: data.subscriberName,
        },
        back_urls: {
          success: `${process.env.APP_URL}/payment-success/${data.resourceId}`,
          failure: `${process.env.APP_URL}/payment-failure`,
          pending: `${process.env.APP_URL}/payment-pending`,
        },
        auto_return: "approved",
        external_reference: data.resourceId,
        notification_url: `${process.env.APP_URL}/api/webhook/mercadopago`,
        statement_descriptor: "HDC - Curso",
        expires: true,
        expiration_date_from: new Date().toISOString(),
        expiration_date_to: new Date(
          Date.now() + 24 * 60 * 60 * 1000
        ).toISOString(), // 24 hs
      };

      const result = await preference.create({ body: preferenceData });
      return {
        id: result.id,
        init_point: result.init_point,
        sandbox_init_point: result.sandbox_init_point,
      };
    } catch (error) {
      console.error("Error creating MercadoPago preference:", error);
      throw new Error("Failed to create payment preference");
    }
  }
}
