'use client'

import { Card, CardContent } from '@/components/ui/card'

export default function ResourcePage() {
  

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Inscriptos</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1,2,3,4,5,6,7,8,9,10].map((student) => (
          <Card key={student} className="border border-muted">
            <CardContent className="p-4 space-y-2">
              <p className="font-semibold">Nombre</p>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="text-sm">📞 1234567890</p>
              <p className={`text-sm text-green-600`}>
                Pago confirmado
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}