'use client'
import React from 'react'

import type { CallToActionBlock as CTABlockProps } from '@/payload-types'
import { motion } from 'framer-motion'

import RichText from '@/components/RichText'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { getHref } from '@/utilities/getHref'

export const CallToActionBlock: React.FC<CTABlockProps> = ({ links, richText }) => {
  return (
    <div className="bg-gradient-to-t from-primary/20 to-white mt-16">
      <div className="max-w-4xl flex flex-col md:flex-row gap-4 justify-between container items-center border-t py-20 border-t-gray-200/60">
        {/* Rich Text Content */}
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
          {richText && <RichText data={richText} enableGutter={false} className="flex-3" />}
        </motion.div>

        {/* Action Links */}
        {links && links.length > 0 && (
          <motion.div
            className="flex gap-4 flex-2 justify-start  md:justify-end"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 4 * 0.1,
              ease: 'easeOut',
            }}
            viewport={{ once: true, margin: '-100px' }}
          >
            {links.map(({ link }, i) => {
              const href = getHref({ ...link })
              if (!href) return null

              return (
                <Link key={i} href={href}>
                  <Button
                    variant={link.appearance === 'primaryOutline' ? 'primaryOutline' : 'default'}
                    className="min-w-40 px-6 py-3 relative z-10"
                  >
                    {link.label}
                  </Button>
                </Link>
              )
            })}
          </motion.div>
        )}
      </div>
    </div>
  )
}
