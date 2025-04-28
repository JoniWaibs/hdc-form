import { Resource, Subscriber } from "@/app/schema";
import { getPaymentAmountByCountry, getPaymentLinkByCountry, getUrls } from "@/lib/utils";

export function getWelcomeEmail({ subscriber, resource }: { subscriber: Subscriber; resource: Resource }) {
    const { name: subscriberName } = subscriber;
    const { name: resourceName } = resource;
    
    return {
      subject: `¡Gracias por inscribirte al taller ${resourceName}!`,
      html: `
       <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; background-color: #ffffff; border-radius: 12px; box-shadow: 0 2px 10px rgba(0,0,0,0.05); box-sizing: border-box;">
  
        <div style="text-align: center; margin-bottom: 20px;">
           <img src="https://edqkxwgbbunlomuzarwt.supabase.co/storage/v1/object/public/assets/HDC-2-mda-logo-05.png" alt="Hablemos de Cáncer" style="max-width: 180px; margin: 0 auto 20px;" />
        </div>

        <h2 style="font-size: 1.6em; margin-bottom: 10px; color: #333;">¡Hola ${subscriberName}! 👋</h2>
        
        <p style="font-size: 1em; margin-bottom: 12px; color: #444;">Gracias por inscribirte al taller <strong>${resourceName}</strong>. Estamos felices de tenerte a bordo 😊</p>
        
        <p style="font-size: 1em; margin-bottom: 10px; color: #444;"><strong>Para completar tu inscripción, te pedimos que realices el pago mediante alguno de los siguientes métodos:</strong></p>
        
        <p style="font-size: 1em; margin-bottom: 10px; color: #444;">Recordá que el costo del taller es de <strong>${getPaymentAmountByCountry(suscriptor.country.toLowerCase().trim(), resource.price)}</strong>.</p>
        <ul style="font-size: 1em; margin-bottom: 12px; padding-left: 20px; color: #444;">
          ${getPaymentLinkByCountry(subscriber.country.toLowerCase().trim())?.map((payment) => {
            const paymentDetails = [];
            if ('owner' in payment) paymentDetails.push(`<li>Titular 👉 ${payment.owner}</li>`);
            if ('alias' in payment) paymentDetails.push(`<li>Alias 👉 ${payment.alias}</li>`);
            if ('cvu' in payment) paymentDetails.push(`<li>CVU 👉 ${payment.cvu}</li>`);
            if ('account' in payment) paymentDetails.push(`<li>Cuenta 👉 ${payment.account}</li>`);
            if ('link' in payment) paymentDetails.push(`<li>Link 👉 <a href="${payment.link}" target="_blank">${payment.link}</a></li>`);
            return `<li>Plataforma 👉 <strong>${payment.name}</strong></li>` + paymentDetails.join('');
          }).join('')}
        </ul>  

        <p style="font-size: 1em; margin-bottom: 12px; color: #444;">Una vez realizada la transferencia, por favor enviá el comprobante a <strong>contacto@hablemosdecancer.com.ar</strong>.</p>
        
        <p style="font-size: 1em; margin-bottom: 12px; color: #444;">Cuando confirmemos tu pago, te enviaremos un correo con el enlace al Meet donde se realizará el taller 💻.</p>

        <p style="font-size: 1em; margin-top: 24px; margin-bottom: 8px; color: #444;">¡Muchas gracias!</p>
        <p style="font-size: 1em; color: #444;">El equipo de <strong>Hablemos de Cáncer</strong></p>

        <div style="margin-top: 24px; text-align: left;">
          <table role="presentation" style="width: 100%;">
            <tr>
              <td align="left" style="padding-top: 16px; text-align: center;">
                <a href=${getUrls('instagram')}
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
    }
  }
  