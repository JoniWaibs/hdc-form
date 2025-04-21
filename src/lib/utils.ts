import { clsx, type ClassValue } from "clsx"
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
export const getUrls = (url: string) => new Map<string, string>([
  ["instagram", "https://www.instagram.com/hablemos.de.cancer/"]
]).get(url)

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
