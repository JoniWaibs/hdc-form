import { Resource } from "@/app/schema/resource";
import RegisterFormScreen from "./components/RegisterFormScreen";

async function getResource(resourceId: string): Promise<Resource | null> {
  try {
    const response = await fetch(
      `${process.env.APP_URL}/api/resource?resource_id=${resourceId}`,
      { cache: "no-store" },
    );

    if (!response.ok) return null;

    const { data } = await response.json();
    return data || null;
  } catch (error) {
    console.error("Error al obtener recurso:", error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ resource_id: string }>;
}) {
  const { resource_id } = await params;
  const resource = await getResource(resource_id);

  if (resource) {
    return {
      title: `Hablemos de Cáncer - ${resource.name}`,
      description: `${resource.description}`,
      openGraph: {
        title: `Hablemos de Cáncer - ${resource.name}`,
        description: `${resource.description}`,
        url: `https://hablemosdecancer.com.ar/register/${resource.id}`,
        images: [
          {
            url: "https://edqkxwgbbunlomuzarwt.supabase.co/storage/v1/object/public/assets//HDC-2-mda-logo-05.png",
            width: 800,
            height: 600,
            alt: `${resource.name}`,
          },
        ],
      },
    };
  }

  return {
    title: "Recurso no encontrado",
    description: "No pudimos encontrar el recurso que buscas.",
  };
}

export default async function RegisterPage({
  params,
}: {
  params: Promise<{ resource_id: string }>;
}) {
  const { resource_id } = await params;
  const resource = await getResource(resource_id);

  if (!resource) {
    return (
      <div className="p-8 text-center text-red-500">
        No se pudo encontrar el recurso solicitado.
      </div>
    );
  }

  return (
    <RegisterFormScreen
      resource={Array.isArray(resource) ? resource[0] : resource}
    />
  );
}
