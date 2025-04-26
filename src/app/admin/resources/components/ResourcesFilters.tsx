"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SlidersHorizontal } from "lucide-react"

export function ResourcesFilters() {
  const [open, setOpen] = useState(false)

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
      <div className="relative w-full sm:w-64">
        <Input placeholder="Buscar recursos..." className="w-full" />
      </div>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="h-9 gap-1">
            <SlidersHorizontal className="h-3.5 w-3.5" />
            <span>Filtros</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[200px]">
          <DropdownMenuLabel>Filtrar por estado</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuCheckboxItem checked>Todos</DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem>Activos</DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem>Pendientes</DropdownMenuCheckboxItem>
          <DropdownMenuSeparator />
          <DropdownMenuLabel>Ordenar por</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuCheckboxItem checked>Más recientes</DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem>Precio: Mayor a menor</DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem>Precio: Menor a mayor</DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem>Más inscritos</DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
