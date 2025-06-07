import { Control } from "react-hook-form";
import { SubscriberWithHowDidYouHear } from "@/app/schema";
import { CardContent } from "@/components/ui/card";
import FormFieldRenderer from "./FormFieldRenderer";

interface FormStepContentProps {
  fields: string[];
  control: Control<SubscriberWithHowDidYouHear>;
  isLastStep: boolean;
}

export default function FormStepContent({
  fields,
  control,
  isLastStep,
}: FormStepContentProps) {
  return (
    <CardContent
      className={`space-y-4 py-4 px-0 flex-1 ${isLastStep ? "" : "overflow-y-auto"}`}
    >
      {fields.map((fieldName) => (
        <FormFieldRenderer
          key={fieldName}
          fieldName={fieldName}
          control={control}
        />
      ))}
    </CardContent>
  );
}
