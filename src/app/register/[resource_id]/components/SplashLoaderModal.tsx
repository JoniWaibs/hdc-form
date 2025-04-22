'use client'

import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { Loader2 } from 'lucide-react'

interface SplashLoaderModalProps {
  open: boolean
  message?: string
}

export const SplashLoaderModal = ({ open, message = 'Cargando...' }: SplashLoaderModalProps) => {
  return (
    <Dialog open={open}>
      <DialogContent className="flex flex-col items-center gap-4 p-8">
        <DialogTitle>
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </DialogTitle>
        <p className="text-sm text-muted-foreground">{message}</p>
      </DialogContent>
    </Dialog>
  )
}
