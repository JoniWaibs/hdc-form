/**
 * @jest-environment node
 */

import { POST } from "@/app/api/suscription/newsletter/susbcribe/route";
import { SubscribeError } from "@/lib/errors/Suscription";
import { NewsletterDataSource } from "@/services/datasource/newsletter";
import { NextRequest } from "next/server";
import { Request as NodeRequest } from "undici";

jest.mock("@/services/datasource/newsletter");
jest.mock("uuid", () => ({
  v4: jest.fn().mockReturnValue("1234-token-test"),
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
    expect(data).toEqual({
      message:
        "SubscriptionService::Subscription newsletter workflow completed successfully",
      status: 200,
    });
    expect(mockCreateSubscriber).toHaveBeenCalledWith({
      email: "test@test.com",
      unsubscribeToken: "1234-token-test",
    });
  });

  test("should return 400 for invalid email", async () => {
    mockRequest = createMockRequest({ email: "invalid-email" });

    const response = await POST(mockRequest as unknown as NextRequest);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data).toEqual({
      error: "An error has occurred with the email provided",
    });
  });

  test("should return 409 for already subscribed email", async () => {
    const mockCreateSubscriber = jest
      .fn()
      .mockRejectedValueOnce(new SubscribeError("Already subscribed"));
    (NewsletterDataSource as jest.Mock).mockImplementation(() => ({
      createSubscriberNewsletter: mockCreateSubscriber,
    }));

    const response = await POST(mockRequest as unknown as NextRequest);
    const data = await response.json();

    expect(response.status).toBe(409);
    expect(data).toEqual({
      error:
        "Subscribe error: SubscriptionService::Subscription newsletter workflow failed: Subscribe error: Already subscribed",
    });
    expect(mockCreateSubscriber).toHaveBeenCalledWith({
      email: "test@test.com",
      unsubscribeToken: "1234-token-test",
    });
  });
});
