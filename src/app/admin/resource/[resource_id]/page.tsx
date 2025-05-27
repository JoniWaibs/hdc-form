import { Suspense } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ResourceEnrollments } from "@/app/admin/resource/[resource_id]/components/ResourceEnrollments";
import { ResourceSkeleton } from "@/app/admin/resource/[resource_id]/components/ResourceSkeleton";
import { Resource, SubscriberResourcesList } from "@/app/schema";
import { SubscribersComments } from "./components/SubscribersComments";
import { ResourceInfo } from "./components/ResourceInfo";

async function getResource(resourceId: string): Promise<Resource | null> {
  try {
    const response = await fetch(
      `${process.env.APP_URL}/api/resource?resource_id=${resourceId}`,
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

async function getSubscriberResources(
  resourceId: string,
): Promise<SubscriberResourcesList | null> {
  try {
    const response = await fetch(
      `${process.env.APP_URL}/api/subscriber-resources?resource_id=${resourceId}`,
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

export default async function ResourceDashboard({
  params,
}: {
  params: Promise<{ resource_id: string }>;
}) {
  const { resource_id } = await params;
  const [resource, subscriberResources] = await Promise.all([
    getResource(resource_id),
    getSubscriberResources(resource_id),
  ]);

  if (!resource) {
    return (
      <div className="p-8 text-center text-red-500">
        No se pudo encontrar el recurso solicitado.
      </div>
    );
  }

  if (!subscriberResources) {
    return (
      <div className="p-8 text-center text-red-500">
        No se pudo encontrar el listado de inscritos en este recurso.
      </div>
    );
  }

  const isActive = new Date(resource.start_date) <= new Date();

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex items-center justify-between">
        <div>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/admin/dashboard">
                  Dashboard
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/admin/resources">
                  Recursos
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="flex items-center gap-2 mt-2">
            <h1 className="text-3xl font-bold tracking-tight">
              {resource.name}
            </h1>
            <Badge variant={isActive ? "secondary" : "default"}>
              {isActive ? "Activo" : "Pendiente"}
            </Badge>
          </div>
          <p className="mt-1 text-muted-foreground">{resource.description}</p>
        </div>
      </div>

      <Suspense fallback={<ResourceSkeleton />}>
        <ResourceInfo
          resource={resource}
          subscriberResources={subscriberResources}
        />
      </Suspense>

      <Suspense fallback={<ResourceSkeleton />}>
        <ResourceEnrollments subscriberResources={subscriberResources} />
      </Suspense>

      <Suspense fallback={<ResourceSkeleton />}>
        <SubscribersComments subscriberResources={subscriberResources} />
      </Suspense>
    </div>
  );
}
