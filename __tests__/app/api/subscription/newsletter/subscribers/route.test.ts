/**
 * @jest-environment node
 */

import { GET } from "@/app/api/suscription/newsletter/subscribers/route";
import { NewsletterDataSource } from "@/services/datasource/newsletter";

jest.mock("@/services/datasource/newsletter");

describe("subscribers newsletter api route", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should return 200", async () => {
    const getSubscriberNewsletter = jest.fn().mockResolvedValueOnce({
      data: [
        {
          id: "1",
          email: "test@test.com",
          subscribed_at: "2025-07-29T21:25:01.687Z",
          unsubscribed_at: null,
          unsubscribe_token: null,
          is_active: true,
        },
      ],
    });
    (NewsletterDataSource as jest.Mock).mockImplementation(() => ({
      getSubscriberNewsletter: getSubscriberNewsletter,
    }));

    const response = await GET();
    const data = await response.json();
    expect(response.status).toBe(200);
    expect(data).toEqual({
      message: "Suscriptores obtenidos",
      data: [
        {
          id: "1",
          email: "test@test.com",
          subscribed_at: "2025-07-29T21:25:01.687Z",
          unsubscribed_at: null,
          unsubscribe_token: null,
          is_active: true,
        },
      ],
    });
  });

  test("should return 500", async () => {
    const getSubscriberNewsletter = jest
      .fn()
      .mockRejectedValueOnce(new Error("Error al obtener los suscriptores"));
    (NewsletterDataSource as jest.Mock).mockImplementation(() => ({
      getSubscriberNewsletter: getSubscriberNewsletter,
    }));

    const response = await GET();
    const data = await response.json();
    expect(response.status).toBe(500);
    expect(data).toEqual({
      error: "Error al obtener los suscriptores",
    });
  });
});
