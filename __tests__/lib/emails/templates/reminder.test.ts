/* eslint-disable @typescript-eslint/no-unused-vars */
import { getReminderEmail } from "@/lib/emails/templates/reminder";
import { capitalizeFirstLetter, getTimeByCountry, getUrls } from "@/lib/utils";
import { mockResource } from "@/tests/mocks/resources";
import { mockSubscriber } from "@/tests/mocks/subscriber";

jest.mock("@/lib/utils", () => ({
  capitalizeFirstLetter: jest.fn((text: string) => `Capitalized_${text}`),
  getTimeByCountry: jest.fn((_country: string) => "18:00 hs"),
  getUrls: jest.fn((platform: string) => `${platform}-RRSS`),
}));

describe("getReminderEmail", () => {
  const subscriber = mockSubscriber;
  const resource = mockResource;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should generate reminder email with correct content", () => {
    const result = getReminderEmail({
      subscriber,
      resource,
    });

    expect(result.subject).toBe("⏰ Recordatorio: El taller es mañana!");

    expect(result.html).toContain("Capitalized_john doe");
    expect(result.html).toContain("Capitalized_taller de oncología");
    expect(result.html).toContain("https://meet.google.com/abc-def-ghi");
    expect(result.html).toContain("18:00 hs");

    expect(capitalizeFirstLetter).toHaveBeenCalledWith("john doe");
    expect(capitalizeFirstLetter).toHaveBeenCalledWith("taller de oncología");
    expect(getTimeByCountry).toHaveBeenCalledWith("argentina");
    expect(getUrls).toHaveBeenCalledWith("instagram");
  });
});
