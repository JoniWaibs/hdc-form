"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle, Search } from "lucide-react";
import { PaymentButton } from "@/app/admin/resource/[resource_id]/components/PaymentButton";
import { SubscriberResourcesList } from "@/app/schema";
import { capitalizeFirstLetter } from "@/lib/utils";

export function EnrollmentsTable({
  subscriberResources,
}: {
  subscriberResources: SubscriberResourcesList;
}) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSubscriptors = subscriberResources.filter(
    (subscriberResource) =>
      subscriberResource.subscriber.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      subscriberResource.subscriber.email
        .toLowerCase()
        .includes(searchQuery.toLowerCase()),
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Suscriptores</CardTitle>
        <CardDescription>
          Lista de suscriptores en este recurso.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar suscriptores..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" disabled>
            Exportar
          </Button>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Suscriptor</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Pais</TableHead>
                <TableHead>Ciudad</TableHead>
                <TableHead>Profesion</TableHead>
                <TableHead>Pago realizado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSubscriptors.length > 0 ? (
                filteredSubscriptors.map((subscriberResource) => (
                  <TableRow key={subscriberResource.id}>
                    <TableCell>
                      {capitalizeFirstLetter(
                        subscriberResource.subscriber.name,
                      )}
                    </TableCell>
                    <TableCell>
                      {subscriberResource.subscriber.email.toLocaleLowerCase()}
                    </TableCell>
                    <TableCell>
                      {capitalizeFirstLetter(
                        subscriberResource.subscriber.country,
                      )}
                    </TableCell>
                    <TableCell>
                      {capitalizeFirstLetter(
                        subscriberResource.subscriber.city,
                      )}
                    </TableCell>
                    <TableCell
                      className="truncate max-w-[150px]"
                      title={capitalizeFirstLetter(
                        subscriberResource.subscriber.profession,
                      )}
                    >
                      {capitalizeFirstLetter(
                        subscriberResource.subscriber.profession,
                      )}
                    </TableCell>
                    <TableCell>
                      {subscriberResource.payment_confirmed ? (
                        <div className="flex items-center gap-2 text-green-600">
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Pagado
                        </div>
                      ) : (
                        <PaymentButton
                          subscriberResource={subscriberResource}
                        />
                      )}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-left">
                    No se encontraron suscriptores.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
