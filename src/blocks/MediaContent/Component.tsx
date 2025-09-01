'use client'
import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'
import { ArrowRight } from 'lucide-react'
import { Media } from '@/components/Media'

import type { MediaContentBlock as MediaContentBlockProps } from '@/payload-types'

import Link from 'next/link'
import { getHref } from '@/utilities/getHref'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'

export const MediaContentBlock: React.FC<MediaContentBlockProps> = (props) => {
  const { media, content, link, enableLink, layout = 'imageLeft' } = props

  return (
    <div>
      <motion.div
        className={cn('grid lg:grid-cols-2 items-center lg:min-h-[40vh] 2xl:min-h-[60vh] relative')}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.6,
          delay: 3 * 0.1,
          ease: 'easeOut',
        }}
        viewport={{ once: true, margin: '-100px' }}
      >
        {/* Gray background that extends from image into text section */}
        <div
          className={cn('absolute inset-y-0 lg:bg-gray-100 dark:bg-gray-800', {
            'left-20 w-[60%]': layout === 'imageLeft', // Start 32px from edge, cover about 60%
            'right-8 w-[60%]': layout === 'imageRight', // Start 32px from edge, cover about 60%
          })}
        />

        {/* Media Section */}
        <motion.div
          className={cn('relative flex items-center z-10 2xl:min-h-[80vh] order-1', {
            'justify-start pl-0 pr-8': layout === 'imageLeft',
            'justify-end pl-8 pr-0 lg:order-2': layout === 'imageRight',
          })}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            delay: 4 * 0.1,
            ease: 'easeOut',
          }}
          viewport={{ once: true, margin: '-100px' }}
        >
          {media && typeof media === 'object' && (
            <Media
              resource={media}
              className="w-full max-w-9xl"
              imgClassName="w-full h-auto max-h-[70vh] object-cover"
            />
          )}
        </motion.div>

        {/* Content Section */}
        <motion.div
          className={cn('relative z-10 py-10 order-2', {
            'lg:order-1': layout === 'imageRight',
          })}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            delay: 5 * 0.1,
            ease: 'easeOut',
          }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <div className="container">
            <div
              className={cn('max-w-xl mx-auto space-y-6', {
                'lg:mx-0': layout === 'imageLeft',
                'lg:ml-auto lg:mr-0': layout === 'imageRight',
              })}
            >
              {content && <RichText data={content} enableGutter={false} />}

              {enableLink && link && (
                <div className="pt-4">
                  <Link href={getHref({ ...link })!}>
                    <Button>
                      {link?.label}
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
