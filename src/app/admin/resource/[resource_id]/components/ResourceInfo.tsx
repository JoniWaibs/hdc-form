import { Resource, SubscriberResourcesList } from "@/app/schema";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { capitalizeFirstLetter, formatResourceDate, formatPrice } from "@/lib/utils";
import { Calendar, DollarSign, Users } from "lucide-react";

export function ResourceInfo({ resource, subscriberResources }: { resource: Resource, subscriberResources: SubscriberResourcesList }) {
  return (
    <div className="grid gap-4 md:grid-cols-4">
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Fecha de Inicio</CardTitle>
        <Calendar className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
      <div className="text-2xl font-bold">{capitalizeFirstLetter(formatResourceDate(resource.start_date))}</div>
      <p className="text-xs text-muted-foreground mt-1">
          Finaliza: {resource.end_date ? capitalizeFirstLetter(formatResourceDate(resource.end_date)) : "No definida"}
        </p>
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
        <div className="text-2xl font-bold">{subscriberResources.length || 0}</div>
        <p className="text-xs text-muted-foreground mt-1">
          {subscriberResources.filter(sr => sr.payment_confirmed).length} pagos confirmados
        </p>
      </CardContent>
    </Card>
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Recaudación actual</CardTitle>
        <DollarSign className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {formatPrice(
            subscriberResources
              .filter(subscriberResource => subscriberResource.payment_confirmed)
              .reduce(
                (total, subscriberResource) => total + (subscriberResource.resource.price || 0),
                0
              ),
            "ARS"
          )}
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          Total a recaudar: <span className="font-bold">{formatPrice(resource.price * subscriberResources.length, "ARS")}</span>
        </p>
      </CardContent>
    </Card>
  </div>
  )
}