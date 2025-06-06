import { ChevronLeft, ChevronRight, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";

interface FormNavigationProps {
  currentStep: number;
  isLastStep: boolean;
  onPrevStep: () => void;
  onNextStep: () => void;
  onClearForm: () => void;
}

export default function FormNavigation({
  currentStep,
  isLastStep,
  onPrevStep,
  onNextStep,
  onClearForm,
}: FormNavigationProps) {
  return (
    <CardFooter className="flex justify-between p-0 py-3 flex-shrink-0">
      <Button
        type="button"
        variant="outline"
        onClick={onPrevStep}
        disabled={currentStep === 0}
        className="w-28"
      >
        <ChevronLeft className="mr-2 h-4 w-4" />
        Atrás
      </Button>
      <div className="flex gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={onClearForm}
          className="w-20"
        >
          Limpiar
        </Button>
        {!isLastStep && (
          <Button type="button" onClick={onNextStep} className="w-28">
            Siguiente
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        )}
        {isLastStep && (
          <Button type="submit" className="w-auto px-6">
            <CreditCard className="mr-2 h-4 w-4" />
            Pagar inscripción
          </Button>
        )}
      </div>
    </CardFooter>
  );
}
