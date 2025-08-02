/**
 * @jest-environment node
 */

import { POST } from "@/app/api/suscription/newsletter/susbcribe/route";
import { NewsletterDataSource } from "@/services/datasource/newsletter";
import { NextRequest } from "next/server";
import { Request as NodeRequest } from "undici";

jest.mock("@/services/datasource/newsletter");
jest.mock("uuid", () => ({
  v4: jest.fn().mockReturnValue("454cbe7f-bc79-4a2e-b543-4342d99d04d9"),
}));

interface NewsletterRequestBody {
  email: string;
}

const createMockRequest = (body: NewsletterRequestBody) => {
  return new NodeRequest(
    "http://localhost:3000/api/suscription/newsletter/susbcribe",
    {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    },
  );
};

describe("subscribe newsletter api route", () => {
  let mockRequest: NodeRequest;

  beforeEach(() => {
    jest.clearAllMocks();
    mockRequest = createMockRequest({ email: "test@test.com" });
  });

  test("should successfully subscribe to newsletter", async () => {
    const mockCreateSubscriber = jest.fn().mockResolvedValueOnce(undefined);
    (NewsletterDataSource as jest.Mock).mockImplementation(() => ({
      createSubscriberNewsletter: mockCreateSubscriber,
    }));

    const response = await POST(mockRequest as unknown as NextRequest);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toEqual({ message: "Suscripción exitosa" });
    expect(mockCreateSubscriber).toHaveBeenCalledWith({
      email: "test@test.com",
      unsubscribeToken: "454cbe7f-bc79-4a2e-b543-4342d99d04d9",
    });
  });

  test("should return 400 for invalid email", async () => {
    mockRequest = createMockRequest({ email: "invalid-email" });

    const response = await POST(mockRequest as unknown as NextRequest);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data).toEqual({ error: "El correo electrónico no es válido" });
  });

  test("should return 409 for already subscribed email", async () => {
    const mockCreateSubscriber = jest
      .fn()
      .mockRejectedValueOnce(new Error("Ya estás suscripto a la newsletter."));
    (NewsletterDataSource as jest.Mock).mockImplementation(() => ({
      createSubscriberNewsletter: mockCreateSubscriber,
    }));

    const response = await POST(mockRequest as unknown as NextRequest);
    const data = await response.json();

    expect(response.status).toBe(409);
    expect(data).toEqual({ error: "Ya estás suscripto a la newsletter." });
    expect(mockCreateSubscriber).toHaveBeenCalledWith({
      email: "test@test.com",
      unsubscribeToken: "454cbe7f-bc79-4a2e-b543-4342d99d04d9",
    });
  });

  test("should return 500 for unexpected errors", async () => {
    const mockCreateSubscriber = jest
      .fn()
      .mockRejectedValueOnce(new Error("Database connection failed"));
    (NewsletterDataSource as jest.Mock).mockImplementation(() => ({
      createSubscriberNewsletter: mockCreateSubscriber,
    }));

    const response = await POST(mockRequest as unknown as NextRequest);
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data).toEqual({
      error: "Hubo un error al suscribirte. Inténtalo de nuevo.",
    });
    expect(mockCreateSubscriber).toHaveBeenCalledWith({
      email: "test@test.com",
      unsubscribeToken: "454cbe7f-bc79-4a2e-b543-4342d99d04d9",
    });
  });
});
