import { Suspense } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

import { ResourcesTable } from "@/app/admin/dashboard/components/ResourcesTable";
import { DashboardSkeleton } from "@/app/admin/dashboard/components/DashboardSkeleton";
import { ResourcesHeader } from "@/app/admin/resources/components/ResourcesHeader";
import { ResourcesFilters } from "@/app/admin/resources/components/ResourcesFilters";
import { ResourcesCards } from "@/app/admin/resources/components/ResourcesCards";
import { ResourcesStats } from "@/app/admin/resources/components/ResourcesStats";
import type { Resource } from "@/app/schema";

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

export default async function ResourcesPage() {
  const resources = await getResources();

  if (!resources) {
    return (
      <div className="flex h-[50vh] w-full items-center justify-center">
        <p className="text-muted-foreground">No se pudo obtener los recursos</p>
      </div>
    );
  }

  const resourcesWithEnrollments = resources.map((resource) => ({
    ...resource,
    enrollments: Math.floor(Math.random() * 100) + 1, // TODO: sumar cuandtos suscriptores hay para cada recurso
  }));

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <ResourcesHeader />

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <ResourcesFilters />
        <Button asChild>
          <Link
            href="/admin/resources/new"
            className="cursor-not-allowed pointer-events-none opacity-50"
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Nuevo Recurso
          </Link>
        </Button>
      </div>

      <ResourcesStats resources={resourcesWithEnrollments} />

      <Card>
        <CardHeader>
          <CardTitle>Todos los Recursos</CardTitle>
          <CardDescription>
            Administra tus recursos y accede a sus dashboards específicos.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<DashboardSkeleton />}>
            <ResourcesTable
              resources={resources}
              actionLink="/admin/resource"
            />
          </Suspense>
        </CardContent>
      </Card>

      <ResourcesCards resources={resourcesWithEnrollments} />
    </div>
  );
}
