"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { CalendarIcon, Loader2 } from "lucide-react";
import Link from "next/link";
import { es } from "date-fns/locale";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { cn, toLocalDateString } from "@/lib/utils";

const ResourceSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  description: z.string().nullable(),
  start_date: z.string({ required_error: "La fecha de inicio es requerida" }),
  end_date: z.string({ required_error: "La fecha de fin es requerida" }),
  price: z.number().min(0, "El precio debe ser mayor o igual a 0"),
  meet_url: z.string().url("Debe ser una URL válida"),
  session_count: z.number().min(1, "Debe tener al menos 1 sesión"),
  disclaimer: z.string().nullable(),
});

type ResourceFormValues = z.infer<typeof ResourceSchema>;

export default function NewResourcePage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<ResourceFormValues>({
    resolver: zodResolver(ResourceSchema),
    defaultValues: {
      name: "",
      description: "",
      start_date: "",
      end_date: "",
      price: 0,
      meet_url: "",
      session_count: 1,
      disclaimer: "",
    },
  });

  const onSubmit = async (data: ResourceFormValues) => {
    console.log(data);
    try {
      setIsLoading(true);

      const response = await fetch("/api/resources", {
        method: "POST",
        body: JSON.stringify(data),
      });
      const result = await response.json();

      if (result.status === 200) {
        console.log("recurso creado exitosamente");
        router.push("/admin/resources");
      } else {
        console.error("Error al crear recurso:", result.error);
      }
    } catch (error) {
      console.error("Error al crear recurso:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-1 space-y-6 p-6 md:p-8">
      <div className="flex items-center justify-between space-y-2">
        <div className="space-y-0.5">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink
                  href="/admin/dashboard"
                  className="text-muted-foreground hover:text-primary"
                >
                  Dashboard
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink
                  href="/admin/resources"
                  className="text-muted-foreground hover:text-primary"
                >
                  Recursos
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h1 className="text-3xl font-bold tracking-tight">
            Crear nuevo recurso
          </h1>
          <p className="text-[15px] text-muted-foreground">
            Completa la información para crear un nuevo recurso educativo.
          </p>
        </div>
      </div>

      <Card className="max-w-4xl">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Información del recurso</CardTitle>
          <CardDescription className="text-[15px]">
            Proporciona todos los detalles necesarios para el nuevo recurso.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">
                      Nombre del recurso
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Curso de Programación"
                        className="h-11"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">Descripción</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe el contenido y objetivos del recurso..."
                        className="min-h-[120px] resize-none"
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="start_date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className="text-base">
                        Fecha de Inicio
                      </FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "h-11 w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground",
                              )}
                            >
                              {field.value ? (
                                format(
                                  new Date(field.value + "T12:00:00"),
                                  "PPP",
                                  {
                                    locale: es,
                                  },
                                )
                              ) : (
                                <span>Selecciona una fecha</span>
                              )}
                              <CalendarIcon className="ml-auto h-5 w-5 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            selected={
                              field.value
                                ? new Date(field.value + "T12:00:00")
                                : undefined
                            }
                            onSelect={(date) => {
                              if (date) {
                                field.onChange(toLocalDateString(date));
                              }
                            }}
                            disabled={(date) => date < new Date()}
                            defaultMonth={
                              field.value
                                ? new Date(field.value + "T12:00:00")
                                : new Date()
                            }
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="end_date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className="text-base">Fecha de Fin</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "h-11 w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground",
                              )}
                            >
                              {field.value ? (
                                format(
                                  new Date(field.value + "T12:00:00"),
                                  "PPP",
                                  {
                                    locale: es,
                                  },
                                )
                              ) : (
                                <span>Selecciona una fecha</span>
                              )}
                              <CalendarIcon className="ml-auto h-5 w-5 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            selected={
                              field.value
                                ? new Date(field.value + "T12:00:00")
                                : undefined
                            }
                            onSelect={(date) => {
                              if (date) {
                                field.onChange(toLocalDateString(date));
                              }
                            }}
                            disabled={(date) => {
                              const startDate = form.getValues("start_date");
                              return startDate
                                ? date < new Date(startDate)
                                : date < new Date();
                            }}
                            defaultMonth={
                              field.value
                                ? new Date(field.value + "T12:00:00")
                                : new Date()
                            }
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base">Precio</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="0.00"
                          className="h-11"
                          {...field}
                          onChange={(e) =>
                            field.onChange(
                              Number.parseFloat(e.target.value) || 0,
                            )
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="session_count"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base">
                        Número de Sesiones
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="1"
                          className="h-11"
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number.parseInt(e.target.value) || 1)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="meet_url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">
                      URL de la Reunión
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="url"
                        placeholder="https://meet.google.com/xxx-xxxx-xxx"
                        className="h-11"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="text-[13px]">
                      Enlace para acceder a las sesiones virtuales
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="disclaimer"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">
                      Descargo de Responsabilidad
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Términos y condiciones adicionales..."
                        className="min-h-[100px] resize-none"
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormDescription className="text-[13px]">
                      Información legal o términos específicos del recurso
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end space-x-4 pt-6">
                <Button
                  type="button"
                  variant="outline"
                  asChild
                  disabled={isLoading}
                  className="h-11"
                >
                  <Link href="/admin/resources">Cancelar</Link>
                </Button>
                <Button type="submit" disabled={isLoading} className="h-11">
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creando...
                    </>
                  ) : (
                    "Crear recurso"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
