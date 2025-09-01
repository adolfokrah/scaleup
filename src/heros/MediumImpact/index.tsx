'use client'

import React from 'react'
import { motion } from 'framer-motion'

import type { Page } from '@/payload-types'

import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { Button } from '@/components/ui/button'
import { GridPattern } from '@/components/magicui/grid-pattern'
import { cn } from '@/utilities/ui'

export const MediumImpactHero: React.FC<Page['hero']> = ({ links, media, richText }) => {
  return (
    <div className="relative">
      <div className="bg-secondary text-white relative -mt-[6.4rem] py-70 lg:pb-180">
        <div className="container relative z-10">
          {richText && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <RichText className="mb-6" data={richText} enableGutter={false} />
            </motion.div>
          )}

          {Array.isArray(links) && links.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.4 }}
            >
              <ul className="flex gap-4">
                {links.map(({ link }, i) => {
                  return (
                    <li key={i}>
                      <Button variant={link.appearance}>{link.label.toUpperCase()}</Button>
                    </li>
                  )
                })}
              </ul>
            </motion.div>
          )}
        </div>
      </div>

      {/* Image positioned at far right, extending to edge */}
      {media && typeof media === 'object' && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.6 }}
          className="w-[96%] -mt-[200px] h-auto lg:w-[60%] lg:h-[900px] overflow-hidden lg:ml-auto lg:-mt-[700px]"
        >
          <Media
            className="relative h-full"
            imgClassName="w-full h-full object-cover object-center"
            priority
            resource={media}
          />
        </motion.div>
      )}

      <GridPattern
        width={70}
        height={70}
        x={-1}
        y={-1}
        className={cn(
          '[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)] absolute top-0 left-0',
        )}
      />
    </div>
  )
}
