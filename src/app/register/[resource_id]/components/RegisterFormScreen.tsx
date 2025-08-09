"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import MercadoPagoModal from "@/app/components/MercadoPagoModal";
import FormHeader from "@/app/register/[resource_id]/components/FormHeader";
import FormNavigation from "@/app/register/[resource_id]/components/FormNavigation";
import FormStepContent from "@/app/register/[resource_id]/components/FormStepContent";
import SplashLoaderModal from "@/app/register/[resource_id]/components/SplashLoaderModal";
import StepProgressBar from "@/app/register/[resource_id]/components/StepProgressBar";
import { formSections } from "@/app/register/[resource_id]/content/form";
import { useFormSteps } from "@/app/register/[resource_id]/hooks/useFormSteps";
import { useRegistrationSubmit } from "@/app/register/[resource_id]/hooks/useRegistrationSubmit";
import {
  SubscriberWithHowDidYouHear,
  SubscriberWithHowDidYouHearSchema,
} from "@/app/schema";
import { Resource } from "@/app/schema/resource";

export default function RegisterFormScreen({
  resource,
}: {
  resource: Resource;
}) {
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<SubscriberWithHowDidYouHear>({
    resolver: zodResolver(SubscriberWithHowDidYouHearSchema),
    defaultValues: {
      name: "",
      email: "",
      age: "",
      phone: "",
      city: "",
      province: "",
      country: "Argentina",
      profession: "",
      identity_document: "",
      how_did_you_hear: "",
      why_you_are_interested: "",
    },
    mode: "onChange",
  });

  const {
    currentStep,
    currentSection,
    isLastStep,
    nextStep,
    prevStep,
    clearForm,
  } = useFormSteps({
    formSections,
    form,
    setLoading,
  });

  const { onSubmit } = useRegistrationSubmit({
    resource,
    setLoading,
    clearForm,
  });

  if (loading) {
    return (
      <SplashLoaderModal
        open={loading}
        message="Procesando tu inscripción y preparando el pago..."
      />
    );
  }

  return (
    <div className="flex h-screen flex-col items-center bg-gray-50 p-2 sm:p-4">
      <div className="w-full max-w-3xl flex flex-col">
        <FormHeader resource={resource} />

        <div className="flex-1 flex flex-col shadow-none min-h-0">
          <StepProgressBar
            currentStep={currentStep}
            totalSteps={formSections.length}
            stepTitle={currentSection.title}
          />

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex-1 flex flex-col min-h-0"
            >
              <FormStepContent
                fields={currentSection.fields}
                control={form.control}
                isLastStep={isLastStep}
              />

              <FormNavigation
                currentStep={currentStep}
                isLastStep={isLastStep}
                onPrevStep={prevStep}
                onNextStep={nextStep}
                onClearForm={clearForm}
              />
            </form>
          </Form>

          <MercadoPagoModal amount={resource.price} title={resource.name} />
        </div>
      </div>
    </div>
  );
}
