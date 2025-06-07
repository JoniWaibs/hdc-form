interface FormSection {
  fields: string[];
  title: string;
}

export const formSections: FormSection[] = [
  {
    fields: ["name", "age", "identity_document", "profession"],
    title: "Comencemos con tus datos.",
  },
  {
    fields: ["city", "province", "email", "phone"],
    title: "¿Dónde  vivís y cómo te contactamos?",
  },
  {
    fields: ["how_did_you_hear", "why_you_are_interested"],
    title: "Últimas preguntas",
  },
];

export const formPlaceholder = new Map<string, string>([
  ["phone", "ej: 54 11 1234-5678"],
  ["how_did_you_hear", ""],
  ["why_you_are_interested", ""],
]);

export const formLabel = new Map<string, string>([
  ["name", "Nombre y apellido"],
  ["identity_document", "Documento de identidad"],
  ["email", "Email"],
  ["age", "Edad"],
  ["profession", "Profesión u oficio"],
  ["phone", "Teléfono"],
  ["city", "Ciudad"],
  ["province", "Provincia"],
  ["how_did_you_hear", "¿Cómo te enteraste de esta propuesta? (opcional)"],
  ["why_you_are_interested", "¿Por qué te interesó esta propuesta? (opcional)"],
]);
