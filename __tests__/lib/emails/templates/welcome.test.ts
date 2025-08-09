/* eslint-disable @typescript-eslint/no-unused-vars */
import { getWelcomeEmail } from "@/lib/emails/templates/welcome";
import { Currency } from "@/lib/enums/currency";
import {
  capitalizeFirstLetter,
  getPaymentLinkByCountry,
  getMediaLink,
  formatPrice,
} from "@/lib/utils";
import { mockResource } from "@/tests/mocks/resources";
import { mockSubscriber } from "@/tests/mocks/subscriber";

jest.mock("@/lib/utils", () => ({
  capitalizeFirstLetter: jest.fn((text: string) => `Capitalized_${text}`),
  getPaymentAmountByCountry: jest.fn((_country: string) => "1000"),
  getPaymentLinkByCountry: jest.fn((_country: string) => [
    {
      name: "Paypal",
      owner: "Maria Florencia Martinez",
      link: "https://www.paypal.me/maflorenciamartinez",
    },
  ]),
  getMediaLink: jest.fn((platform: string) => `${platform}-RRSS`),
  formatPrice: jest.fn(
    (price: number, currency: Currency) => `${price} ${currency}`,
  ),
}));

describe("getWelcomeEmail", () => {
  const subscriber = mockSubscriber;
  const resource = mockResource;
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should generate welcome email with correct content", () => {
    const result = getWelcomeEmail({
      subscriber,
      resource,
    });

    expect(result.subject).toBe(
      `¡Gracias por inscribirte al taller Capitalized_${resource.name}!`,
    );
    expect(result.html).toContain(`Capitalized_${subscriber.name}`);
    expect(result.html).toContain(`Capitalized_${resource.name}`);
    expect(result.html).toContain(formatPrice(resource.price, Currency.ARS));

    expect(capitalizeFirstLetter).toHaveBeenCalledWith(subscriber.name);
    expect(capitalizeFirstLetter).toHaveBeenCalledWith(resource.name);
    expect(formatPrice).toHaveBeenCalledWith(resource.price, Currency.ARS);
    expect(getPaymentLinkByCountry).toHaveBeenCalledWith(
      subscriber.country.toLowerCase().trim(),
    );
    expect(getMediaLink).toHaveBeenCalledWith("instagram");
  });
});
