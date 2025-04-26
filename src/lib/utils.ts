import { clsx, type ClassValue } from "clsx"
import { format } from "date-fns"
import { twMerge } from "tailwind-merge"
import { es } from 'date-fns/locale';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const handleInputType = (field: string) => {
  const availableTextAreas = ["how_did_you_hear", "why_did_you_interested"]
  if (availableTextAreas.includes(field)) {
    return true
  }
  return false
}
export const getUrls = (rrss: string) => new Map<string, string>([
  ["instagram", "https://www.instagram.com/hablemos.de.cancer/"]
]).get(rrss)

export const getTimeByCountry = (country: string) => {
  const timeMap = new Map<string, string>([
    ["argentina", "10:00"],
    ["chile", "09:00"],
    ["colombia", "07:00"],
    ["uruguay", "10:00"],
    ["españa", "15:00"],
  ]);
  return timeMap.get(country) || "consultar horario";
}

export const formatResourceDate = (dateString: string): string => {
  return format(new Date(dateString + "T00:00:00-03:00"), "d MMMM yyyy", { locale: es })
};

export const formatPrice = (price: number, currency: string): string => {
  if (currency === "ARS") return price.toLocaleString('es-AR', { style: 'currency', currency: 'ARS', minimumFractionDigits: 0 });
  if (currency === "USD") return price.toLocaleString('en-US', { style: 'currency', currency: 'USD', currencyDisplay: 'code', minimumFractionDigits: 0 });
  return price.toLocaleString('es-AR', { style: 'currency', currency: 'ARS', minimumFractionDigits: 0 });
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
}

export const getPaymentLinkByCountry = (site: string) => {
  const paymentLinks = new Map<string, {name: string, link?: string, alias?: string}[]>([
    ["argentina", [{name: "Mercado Pago", link: "https://www.mercadopago.com.ar"}, {name: "Transferencia bancaria", alias: "alias"}, {name: "Paypal", link: "https://www.paypal.com/"}, {name: "Prex", link: "https://www.prex.com.ar/"}]],
    ["chile", [{name: "Global66", link: "https://www.global66.cl"}, {name: "Paypal", link: "https://www.paypal.com/"}]],
    ["colombia", [{name: "Paypal", link: "https://www.paypal.com/"}]],
    ["uruguay", [{name: "Prex", link: "https://www.prex.com.ar/"}, {name: "Paypal", link: "https://www.paypal.com/"}]],
    ["españa", [{name: "Paypal", link: "paypal"}]],
  ]);
  return paymentLinks.get(site) || [{name: "Paypal", link: "https://www.paypal.com/"}];
}