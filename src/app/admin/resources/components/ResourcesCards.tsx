"use client"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Users } from "lucide-react"
import Link from "next/link"
import type { Resource } from "@/app/schema"
import { formatPrice, formatResourceDate } from "@/lib/utils"

interface ResourcesCardsProps {
  resources: (Resource & { enrollments: number })[]
}

export function ResourcesCards({ resources }: ResourcesCardsProps) {
  const displayedResources = resources.slice(0, 3)

  return (
    <div>
      <h3 className="mb-4 text-lg font-medium">Recurso más vendido</h3>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {displayedResources.map((resource) => {
          const isActive = new Date(resource.start_date) <= new Date()

          return (
            <Card key={resource.id} className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex justify-between">
                  <CardTitle className="line-clamp-1 text-base">{resource.name}</CardTitle>
                  <Badge variant={isActive ? "default" : "secondary"}>{isActive ? "Activo" : "Pendiente"}</Badge>
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <p className="line-clamp-2 text-sm text-muted-foreground">{resource.description}</p>
                <div className="mt-4 flex flex-wrap gap-3 text-sm">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                    <span>{formatResourceDate(resource.start_date)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>{formatPrice(resource.price, "ARS")}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-3.5 w-3.5 text-muted-foreground" />
                    <span>{resource.enrollments} inscritos</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline" className="w-full">
                  <Link href={`/admin/resource/${resource.id}`}>Ver Dashboard</Link>
                </Button>
              </CardFooter>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
