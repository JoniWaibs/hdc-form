export function getNewsletterSubscribeEmail({
  unsubscribeToken,
}: {
  unsubscribeToken: string;
}) {
  const plainTextContent = `
¡Bienvenida/o a Hablemos de Cáncer!

Gracias por sumarte a nuestra comunidad. Desde ahora vas a recibir información clara, herramientas útiles y propuestas pensadas para acompañarte en este camino, estés donde estés.

Este espacio existe para que no te sientas solo/a. Para compartir, escuchar y abrazar la experiencia del cáncer con respeto, sensibilidad y humanidad.

El equipo de Hablemos de Cáncer

Si en algún momento preferís dejar de recibir nuestros correos, podés darte de baja acá: ${process.env.APP_URL}/newsletter/unsubscribe/${unsubscribeToken}
  `.trim();

  return {
    subject: "💌 Bienvenida/o a Hablemos de Cáncer",
    text: plainTextContent,
    html: `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: auto; padding: 24px; background-color: #ffffff; border-radius: 12px; box-shadow: 0 2px 10px rgba(0,0,0,0.05); box-sizing: border-box;">
        
        <div style="text-align: center; margin-bottom: 24px;">
          <img src="https://edqkxwgbbunlomuzarwt.supabase.co/storage/v1/object/public/assets/HDC-2-mda-logo-05.png" alt="Hablemos de Cáncer" style="max-width: 180px;" />
        </div>

        <h2 style="font-size: 1.6em; margin-bottom: 10px; color: #333;">¡Gracias por sumarte! 👋</h2>

        <p style="font-size: 1em; margin-bottom: 12px; color: #444;">
          A partir de ahora vas a recibir nuestro <strong>newsletter</strong>, con información confiable sobre oncología, cuidado emocional, actividades comunitarias y recursos de apoyo.
        </p>

        <p style="font-size: 1em; margin-bottom: 12px; color: #444;">
          En <strong>Hablemos de Cáncer</strong> creemos en la importancia de acompañarnos. Este espacio nació para brindar contención, claridad y comunidad a quienes transitan el cáncer, y a quienes los acompañan.
        </p>

        <p style="font-size: 1em; margin-top: 24px; margin-bottom: 8px; color: #444;">Con calidez y respeto,</p>
        <p style="font-size: 1em; color: #444;">El equipo de <strong>Hablemos de Cáncer</strong></p>

        <div style="margin-top: 24px; text-align: center;">
          <a href="https://www.instagram.com/hablemosdecancer" target="_blank"
            style="display: inline-flex; align-items: center; gap: 8px; padding: 12px 24px; border-radius: 9999px; color: white; background: linear-gradient(to right, #ec4899, #ef4444, #f59e0b); text-decoration: none; font-size: 16px; box-shadow: 0 4px 8px rgba(0,0,0,0.15); transition: transform 0.2s ease-in-out;">
            Seguinos en Instagram
          </a>
        </div>

        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #dee2e6; text-align: center;">
          <p style="font-size: 12px; color: #6c757d; margin: 0;">
            Si preferís dejar de recibir nuestros correos, podés 
            <a href="${process.env.APP_URL}/newsletter/unsubscribe/${unsubscribeToken}" style="color: #6c757d;">
              darte de baja aquí.
            </a>
          </p>
        </div>
      </div>
    `,
  };
}
