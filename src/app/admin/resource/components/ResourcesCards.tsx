"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Copy, Send } from "lucide-react";
import Link from "next/link";
import type { Resource, SubscriberResourcesList } from "@/app/schema";
import {
  capitalizeFirstLetter,
  formatPrice,
  formatLongDate,
  getResourceStatus,
} from "@/lib/utils";
import { toast } from "sonner";
import { Currency } from "@/lib/enums/currency";

export function ResourcesCards({
  resources,
  subscriberResources = [],
}: {
  resources: Resource[];
  subscriberResources: SubscriberResourcesList | null;
}) {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {resources.map((resource: Resource) => {
          const resourceStatus = getResourceStatus(resource);

          return (
            <Card key={resource.id} className="overflow-hidden">
              <CardHeader>
                <div className="flex justify-between pb-2">
                  <CardTitle className="line-clamp-1 text-base">
                    {resource.name}
                  </CardTitle>
                  <Badge variant={resourceStatus.variant}>
                    {resourceStatus.text}
                  </Badge>
                </div>
                <div className="flex flex-row justify-between items-start">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-1 text-sm">
                      <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                      <span>
                        {capitalizeFirstLetter(
                          formatLongDate(resource.start_date),
                        )}
                      </span>
                    </div>
                    {resource.end_date &&
                      resource.end_date !== resource.start_date && (
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                          <span>
                            {capitalizeFirstLetter(
                              formatLongDate(resource.end_date),
                            )}
                          </span>
                        </div>
                      )}
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <span>
                      {resource.session_count}{" "}
                      {resource.session_count > 1 ? "Encuentros" : "Encuentro"}
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3 text-sm justify-between">
                  <div className="flex items-center gap-1 bg-muted px-1 py-1 rounded-md">
                    <span>{formatPrice(resource.price, Currency.ARS)}</span>
                  </div>
                  <div className="flex items-center gap-1 bg-muted px-1 py-1 rounded-md">
                    <span>
                      {
                        subscriberResources?.filter(
                          (subscriberResource) =>
                            subscriberResource.resource.id === resource.id,
                        ).length
                      }{" "}
                      inscritos
                    </span>
                  </div>
                  <div className="flex items-center gap-1 bg-muted px-1 py-1 rounded-md">
                    <span>
                      {
                        subscriberResources?.filter(
                          (subscriberResource) =>
                            subscriberResource.payment_confirmed,
                        ).length
                      }{" "}
                      confirmados
                    </span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-2">
                <Button className="w-full">
                  <Link href={`/admin/resource/${resource.id}`}>
                    Mas detalles
                  </Link>
                </Button>
                <div className="flex gap-2 w-full">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => {
                      navigator.clipboard
                        .writeText(
                          `${window.location.origin}/register/${resource.id}`,
                        )
                        .then(() => {
                          toast.success("Enlace copiado");
                        })
                        .catch(() => {
                          toast.error("Error al copiar enlace");
                        });
                    }}
                  >
                    <Copy className="mr-2 h-4 w-4" />
                    Copiar enlace
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => {
                      const url = `https://wa.me/?text=${encodeURIComponent(
                        `¡Inscríbete en este recurso! ${window.location.origin}/register/${resource.id}`,
                      )}`;
                      window.open(url, "_blank");
                    }}
                  >
                    <Send className="mr-2 h-4 w-4" />
                    Compartir
                  </Button>
                </div>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
