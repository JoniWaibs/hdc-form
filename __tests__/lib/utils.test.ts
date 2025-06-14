import {
  cn,
  handleInputType,
  getUrls,
  getTimeByCountry,
  formatResourceDate,
  formatPrice,
  getPaymentAmountByCountry,
  getPaymentLinkByCountry,
  toLocalDateString,
} from "@/lib/utils";

describe("cn function", () => {
  test("should merge class names correctly", () => {
    expect(cn("class1", "class2")).toBe("class1 class2");
    expect(cn("class1", { class2: true, class3: false })).toBe("class1 class2");
  });
});

describe("handleInputType function", () => {
  test("should return true for textarea fields", () => {
    expect(handleInputType("how_did_you_hear")).toBe(true);
    expect(handleInputType("why_you_are_interested")).toBe(true);
  });

  test("should format date to local string", () => {
    const date = new Date("2024-03-15T12:00:00");
    expect(toLocalDateString(date)).toBe("2024-03-15");
  });

  test("should return false for non-textarea fields", () => {
    expect(handleInputType("name")).toBe(false);
    expect(handleInputType("email")).toBe(false);
  });
});

describe("getUrls function", () => {
  test("should return correct Instagram URL", () => {
    expect(getUrls("instagram")).toBe(
      "https://www.instagram.com/hablemos.de.cancer/",
    );
  });

  test("should return undefined for non-existent social networks", () => {
    expect(getUrls("facebook")).toBeUndefined();
  });
});

describe("getTimeByCountry function", () => {
  test("should return correct times for different countries", () => {
    expect(getTimeByCountry("argentina")).toBe("10:00");
    expect(getTimeByCountry("chile")).toBe("09:00");
    expect(getTimeByCountry("colombia")).toBe("07:00");
    expect(getTimeByCountry("uruguay")).toBe("10:00");
    expect(getTimeByCountry("españa")).toBe("15:00");
  });

  test("should return default message for unknown countries", () => {
    expect(getTimeByCountry("brazil")).toBe("consultar horario");
  });
});

describe("formatResourceDate function", () => {
  test("should format dates correctly in Spanish", () => {
    expect(formatResourceDate("2024-03-15")).toBe("15 marzo 2024");
    expect(formatResourceDate("2024-12-31")).toBe("31 diciembre 2024");
  });
});

describe("formatPrice function", () => {
  test("should format ARS prices correctly", () => {
    expect(formatPrice(1000, "ARS")).toBe("$\u00A01.000");
    expect(formatPrice(1500.5, "ARS")).toBe("$\u00A01.501");
  });

  test("should format USD prices correctly", () => {
    expect(formatPrice(40, "USD")).toBe("USD\u00A040");
    expect(formatPrice(99.99, "USD")).toBe("USD\u00A0100");
  });

  test("should default to ARS format for unknown currencies", () => {
    expect(formatPrice(1000, "EUR")).toBe("$\u00A01.000");
  });
});

describe("getPaymentAmountByCountry function", () => {
  test("should return correct payment amounts for different countries", () => {
    expect(getPaymentAmountByCountry("argentina", 1000)).toBe("$\u00A01.000");
    expect(getPaymentAmountByCountry("chile", 1000)).toBe("USD\u00A040");
    expect(getPaymentAmountByCountry("colombia", 1000)).toBe("USD\u00A040");
    expect(getPaymentAmountByCountry("españa", 1000)).toBe("USD\u00A040");
  });

  test("should return default USD amount for unknown countries", () => {
    expect(getPaymentAmountByCountry("brazil", 1000)).toBe("USD\u00A040");
  });
});

describe("getPaymentLinkByCountry function", () => {
  test("should return correct payment methods for Argentina", () => {
    const argentinaMethods = getPaymentLinkByCountry("argentina");
    expect(argentinaMethods).toHaveLength(1);
    expect(argentinaMethods[0]).toEqual({
      name: "Mercado Pago",
      owner: "Maria Florencia Martinez",
      cvu: "0000003100027698476876",
      alias: "maflorencia.m.mp",
    });
  });

  test("should return correct payment methods for Chile", () => {
    const chileMethods = getPaymentLinkByCountry("chile");
    expect(chileMethods).toHaveLength(1);
    expect(chileMethods[0]).toEqual({
      name: "Global66",
      owner: "Jonatan Ariel Waibsnaider",
      account: "8331003380",
      alias: "@JONWAI1",
    });
  });

  test("should return correct payment methods for Uruguay", () => {
    const uruguayMethods = getPaymentLinkByCountry("uruguay");
    expect(uruguayMethods).toHaveLength(1);
    expect(uruguayMethods[0]).toEqual({
      name: "Prex",
      owner: "Jonatan Ariel Waibsnaider",
      account: "1767995",
    });
  });

  test("should return correct payment methods for España", () => {
    const espanaMethods = getPaymentLinkByCountry("españa");
    expect(espanaMethods).toHaveLength(1);
    expect(espanaMethods[0]).toEqual({
      name: "Paypal",
      owner: "Maria Florencia Martinez",
      link: "https://www.paypal.me/maflorenciamartinez",
    });
  });

  test("should return correct payment methods for Colombia", () => {
    const colombiaMethods = getPaymentLinkByCountry("colombia");
    expect(colombiaMethods).toHaveLength(1);
    expect(colombiaMethods[0]).toEqual({
      name: "Paypal",
      owner: "Maria Florencia Martinez",
      link: "https://www.paypal.me/maflorenciamartinez",
    });
  });

  test("should return default Paypal method for unknown countries", () => {
    const defaultMethods = getPaymentLinkByCountry("brazil");
    expect(defaultMethods).toHaveLength(1);
    expect(defaultMethods[0]).toEqual({
      name: "Paypal",
      owner: "Maria Florencia Martinez",
      link: "https://www.paypal.me/maflorenciamartinez",
    });
  });
});
