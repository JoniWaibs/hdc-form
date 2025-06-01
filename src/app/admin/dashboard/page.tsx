import { Suspense } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { RecentResources } from "@/app/admin/dashboard/components/RecentResources";
import { Overview } from "@/app/admin/dashboard/components/Overview";
import { ResourcesTable } from "@/app/admin/dashboard/components/ResourcesTable";
import { DashboardSkeleton } from "@/app/admin/dashboard/components/DashboardSkeleton";
import { Resource } from "@/app/schema";
import { ResourcesStats } from "@/app/admin/resource/components/ResourcesStats";

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

export default async function AdminDashboard() {
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
    enrollments: Math.floor(Math.random() * 100) + 1, // Número aleatorio entre 1 y 100
  }));

  return (
    <>
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <div className="flex items-center justify-between space-y-2">
          <div className="flex items-center gap-4">
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          </div>
        </div>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Vista General</TabsTrigger>
            <TabsTrigger value="resources">Recursos</TabsTrigger>
            <TabsTrigger value="analytics">Analíticas</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <ResourcesStats resources={resourcesWithEnrollments} />

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Resumen</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  <Overview />
                </CardContent>
              </Card>
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Recursos Recientes</CardTitle>
                  <CardDescription>
                    Has agregado {resources.length} recurso(s) recientemente.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentResources resources={resources.slice(0, 5)} />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="resources" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Todos los Recursos</CardTitle>
                <CardDescription>
                  Administra tus recursos desde aquí.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Suspense fallback={<DashboardSkeleton />}>
                  <ResourcesTable resources={resources} />
                </Suspense>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="analytics" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Analíticas</CardTitle>
                <CardDescription>
                  Visualiza el rendimiento de tus recursos.
                </CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <Overview />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
