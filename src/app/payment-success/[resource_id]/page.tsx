import { Resource } from "@/app/schema";
import { PaymentSuccessScreen } from "./components/PaymentSuccessScreen";

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

export default async function PaymentSuccessPage({
  params,
}: {
  params: Promise<{ resource_id: string }>;
}) {
  const { resource_id } = await params;
  const resource = await getResource(resource_id);

  return <PaymentSuccessScreen resourceName={resource?.name || ""} />;
}
