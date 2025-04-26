import { clsx, type ClassValue } from "clsx"
import { format } from "date-fns"
import { twMerge } from "tailwind-merge"

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

export const getTimeByCountry = (country: string) => new Map<string, string>([
  ["Argentina", "10:00"],
  ["Chile", "09:00"],
  ["Colombia", "07:00"],
  ["Uruguay", "10:00"],
  ["España", "15:00"],
]).get(country)

export const getPaymentLinkByCountry = (site: string) => new Map<string, {name: string, link?: string, alias?: string}[]>([
  ["Argentina", [{name: "Mercado Pago", link: "https://www.mercadopago.com.ar"}, {name: "Transferencia bancaria", alias: "alias"}, {name: "Paypal", link: "https://www.paypal.com/"}, {name: "Prex", link: "https://www.prex.com.ar/"}]],
  ["Chile", [{name: "Global66", link: "https://www.global66.cl"}, {name: "Paypal", link: "https://www.paypal.com/"}]],
  ["Colombia", [{name: "Paypal", link: "https://www.paypal.com/"}]],
  ["Uruguay", [{name: "Prex", link: "https://www.prex.com.ar/"}, {name: "Paypal", link: "https://www.paypal.com/"}]],
  ["España", [{name: "Paypal", link: "paypal"}]],
]).get(site)

export const formatResourceDate = (dateString: string): string => {
  return format(new Date(dateString + "T00:00:00-03:00"), "d MMM yyyy")
};

export const formatPrice = (price: number, currency: string): string => {
  if (currency === "ARS") return price.toLocaleString('es-AR', { style: 'currency', currency: 'ARS', minimumFractionDigits: 0 });
  if (currency === "USD") return price.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 });
  return price.toLocaleString('es-AR', { style: 'currency', currency: 'ARS', minimumFractionDigits: 0 });
};