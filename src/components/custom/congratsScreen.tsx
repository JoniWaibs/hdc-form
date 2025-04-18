'use client'

import { motion } from 'framer-motion'
import successCheck from '@/app/assets/lottie/success-check.json'
import wave from '@/app/assets/svg/wave-bg.svg'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { RRSSButton } from '@/components/custom/rrssButton'
import { getUrls } from '@/lib/utils'
import dynamic from 'next/dynamic'

const Player = dynamic(() => import('lottie-react'), { ssr: false })

type Props = {
  resourceName: string
}

function CongratsScreen({ resourceName }: Props) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [LottiePlayer, setLottiePlayer] = useState<any>(null)

    useEffect(() => {
      if (!canvasRef.current) return
      import('canvas-confetti').then((module) => {
        const confetti = module.default
        const myConfetti = confetti.create(canvasRef.current!, {
          resize: true,
          useWorker: true,
        })
    
        myConfetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        })
      })

      import('lottie-react').then((mod) => {
        setLottiePlayer(() => mod.default)
      })
    }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen flex flex-col items-center justify-between bg-[#f8fafc] text-center"
    >

    <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full pointer-events-none z-50"
      />

      {
        LottiePlayer && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-50 h-50"
          >
            <Player autoplay loop animationData={successCheck} />
          </motion.div>
        )
      }

      {/* Contenido */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="flex flex-col gap-4 max-w-xl px-12"
      >
        <h1 className="text-3xl sm:text-4xl font-semibold text-gray-800 pb-6">¡Inscripción confirmada!</h1>
        <p className="text-gray-600 text-base sm:text-lg">
          Ya estás inscripto en el curso <strong>{resourceName}</strong>.<br />
          En breve recibirás un correo con más información y detalles de pago.
        </p>
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="mt-10"
      >
        <RRSSButton url={getUrls("instagram")!} />
      </motion.div>

      {/* Ola decorativa */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.4 }}
        className="w-full relative"
      >
        <Image
          src={wave}
          alt="wave background"
          className="w-full h-auto"
          priority
        />
      </motion.div>
    </motion.div>
  )
}

export { CongratsScreen }
