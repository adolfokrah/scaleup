'use client'
import React from 'react'
import { motion } from 'framer-motion'
import type { GoogleMapsBlock as GoogleMapsBlockProps } from '@/payload-types'

// Fallback type for development
interface FallbackGoogleMapsBlockProps {
  id?: string
  title?: string
  address: string
  latitude?: number
  longitude?: number
  zoom?: number
  height?: 'small' | 'medium' | 'large' | 'xlarge'
  showControls?: boolean
  enableInteraction?: boolean
}

export const GoogleMapsBlock: React.FC<GoogleMapsBlockProps | FallbackGoogleMapsBlockProps> = (
  props,
) => {
  const { id, title, address, zoom = 15, height = 'medium' } = props

  const heightClasses = {
    small: 'h-[300px]',
    medium: 'h-[400px]',
    large: 'h-[500px]',
    xlarge: 'h-[600px]',
  }

  // Create the embedded Google Maps URL (no API key needed)
  const createEmbedUrl = (address: string, zoom: number) => {
    const encodedAddress = encodeURIComponent(address)
    return `https://maps.google.com/maps?q=${encodedAddress}&t=&z=${zoom}&ie=UTF8&iwloc=&output=embed`
  }

  const embedUrl = createEmbedUrl(address, zoom || 15)

  if (!address) {
    return (
      <div className="my-16" id={id || undefined}>
        <div className="container">
          <div
            className={`${heightClasses[height || 'medium']} bg-gray-100 flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300`}
          >
            <p className="text-gray-500">Please provide an address to display the map.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="mt-16" id={id || undefined}>
      <div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            delay: 0.1,
            ease: 'easeOut',
          }}
          viewport={{ once: true, margin: '-100px' }}
        >
          {title && (
            <div className="mb-8 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-secondary">{title}</h2>
            </div>
          )}

          <div className="relative g overflow-hidden ">
            <iframe
              src={embedUrl}
              className={`w-full ${heightClasses[height || 'medium']} border-0`}
              style={{
                minHeight: '300px',
                filter: 'grayscale(100%) contrast(120%) brightness(105%)',
              }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`Map showing ${address}`}
            />
          </div>
        </motion.div>
      </div>
    </div>
  )
}
