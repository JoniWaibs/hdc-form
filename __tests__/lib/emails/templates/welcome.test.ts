/* eslint-disable @typescript-eslint/no-unused-vars */
import { getWelcomeEmail } from "@/lib/emails/templates/welcome";
import { capitalizeFirstLetter, getPaymentAmountByCountry, getPaymentLinkByCountry, getUrls } from "@/lib/utils";
import { mockSubscriber } from "@/tests/mocks/subscriber";
import { mockResource } from "@/tests/mocks/resources";

jest.mock("@/lib/utils", () => ({
    capitalizeFirstLetter: jest.fn((text: string) => `Capitalized_${text}`),
    getPaymentAmountByCountry: jest.fn((_country: string) => "1000"),
    getPaymentLinkByCountry: jest.fn((_country: string) => [
        {
            name: "Paypal",
            owner: "Maria Florencia Martinez",
            link: "https://www.paypal.me/maflorenciamartinez"
        }
    ]),
    getUrls: jest.fn((platform: string) => `${platform}-RRSS`),
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

    expect(result.subject).toBe(`¡Gracias por inscribirte al taller Capitalized_${resource.name}!`);
    expect(result.html).toContain(`Capitalized_${subscriber.name}`);
    expect(result.html).toContain(`Capitalized_${resource.name}`);
    expect(result.html).toContain(getPaymentAmountByCountry(subscriber.country.toLowerCase().trim(), resource.price));

    expect(capitalizeFirstLetter).toHaveBeenCalledWith(subscriber.name);
    expect(capitalizeFirstLetter).toHaveBeenCalledWith(resource.name);
    expect(getPaymentAmountByCountry).toHaveBeenCalledWith(subscriber.country.toLowerCase().trim(), resource.price);
    expect(getPaymentLinkByCountry).toHaveBeenCalledWith(subscriber.country.toLowerCase().trim());
    expect(getUrls).toHaveBeenCalledWith("instagram");
  });
});
