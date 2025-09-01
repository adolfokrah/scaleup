'use client'
import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'
import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'

import type { ContentBlock as ContentBlockProps } from '@/payload-types'

import Link from 'next/link'
import { getHref } from '@/utilities/getHref'

export const ContentBlock: React.FC<ContentBlockProps> = (props) => {
  const { columns, backgroundColor, textColor } = props

  const colsSpanClasses = {
    full: '12',
    half: '6',
    oneThird: '4',
    twoThirds: '8',
  }

  const containerStyles = {
    backgroundColor: backgroundColor || undefined,
  }

  const headingStyles = textColor
    ? ({
        '--heading-color': textColor,
      } as React.CSSProperties)
    : undefined

  return (
    <div style={containerStyles} className="my-16">
      <div className="container">
        <div className="grid grid-cols-4 lg:grid-cols-12 gap-y-8 gap-x-16 py-10 lg:py-40">
          {columns &&
            columns.length > 0 &&
            columns.map((col, index) => {
              const { enableLink, link, richText, size } = col

              return (
                <motion.div
                  className={cn(`col-span-4 lg:col-span-${colsSpanClasses[size!]}`, {
                    'md:col-span-2': size !== 'full',
                  })}
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.1,
                    ease: 'easeOut',
                  }}
                  viewport={{ once: true, margin: '-100px' }}
                >
                  {richText && (
                    <div style={headingStyles}>
                      <RichText
                        data={richText}
                        enableGutter={false}
                        className={cn('prose dark:prose-invert', {
                          '[&_h2]:text-[var(--heading-color)] [&_h3]:text-[var(--heading-color)]':
                            textColor,
                        })}
                      />
                    </div>
                  )}

                  {enableLink && (
                    <Link
                      className="text-primary font-work-sans flex gap-4 items-center underline-hover w-fit after:!bg-primary/40 after:h-0.5 z-10"
                      href={getHref({ ...link })!}
                    >
                      {link?.label}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  )}
                </motion.div>
              )
            })}
        </div>
      </div>
    </div>
  )
}
