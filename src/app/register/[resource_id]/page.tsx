
import { Resource } from "@/app/schema/resource"
import RegisterFormScreen from './components/RegisterFormScreen'

async function getResource(resourceId: string): Promise<Resource | null> {
    try {
      const response = await fetch(
        `${process.env.APP_URL}/api/resources?resource_id=${resourceId}`,
        { cache: 'no-store' } 
      );
      if (!response.ok) return null;
  
      const { data } = await response.json();
      return data?.[0] || null;
    } catch (error) {
      console.error("Error al obtener recurso:", error);
      return null;
    }
  }


export default async function RegisterPage({ params }: { params: Promise<{ resource_id: string }> }) {
    const { resource_id } = await params
    const resource = await getResource(resource_id)

    if (!resource) {
        return (
          <div className="p-8 text-center text-red-500">
            No se pudo encontrar el recurso solicitado.
          </div>
        )
      }

      return <RegisterFormScreen resource={resource} />
}
