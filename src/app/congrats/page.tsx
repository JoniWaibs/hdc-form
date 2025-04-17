'use client'

import { useEffect, useState } from 'react'
import { CongratsScreen } from '@/components/custom/congratsScreen'
import { Resource } from '@/app/schema'
import { SplashLoaderModal } from '@/components/custom/splashLoaderModal'
import { useSearchParams } from 'next/navigation'

export default function CongratsPage() {
    const searchParams = useSearchParams()
    const [loading, setLoading] = useState<boolean>(true)
    const [resource, setResource] = useState<Resource | null>(null)
    const resourceId = searchParams.get('resource_id')

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

  if(loading || !resource) {
    return <SplashLoaderModal open={loading} message="Un momento... ya casi estamos ✅" />
  }

  return (
    <CongratsScreen courseName={resource?.name || ''} />
  )
}
