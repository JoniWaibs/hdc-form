"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { PaymentButton } from "./PaymentButton"

export function ResourceEnrollments({ resourceId }: { resourceId: string }) {
  const [searchQuery, setSearchQuery] = useState("")

  // Datos simulados de estudiantes inscritos
  const students = Array.from({ length: 10 }).map((_, index) => ({
    id: `student-${index + 1}`,
    name: `Estudiante ${index + 1}`,
    email: `estudiante${index + 1}@ejemplo.com`,
    country: "Argentina",
    payment: "Pendiente",
  }))

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle>Estudiantes Inscritos</CardTitle>
        <CardDescription>Lista de estudiantes inscritos en este recurso.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar estudiantes..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" disabled>Exportar</Button>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Suscriptor</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Pais</TableHead>
                <TableHead>Pago</TableHead>
                <TableHead>Pago realizado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>
                        {student.name}
                    </TableCell>
                    <TableCell>{student.email}</TableCell>
                    <TableCell>{student.country}</TableCell>
                    <TableCell>{student.payment}</TableCell>
                    <TableCell>
                    <PaymentButton
                        studentId={student.id}
                        resourceId={resourceId}
                        onPaymentMarked={(studentId) => {
                          console.log(`Pago marcado para el estudiante ${studentId}`)
                          // Aquí puedes actualizar el estado local si lo necesitas
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center">
                    No se encontraron estudiantes.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
