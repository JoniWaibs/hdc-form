import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { format } from 'date-fns'
import { Resource } from '../schema';

async function getResources(): Promise<Resource[] | null> {
    try {
      const response = await fetch(
        `${process.env.APP_URL}/api/resources`,
        { cache: 'no-store' } 
      );
      if (!response.ok) return null;
      const { data } = await response.json();
      return data|| null;
    } catch (error) {
      console.error("Error al obtener recurso:", error);
      return null;
    }
  }

export default async function AdminDashboard() {
    const resources: Resource[] | null = await getResources()

    if (!resources) {
        return <div>No se pudo obtener los recursos</div>
    }

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {resources.map((r) => (
        <Link href={`/admin/resource/${r.id}`} key={r.id}>
          <Card className="hover:shadow-xl transition cursor-pointer">
            <CardContent className="p-4">
              <h2 className="text-xl font-bold mb-2">{r.name}</h2>
              <p className="text-sm text-muted-foreground">{r.description}</p>
              <p className="mt-2 text-sm">📅 {format(new Date(r.start_date), 'PPP')}</p>
              <p className="text-sm">💰 ${r.price}</p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
} 