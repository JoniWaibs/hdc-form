"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { SuscriptorSchema } from "@/app/schema/suscriptor"

import { ChevronLeft, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { CardContent, CardFooter } from "@/components/ui/card"
import { formLabel, formPlaceholder } from "./content/form"
import { handleInputType } from "@/lib/utils"


export default function SuscriptorRegistrationForm() {
  const [currentStep, setCurrentStep] = useState(0)
  const resourceId = "2c53f4cf-7186-4a36-947e-140497003c56"

  const formSections = [
    { fields: ["name", "age", "identity_document"], title: "Comencemos con tus datos." },
    { fields: ["profession"], title: "Contanos sobre tu ocupación" },
    { fields: ["email", "phone"], title: "¿Cómo podemos contactarte?" },
    { fields: ["city", "province", "country"], title: "¿Dónde  vivís?" },
    { fields: ["how_did_you_hear", "why_did_you_interested"], title: "Últimas preguntas" },
  ]

  const form = useForm<z.infer<typeof SuscriptorSchema>>({
    resolver: zodResolver(SuscriptorSchema),
    defaultValues: {
      name: "",
      email: "",
      age: "",
      phone: "",
      city: "",
      province: "",
      country: "",
      profession: "",
      how_did_you_hear: "",
      identity_document: "",
      why_did_you_interested: "",
    },
    mode: "onChange",
  })
  async function onSubmit(values: z.infer<typeof SuscriptorSchema>) {
    const response = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({
        suscriptor: values,
        resource_id: resourceId,
      }),
    })

    const data = await response.json()
    if (data.ok) {
      console.log({ data })
      alert("¡Congrats de registro exitoso!")
      window.scrollTo(0, 0)
      setCurrentStep(currentStep + 1)
    }
  }

  const currentSection = formSections[currentStep]
  const isLastStep = currentStep === formSections.length - 1

  const nextStep = async () => {
    const fieldsToValidate = currentSection.fields as Array<keyof z.infer<typeof SuscriptorSchema>>

    const isValid = await form.trigger(fieldsToValidate)
    if (isValid && currentStep < formSections.length - 1) {
      setCurrentStep(currentStep + 1)
      window.scrollTo(0, 0)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
      window.scrollTo(0, 0)
    }
  }

  const clearForm = () => {
    form.reset()
    setCurrentStep(0)
  }

  return (
    <div className="flex min-h-screen flex-col items-center bg-gray-50 p-4 md:p-8">
      <div className="w-full max-w-3xl h-full">
        <div className="mb-8 flex justify-center h-2/4">
          <div className="h-16 w-auto">
            {/* Replace with your company logo */}
            <div className="flex h-full items-center justify-center text-2xl font-bold">LOGO</div>
          </div>
        </div>

        <div className="w-full shadow-none h-2/4">
          <div className="border-b py-4">
            <h2 className="text-xl font-semibold py-2">{currentSection.title}</h2>
            <div className="mt-1 flex w-full gap-1">
              {formSections.map((_, index) => (
                <div
                  key={index}
                  className={`h-1 flex-1 rounded-full ${index <= currentStep ? "bg-primary" : "bg-gray-200"}`}
                />
              ))}
            </div>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="h-100">
              <CardContent className="space-y-6 py-6 px-0 h-3/4">
                {currentSection.fields.map((fieldName) => {
                  const field = fieldName as keyof z.infer<typeof SuscriptorSchema>
                  const label = formLabel.get(field)
                  const placeholder = formPlaceholder.get(field)

                  return (
                    <FormField
                      key={field}
                      control={form.control}
                      name={field}
                      render={({ field }) => (
                        <FormItem className="p-0">
                          <div className="flex justify-between text-center">
                          <FormLabel className="text-sm">
                            {label!.charAt(0).toUpperCase() + label!.slice(1)}
                          <FormMessage  />
                          </FormLabel>
                          {
                            field.name === "phone" && (
                              <span className="text-xs text-muted-foreground"></span>
                            )
                          }
                          </div>

                          <FormControl>
                            {
                              handleInputType(field.name) ? (
                                <Textarea rows={3} placeholder={`${label}`} {...field} className="h-12 text-base" />
                              ) : (
                                <Input placeholder={`${placeholder || `Ingresá tu ${label!.toLowerCase()}`}`} {...field} className="h-12 text-base" />
                              )
                            }
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  )
                })}
              </CardContent>
              <CardFooter className="flex justify-between p-0 h-1/4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 0}
                  className="w-28"
                >
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Atrás
                </Button>
                <div className="flex gap-2">
                  <Button type="button" variant="outline" onClick={clearForm} className="w-20">
                    Limpiar
                  </Button>
                  {isLastStep ? (
                    <Button type="submit" className="w-28">
                      Enviar
                    </Button>
                  ) : (
                    <Button type="button" onClick={nextStep} className="w-28">
                      Siguiente
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  )}
                </div>
              </CardFooter>
            </form>
          </Form>
        </div>
      </div>
    </div>
  )
}
