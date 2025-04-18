'use client'

import { Suspense, use, useEffect, useState } from 'react'
import { CongratsScreen } from '@/components/custom/congratsScreen'
import { Resource } from '@/app/schema'
import { SplashLoaderModal } from '@/components/custom/splashLoaderModal'
//import { useSearchParams } from 'next/navigation'

export default function CongratsPage({ params }: { params: Promise<{ resource_id: string }> }) {
    const { resource_id: resourceId } = use(params)

    const [loading, setLoading] = useState<boolean>(true)
    const [resource, setResource] = useState<Resource | null>(null)

  useEffect(() => {
    if(resourceId) {
      setLoading(true)
      fetchResource()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchResource = async () => {

    try { 
      const response = await fetch(`/api/resources?resource_id=${resourceId}`)
      
      if(!response.ok) {
        throw new Error('No se pudo obtener el recurso')
      }
      const { data } = await response.json()

    if(data) {
      setResource(data[0])
      setLoading(false)
    }
  } catch (error) {
    console.error('Error en /api/congrats:', (error as Error).message)
    setLoading(false)
  }
  }

  return (
    <Suspense fallback={<SplashLoaderModal open={loading} message="Un momento... estamos procesando tus datos ✅" />}>
      <CongratsScreen resourceName={resource?.name || ''} />
    </Suspense>
  )
}
