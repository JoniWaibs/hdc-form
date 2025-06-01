import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, DollarSign, Users, NotebookText } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { Resource } from "@/app/schema";

interface ResourcesStatsProps {
  resources: Resource[];
}

export function ResourcesStats({ resources }: ResourcesStatsProps) {
  const totalResources = resources?.length || 0;
  //const totalRevenue = resources.reduce((sum, resource) => sum + (resource.price || 0), 0)
  //const totalEnrollments = resources.reduce((sum, resource) => sum + resource.enrollments, 0)
  //const avgPrice = totalResources > 0 ? totalRevenue / totalResources : 0

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Recursos</CardTitle>
          <NotebookText className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalResources}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Ingresos Totales
          </CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatPrice(0, "ARS")}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Total Inscriptos
          </CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{0}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Precio Promedio</CardTitle>
          <Activity className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatPrice(0, "ARS")}</div>
        </CardContent>
      </Card>
    </div>
  );
}
