"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { CheckCircle, Loader2 } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface PaymentButtonProps {
  studentId: string
  resourceId: string
  onPaymentMarked?: (studentId: string) => void
}

export function PaymentButton({ studentId, resourceId, onPaymentMarked }: PaymentButtonProps) {
  const [isPending, setIsPending] = useState(false)
  const [isPaid, setIsPaid] = useState(false)
    console.log('TODO: marcar como pagado',studentId, resourceId)
  const handleMarkAsPaid = async () => {
    setIsPending(true)

    try {
      // Aquí iría la llamada a tu función para marcar como pagado
      // Esta parte la implementarás tú

      // Simulamos un delay para mostrar el estado de carga
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setIsPaid(true)
      if (onPaymentMarked) {
        onPaymentMarked(studentId)
      }
    } catch (error) {
      console.error("Error al marcar como pagado:", error)
    } finally {
      setIsPending(false)
    }
  }

  if (isPaid) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="sm" className="text-green-500" disabled>
              <CheckCircle className="h-4 w-4 mr-1" />
              Pagado
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Pago confirmado</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
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
  )
}
