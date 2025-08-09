import { MessageSquare } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { capitalizeFirstLetter } from "@/lib/utils";
import { SubscriberResourcesList } from "@/app/schema";

export function SubscribersComments({
  subscriberResources,
}: {
  subscriberResources: SubscriberResourcesList;
}) {
  return (
    <div className="grid gap-4">
      <Card className="w-full">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Comentarios de suscriptores
          </CardTitle>
          <MessageSquare className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
            {subscriberResources.length > 0 ? (
              subscriberResources
                .filter((sr) => sr.why_you_are_interested)
                .map((sr) => (
                  <div key={sr.id} className="p-3 border rounded-lg text-sm">
                    <div className="font-medium mb-1">
                      {capitalizeFirstLetter(sr.subscriber.name).trim()}:{" "}
                    </div>
                    <p className="text-muted-foreground">
                      {sr.why_you_are_interested}
                    </p>
                  </div>
                ))
            ) : (
              <p className="text-muted-foreground text-sm">
                No hay comentarios disponibles
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
