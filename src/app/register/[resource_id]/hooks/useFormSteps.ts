import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import {
  SubscriberWithHowDidYouHear,
  SubscriberWithHowDidYouHearSchema,
} from "@/app/schema";

interface FormSection {
  fields: string[];
  title: string;
}

interface UseFormStepsProps {
  formSections: FormSection[];
  form: UseFormReturn<SubscriberWithHowDidYouHear>;
  setLoading: (loading: boolean) => void;
}

export function useFormSteps({
  formSections,
  form,
  setLoading,
}: UseFormStepsProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const currentSection = formSections[currentStep];
  const isLastStep = currentStep === formSections.length - 1;

  const nextStep = async () => {
    const fieldsToValidate = currentSection.fields as Array<
      keyof z.infer<typeof SubscriberWithHowDidYouHearSchema>
    >;

    const isValid = await form.trigger(fieldsToValidate);
    if (isValid && currentStep < formSections.length - 1) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };

  const clearForm = () => {
    form.reset();
    setCurrentStep(0);
    setLoading(false);
  };

  return {
    currentStep,
    currentSection,
    isLastStep,
    nextStep,
    prevStep,
    clearForm,
  };
}
