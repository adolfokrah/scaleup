'use client'
import { cn } from '@/utilities/ui'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Media } from '@/components/Media'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { getHref } from '@/utilities/getHref'
import RichText from '@/components/RichText'

import type { ContentMetricsBlock as ContentMetricsBlockProps } from '@/payload-types'

// Animated counter component
const AnimatedCounter: React.FC<{ value: string; inView: boolean }> = ({ value, inView }) => {
  const [count, setCount] = useState(0)

  // Extract number and suffix from value (e.g., "200M" -> 200 and "M")
  const numericValue = parseInt(value.replace(/[^0-9]/g, ''))
  const suffix = value.replace(/[0-9]/g, '')
  const prefix = value.match(/^[^0-9]*/)?.[0] || ''

  useEffect(() => {
    if (!inView) return

    let startTime: number
    const duration = 2000 // 2 seconds

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const currentCount = Math.floor(easeOutQuart * numericValue)

      setCount(currentCount)

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [inView, numericValue])

  return (
    <span className="text-4xl font-bold font-tiempos">
      {prefix}
      {count}
      {suffix}
    </span>
  )
}

export const ContentMetricsBlock: React.FC<ContentMetricsBlockProps> = (props) => {
  const { id, content, ctaButton, metrics, image } = props

  const href = ctaButton?.link ? getHref(ctaButton.link) : null

  return (
    <div id={id || undefined}>
      <div className="container grid grid-cols-1 md:grid-cols-2">
        <motion.div
          className="py-10 lg:py-40"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            delay: 1 * 0.1,
            ease: 'easeOut',
          }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <RichText data={content} />

          <div className="pl-4 pt-6">
            {href && (
              <Link href={href}>
                <Button>{ctaButton?.text}</Button>
              </Link>
            )}
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            delay: 2 * 0.1,
            ease: 'easeOut',
          }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <Media
            resource={image}
            className="w-full h-full"
            imgClassName="w-full h-full object-cover"
          />
        </motion.div>
      </div>
      <motion.div
        className="bg-primary lg:bg-secondary relative"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.6,
          delay: 3 * 0.1,
          ease: 'easeOut',
        }}
        viewport={{ once: true, margin: '-100px' }}
      >
        <div className="container grid grid-cols-2 lg:grid-cols-4 text-white relative z-10">
          {metrics?.map((metric, index) => (
            <div
              key={metric.id}
              className={cn('flex flex-col py-15 bg-primary', {
                'bg-pimary pl-0 lg:bg-secondary md:pl-10': index === metrics.length - 1,
              })}
            >
              <motion.div
                initial={false}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: '-100px' }}
              >
                <AnimatedCounter value={metric.value || ''} inView={true} />
              </motion.div>
              <span className="text-sm font-work-sans">{metric.label}</span>
            </div>
          ))}
        </div>
        <div className="hidden lg:block bg-primary h-full w-[50%] left-0 top-0 absolute"></div>
      </motion.div>
    </div>
  )
}
