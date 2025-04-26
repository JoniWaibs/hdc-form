import { Resource, Subscriber } from "@/app/schema";
import { getTimeByCountry, getUrls } from "@/lib/utils";

export function getReminderEmail({ subscriber, resource }: { subscriber: Subscriber; resource: Resource }) {
    const { name: subscriberName, country } = subscriber;
    const {  name: resourceName, meet_url: meetUrl } = resource;

    return {
      subject: '⏰ Recordatorio: El taller es mañana!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 100%; margin: auto; padding: 20px; box-sizing: border-box; text-align: center;">
          <img src="https://edqkxwgbbunlomuzarwt.supabase.co/storage/v1/object/public/assets//HDC-2-mda-logo-05.png" alt="Hablemos de Cáncer" style="max-width: 180px; margin: 0 auto 20px;" />  
          <h2 style="font-size: 1.5em; margin-bottom: 10px;">⏰ ¡Falta solo 1 día!</h2>
          <p style="font-size: 1em; margin-bottom: 10px;">Hola <strong>${subscriberName}</strong>, te recordamos que mañana es el taller <strong>${resourceName}</strong> 🧠💬</p>
          <p style="font-size: 1em; margin-bottom: 10px;">Recordá tener a mano este enlace para conectarte al Meet:</p>
          <p style="font-size: 1em; margin-bottom: 10px;"><a href="${meetUrl}" target="_blank" style="color: #2563eb; word-break: break-word;">🔗 ${meetUrl}</a></p>
          <p style="font-size: 1em; margin-bottom: 10px;">El evento comienza a las <strong>${getTimeByCountry(country)}</strong> de tu país. ¡Te esperamos puntual!</p>
          <br/>
          <p style="font-size: 1em;">Con cariño,</p>
          <p style="font-size: 1em;">El equipo de <strong>Hablemos de Cáncer</strong></p>

          <div style="margin-top: 24px;">
            <a href=${getUrls('instagram')}
              target="_blank"
              style="display: inline-flex; align-items: center; justify-content: center; gap: 8px; padding: 12px 24px; border-radius: 9999px; color: white; background: linear-gradient(to right, #ec4899, #ef4444, #f59e0b); text-decoration: none; font-size: 16px; box-shadow: 0 4px 8px rgba(0,0,0,0.15); transition: transform 0.2s ease-in-out;">
             Seguinos en Instagram
            </a>
          </div>
        </div>
      `,
    }
  }
  