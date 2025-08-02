/**
 * @jest-environment node
 */

import { DELETE } from "@/app/api/suscription/newsletter/unsubscribe/route";
import { NewsletterDataSource } from "@/services/datasource/newsletter";
import { NextRequest } from "next/server";

jest.mock("@/services/datasource/newsletter");

const createMockRequest = (unsubscribe_token: string) => {
  const url = new URL(
    `http://localhost:3000/api/suscription/newsletter/unsubscribe?unsubscribe_token=${unsubscribe_token}`,
  );
  return {
    nextUrl: url,
    method: "DELETE",
    headers: new Headers({ "Content-Type": "application/json" }),
  } as unknown as NextRequest;
};

describe("unsubscribe newsletter api route", () => {
  let mockRequest: NextRequest;

  beforeEach(() => {
    jest.clearAllMocks();
    mockRequest = createMockRequest("69b36210-9927-4140-ba8c-f53feef10b7f");
  });

  test("should return 200", async () => {
    const mockUnsubscribeNewsletterByToken = jest
      .fn()
      .mockResolvedValueOnce(undefined);
    (NewsletterDataSource as jest.Mock).mockImplementation(() => ({
      unsubscribeNewsletterByToken: mockUnsubscribeNewsletterByToken,
    }));
    const response = await DELETE(mockRequest);
    const data = await response.json();
    expect(response.status).toBe(200);
    expect(data).toEqual({
      message: "Te has desuscrito de la newsletter correctamente.",
    });
    expect(mockUnsubscribeNewsletterByToken).toHaveBeenCalledWith(
      "69b36210-9927-4140-ba8c-f53feef10b7f",
    );
  });

  test("should return 500", async () => {
    const mockUnsubscribeNewsletterByToken = jest
      .fn()
      .mockRejectedValueOnce(
        new Error("Error al desuscribirse de la newsletter"),
      );
    (NewsletterDataSource as jest.Mock).mockImplementation(() => ({
      unsubscribeNewsletterByToken: mockUnsubscribeNewsletterByToken,
    }));
    const response = await DELETE(mockRequest);
    const data = await response.json();
    expect(response.status).toBe(500);
    expect(data).toEqual({ error: "Error al desuscribirse de la newsletter." });
    expect(mockUnsubscribeNewsletterByToken).toHaveBeenCalledWith(
      "69b36210-9927-4140-ba8c-f53feef10b7f",
    );
  });
});
