import { Suspense } from "react"
import Link from "next/link"
import { ArrowLeft, Calendar, DollarSign, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { ResourceEnrollments } from "@/app/admin/resource/[resource_id]/components/ResourceEnrollments"
import { ResourceSkeleton } from "@/app/admin/resource/[resource_id]/components/ResourceSkeleton"
import { Resource } from "@/app/schema"
import { formatPrice, formatResourceDate } from "@/lib/utils"

async function getResource(resourceId: string): Promise<Resource | null> {
  try {
    const response = await fetch(
      `${process.env.APP_URL}/api/resource?resource_id=${resourceId}`,
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

export default async function ResourceDashboard({ params }: { params: Promise<{ resource_id: string }> }) {
  const { resource_id } = await params
  const resource = await getResource(resource_id)

  if (!resource) {
    return (
      <div className="p-8 text-center text-red-500">
        No se pudo encontrar el recurso solicitado.
      </div>
    )
  }

  const isActive = new Date(resource.start_date) <= new Date()
  const resourcesWithEnrollments = {
    ...resource,
    enrollments: Math.floor(Math.random() * 100) + 1, // Número aleatorio entre 1 y 100
  }

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex items-center justify-between">
        <div>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/admin/dashboard">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/admin/resources">Recursos</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{resource.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="flex items-center gap-2 mt-2">
            <h1 className="text-3xl font-bold tracking-tight">{resource.name}</h1>
            <Badge variant={isActive ? "default" : "secondary"}>{isActive ? "Activo" : "Pendiente"}</Badge>
          </div>
          <p className="mt-1 text-muted-foreground">{resource.description}</p>
        </div>
        <Button variant="outline" size="sm" asChild>
          <Link href="/admin/resources">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Fecha de Inicio</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatResourceDate(resource.start_date)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Precio</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatPrice(resource.price, "ARS")}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Inscritos</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{resourcesWithEnrollments.enrollments}</div>
          </CardContent>
        </Card>
      </div>

      <Suspense fallback={<ResourceSkeleton />}>
        <ResourceEnrollments resourceId={resource.id} />
      </Suspense>
    </div>
  )
}
