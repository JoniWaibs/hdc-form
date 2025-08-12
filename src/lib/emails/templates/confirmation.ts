import { SocialMedia } from "@/lib/enums/socialMedia";
import {
  capitalizeFirstLetter,
  formatLongDate,
  getTimeByCountry,
  getMediaLink,
} from "@/lib/utils";
import { Resource, Subscriber } from "@/app/schema";

/**
 * @deprecated Use the new email template instead
 */
export function getConfirmationEmail({
  subscriber,
  resource,
}: {
  subscriber: Subscriber;
  resource: Resource;
}) {
  const {
    start_date: startDate,
    name: resourceName,
    meet_url: meetUrl,
  } = resource;
  const { name: subscriberName, country } = subscriber;

  const plainTextContent = `
    Confirmación de inscripción al taller ${resourceName}

    Hola ${capitalizeFirstLetter(subscriberName)},

    Recibimos tu pago y confirmamos que tu inscripción al taller ${capitalizeFirstLetter(resourceName)} está completa.

    Enlace de acceso al taller: ${meetUrl}

    El taller se llevará a cabo el ${formatLongDate(startDate)} a las ${getTimeByCountry(country.toLowerCase().trim())} en tu país. Comenzará puntualmente, así que te recomendamos ingresar unos minutos antes.

    ¡Nos vemos pronto!

    El equipo de Hablemos de Cáncer

    Síguenos en Instagram: ${getMediaLink(SocialMedia.IG)}
  `.trim();

  return {
    subject: `✅ Confirmación de inscripción al taller ${resourceName}`,
    text: plainTextContent,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 100%; margin: auto; padding: 20px; box-sizing: border-box; text-align: center;">
        <img src="https://edqkxwgbbunlomuzarwt.supabase.co/storage/v1/object/public/assets//HDC-2-mda-logo-05.png" alt="Hablemos de Cáncer" style="max-width: 180px; margin: 0 auto 20px;" />
        
        <h2 style="font-size: 1.5em; margin-bottom: 10px;">🎉 Inscripción confirmada!</h2>
        
        <p style="font-size: 1em; margin-bottom: 10px;">Hola <strong>${capitalizeFirstLetter(subscriberName)}</strong>, recibimos tu pago y confirmamos que tu inscripción al taller <strong>${capitalizeFirstLetter(resourceName)}</strong> está completa</p>
        
        <p style="font-size: 1em; margin-bottom: 10px;">Aquí está el enlace de acceso al taller:</p>

        <br/>
        
        <p style="font-size: 1em; margin-bottom: 10px;"><a href="${meetUrl}" target="_blank" style="color: #2563eb;">${meetUrl}</a></p>
        
        <br/>
        
        <p style="font-size: 1em; margin-bottom: 10px;">El mismo se llevará a cabo el <strong>${formatLongDate(startDate)}</strong> a las <strong>${getTimeByCountry(country.toLowerCase().trim())}</strong> en tu país.</p>
        <p style="font-size: 1em; margin-bottom: 10px;">Comenzará puntualmente, así que te recomendamos ingresar unos minutos antes.</p>
        
        <br/>
        
        <p style="font-size: 1em; margin-bottom: 10px;">¡Nos vemos pronto!</p>
        <p style="font-size: 1em;">El equipo de <strong>Hablemos de Cáncer</strong></p>

        <div style="margin-top: 24px; text-align: left;">
          <table role="presentation" style="width: 100%;">
            <tr>
              <td align="left" style="padding-top: 16px; text-align: center;">
                <a href="${getMediaLink(SocialMedia.IG)}"
                  target="_blank"
                  style="display: inline-flex; align-items: center; gap: 8px; padding: 12px 24px; border-radius: 9999px; color: white; background: linear-gradient(to right, #ec4899, #ef4444, #f59e0b); text-decoration: none; font-size: 16px; box-shadow: 0 4px 8px rgba(0,0,0,0.15); transition: transform 0.2s ease-in-out;">
                  Seguinos en Instagram
                </a>
              </td>
            </tr>
          </table>
        </div>
      </div>
    `,
  };
}
