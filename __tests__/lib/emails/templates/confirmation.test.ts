/* eslint-disable @typescript-eslint/no-unused-vars */
import { getConfirmationEmail } from "@/lib/emails/templates/confirmation";
import {
  capitalizeFirstLetter,
  getTimeByCountry,
  getMediaLink,
} from "@/lib/utils";
import { mockSubscriber } from "@/tests/mocks/subscriber";
import { mockResource } from "@/tests/mocks/resources";

jest.mock("@/lib/utils", () => ({
  capitalizeFirstLetter: jest.fn((text: string) => `Capitalized_${text}`),
  getTimeByCountry: jest.fn((_country: string) => "18:00 hs"),
  getMediaLink: jest.fn((platform: string) => `${platform}-RRSS`),
  formatLongDate: jest.fn((date: string) => `Formatted_${date}`),
}));

describe("getConfirmationEmail", () => {
  const subscriber = mockSubscriber;
  const resource = mockResource;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should generate confirmation email with correct content", () => {
    const result = getConfirmationEmail({
      subscriber,
      resource,
    });

    expect(result.subject).toBe(
      "✅ Confirmación de inscripción al taller taller de oncología",
    );

    expect(result.html).toContain("Capitalized_john doe");
    expect(result.html).toContain("Capitalized_taller de oncología");
    expect(result.html).toContain("https://meet.google.com/abc-def-ghi");
    expect(result.html).toContain("18:00 hs");

    expect(capitalizeFirstLetter).toHaveBeenCalledWith("john doe");
    expect(capitalizeFirstLetter).toHaveBeenCalledWith("taller de oncología");
    expect(getTimeByCountry).toHaveBeenCalledWith("argentina");
    expect(getMediaLink).toHaveBeenCalledWith("instagram");
  });
});
