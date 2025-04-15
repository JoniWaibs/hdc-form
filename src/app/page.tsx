"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { formContent, formPlaceholders } from "./content/form"

const formSchema = z.object({
  name: z.string().min(1, "(*)"),
  email: z.string().email("Email inválido"),
  age: z.string().min(1, "(*)"),
  phone: z.string().min(1, "(*)"),
  city: z.string().min(1, "(*)"),
  province: z.string().min(1, "(*)"),
  country: z.string().min(1, "(*)"),
  profession: z.string().min(1, "(*)"),
  how_did_you_hear: z.string().min(1, "(*)"),
  identity_document: z.string().min(1, "(*)"),
})

export default function StudentRegistrationForm() {
  const [currentStep, setCurrentStep] = useState(0)

  const formSections = [
    { fields: ["name", "age", "identity_document"], title: "Comencemos con tu información básica." },
    { fields: ["profession"], title: "Contanos sobre tu formación profesional." },
    { fields: ["email", "phone"], title: "¿Cómo podemos contactarte?" },
    { fields: ["city", "province", "country"], title: "¿Dónde te vivís?" },
    { fields: ["how_did_you_hear"], title: "¿Como te enteraste del curso?" },
  ]

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
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
    },
    mode: "onChange",
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log({values})
    // Here you would typically send the data to your backend
    alert("Form submitted successfully!")
  }

  const currentSection = formSections[currentStep]
  const isLastStep = currentStep === formSections.length - 1

  const nextStep = async () => {
    const fieldsToValidate = currentSection.fields as Array<keyof z.infer<typeof formSchema>>

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
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4 md:p-8">
      <div className="w-full max-w-3xl">
        <div className="mb-8 flex justify-center">
          <div className="h-16 w-auto">
            {/* Replace with your company logo */}
            <div className="flex h-full items-center justify-center text-2xl font-bold">LOGO</div>
          </div>
        </div>

        <Card className="w-full">
          <CardHeader className="border-b bg-muted/50 px-6 py-4">
            <h2 className="text-xl font-semibold">{currentSection.title}</h2>
            <div className="mt-1 flex w-full gap-1">
              {formSections.map((_, index) => (
                <div
                  key={index}
                  className={`h-1 flex-1 rounded-full ${index <= currentStep ? "bg-primary" : "bg-muted"}`}
                />
              ))}
            </div>
          </CardHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardContent className="space-y-6 p-6">
                {currentSection.fields.map((fieldName) => {
                  const field = fieldName as keyof z.infer<typeof formSchema>
                  const label = formContent.get(field)
                  const placeholder = formPlaceholders.get(field)

                  return (
                    <FormField
                      key={field}
                      control={form.control}
                      name={field}
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex justify-between text-center">
                          <FormLabel className="text-base">
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
                              field.name === "how_did_you_hear" ? (
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
              <CardFooter className="flex justify-between border-t bg-muted/50 p-0">
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
                      Submit
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
        </Card>
      </div>
    </div>
  )
}
