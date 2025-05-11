/app
/registro
page.tsx → Formulario de registro
/api
/registro
route.ts → Guarda en BD, inicializa pago
/webhook
/mercadopago.ts → Callback de MercadoPago (POST)
/notificar
route.ts → Lógica para reenviar recordatorios

/lib
mercadopago.ts → Instancia de SDK y funciones
email.ts → Envío de mails
db.ts → Prisma o Supabase

/components
RegisterForm.tsx → Formulario con validación
ThankYou.tsx → Vista post-pago
