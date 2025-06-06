"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, Loader2 } from "lucide-react";
import { SubscriberResource } from "@/app/schema";
import {
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
  Tooltip,
} from "@/components/ui/tooltip";
import { toast } from "sonner";

interface PaymentButtonProps {
  subscriberResource: SubscriberResource;
}

export function PaymentButton({ subscriberResource }: PaymentButtonProps) {
  const [isPending, setIsPending] = useState(false);
  const [isPaid, setIsPaid] = useState(false);

  const handleMarkAsPaid = async () => {
    setIsPending(true);

    try {
      const response = await fetch("/api/subscriber-resources", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subscriber_resource: subscriberResource,
          payment_confirmed: true,
        }),
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(
          result.error || "Error al actualizar el estado de pago",
        );
      }

      setIsPaid(true);
      await response.json();
      toast.success("Pago marcado como confirmado");
    } catch (error) {
      toast.error(`${(error as Error).message}`);
    } finally {
      setIsPending(false);
    }
  };

  if (isPaid) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center gap-2 text-green-600">
              <CheckCircle className="h-4 w-4 mr-1" />
              Pagado
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Pago confirmado</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleMarkAsPaid}
      disabled={isPending}
      className="text-primary hover:text-primary-foreground hover:bg-primary"
    >
      {isPending ? (
        <>
          <Loader2 className="h-4 w-4 mr-1 animate-spin" />
          Procesando...
        </>
      ) : (
        "Marcar pagado"
      )}
    </Button>
  );
}
