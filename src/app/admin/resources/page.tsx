import { ResourcesHeader } from "@/app/admin/resources/components/ResourcesHeader";
import { ResourcesFilters } from "@/app/admin/resources/components/ResourcesFilters";
import { ResourcesCards } from "@/app/admin/resources/components/ResourcesCards";
import type { Resource, SubscriberResourcesList } from "@/app/schema";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

async function getResources(): Promise<Resource[] | null> {
  try {
    const response = await fetch(`${process.env.APP_URL}/api/resources`, {
      cache: "no-store",
    });
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

  if (!resources) {
    return (
      <div className="flex h-[50vh] w-full items-center justify-center">
        <p className="text-muted-foreground">No se pudo obtener los recursos</p>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <ResourcesHeader />

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <ResourcesFilters />
        <Button asChild>
          <Link href="/admin/resources/create">
            <PlusCircle className="mr-2 h-4 w-4" />
            Nuevo Recurso
          </Link>
        </Button>
      </div>

      <ResourcesCards
        resources={resources}
        subscriberResources={subscriberResources}
      />
    </div>
  );
}
