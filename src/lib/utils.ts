import { clsx, type ClassValue } from "clsx";
import { format } from "date-fns";
import { twMerge } from "tailwind-merge";
import { es } from "date-fns/locale";
import { Resource } from "@/app/schema";

export interface PaymentLink {
  name: string;
  owner: string;
  cvu?: string;
  account?: string;
  alias?: string;
  link?: string;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const handleInputType = (field: string) => {
  const availableTextAreas = ["how_did_you_hear", "why_you_are_interested"];
  if (availableTextAreas.includes(field)) {
    return true;
  }
  return false;
};

export const capitalizeFirstLetter = (string: string) => {
  const capitalizedWords = string
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
  return capitalizedWords.join(" ");
};

export const getUrls = (rrss: string) =>
  new Map<string, string>([
    ["instagram", "https://www.instagram.com/hablemos.de.cancer/"],
  ]).get(rrss);

export const getTimeByCountry = (country: string) => {
  const timeMap = new Map<string, string>([
    ["argentina", "10:00"],
    ["chile", "09:00"],
    ["colombia", "07:00"],
    ["uruguay", "10:00"],
    ["españa", "15:00"],
  ]);
  return timeMap.get(country) || "consultar horario";
};

export const formatResourceDate = (dateString: string): string => {
  return format(new Date(dateString + "T00:00:00-03:00"), "d MMMM yyyy", {
    locale: es,
  });
};

export const formatPrice = (price: number, currency: string): string => {
  if (currency === "ARS")
    return price.toLocaleString("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 0,
    });
  if (currency === "USD")
    return price.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      currencyDisplay: "code",
      minimumFractionDigits: 0,
    });
  return price.toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 0,
  });
};

export const getPaymentAmountByCountry = (country: string, price: number) => {
  const paymentMap = new Map<string, string>([
    ["argentina", formatPrice(price, "ARS")],
    ["chile", formatPrice(40, "USD")],
    ["colombia", formatPrice(40, "USD")],
    ["uruguay", formatPrice(40, "USD")],
    ["españa", formatPrice(40, "USD")],
  ]);
  return paymentMap.get(country) || formatPrice(40, "USD");
};

const mercadopago: PaymentLink = {
  name: "Mercado Pago",
  owner: "Maria Florencia Martinez",
  cvu: "0000003100027698476876",
  alias: "maflorencia.m.mp",
};

const global66: PaymentLink = {
  name: "Global66",
  owner: "Jonatan Ariel Waibsnaider",
  account: "8331003380",
  alias: "@JONWAI1",
};

const prex: PaymentLink = {
  name: "Prex",
  owner: "Jonatan Ariel Waibsnaider",
  account: "1767995",
};

const paypal: PaymentLink = {
  name: "Paypal",
  owner: "Maria Florencia Martinez",
  link: "https://www.paypal.me/maflorenciamartinez",
};

export const getPaymentLinkByCountry = (site: string) => {
  const paymentLinks = new Map<string, PaymentLink[]>([
    ["argentina", [mercadopago]],
    ["chile", [global66]],
    ["colombia", [paypal]],
    ["uruguay", [prex]],
    ["españa", [paypal]],
  ]);
  return paymentLinks.get(site) || [paypal];
};

/**
 * Convierte una fecha a formato YYYY-MM-DD asegurando que se use la fecha local correcta
 * @param date Fecha a convertir
 * @returns string en formato YYYY-MM-DD
 */
export function toLocalDateString(date: Date): string {
  const timezoneOffset = date.getTimezoneOffset() * 60000; // offset en milisegundos
  const localDate = new Date(date.getTime() - timezoneOffset);
  return localDate.toISOString().split("T")[0];
}

export const getResourceStatus = (
  resource: Resource,
): {
  text: string;
  variant: "default" | "destructive" | "outline" | "secondary";
} => {
  const isFinished = new Date(resource.end_date) <= new Date();
  const isPending = new Date(resource.start_date) > new Date();

  const resourceStatusMap = {
    finished: {
      text: "Finalizado",
      variant: "outline" as const,
    },
    active: {
      text: "Activo",
      variant: "default" as const,
    },
    pending: {
      text: "Pendiente",
      variant: "default" as const,
    },
  };

  return resourceStatusMap[
    isFinished ? "finished" : isPending ? "pending" : "active"
  ];
};
