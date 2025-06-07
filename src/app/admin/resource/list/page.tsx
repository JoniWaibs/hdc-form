import { ResourcesHeader } from "@/app/admin/resource/components/ResourcesHeader";
import { ResourcesFilters } from "@/app/admin/resource/components/ResourcesFilters";
import { ResourcesCards } from "@/app/admin/resource/components/ResourcesCards";
import type { Resource, SubscriberResourcesList } from "@/app/schema";
import { BookOpen, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const dynamic = "force-dynamic";

async function getResources(): Promise<Resource[] | null> {
  try {
    const response = await fetch(`${process.env.APP_URL}/api/resources`);
    if (!response.ok) return null;
    const { data } = await response.json();
    return data || null;
  } catch (error) {
    console.error("Error al obtener recursos:", error);
    return null;
  }
}
async function getSubscriberResources(): Promise<SubscriberResourcesList | null> {
  try {
    const response = await fetch(
      `${process.env.APP_URL}/api/subscriber-resources`,
      {
        cache: "no-store",
      },
    );

    if (!response.ok) return null;
    const { data } = await response.json();

    return data || null;
  } catch (error) {
    console.error("Error al obtener recurso:", error);
    return null;
  }
}

export default async function ResourcesPage() {
  const [resources, subscriberResources] = await Promise.all([
    getResources(),
    getSubscriberResources(),
  ]);

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <ResourcesHeader />

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <ResourcesFilters />
        <Button asChild>
          <Link href="/admin/resource/create">
            <PlusCircle className="mr-2 h-4 w-4" />
            Nuevo Recurso
          </Link>
        </Button>
      </div>

      {!resources?.length ? (
        <div className="flex h-[50vh] w-full flex-col items-center justify-center gap-4">
          <div className="rounded-full bg-muted p-6">
            <BookOpen className="h-8 w-8 text-muted-foreground" />
          </div>
          <div className="text-center">
            <h3 className="text-lg font-medium">No hay recursos disponibles</h3>
            <p className="text-sm text-muted-foreground">
              No encontramos ningún recurso disponible. Creá uno para empezar.
            </p>
          </div>
        </div>
      ) : (
        <ResourcesCards
          resources={resources}
          subscriberResources={subscriberResources}
        />
      )}
    </div>
  );
}
