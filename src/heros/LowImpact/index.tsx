'use client'
import React from 'react'

import type { Page } from '@/payload-types'

import RichText from '@/components/RichText'
import { GridPattern } from '@/components/magicui/grid-pattern'
import { cn } from '@/utilities/ui'
import { motion } from 'framer-motion'
import { BoxReveal } from '@/components/magicui/box-reveal'

type LowImpactHeroType =
  | {
      children?: React.ReactNode
      richText?: never
    }
  | (Omit<Page['hero'], 'richText'> & {
      children?: never
      richText?: Page['hero']['richText']
    })

export const LowImpactHero: React.FC<LowImpactHeroType> = ({ children, richText }) => {
  return (
    <div className="bg-secondary relative text-white py-5 -mt-[6.4rem] lg:mb-50">
      <div className="container relative z-10 pt-45">
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
          <BoxReveal boxColor="hsl(var(--primary))">
            <div>{children || (richText && <RichText data={richText} enableGutter={false} />)}</div>
          </BoxReveal>
        </motion.div>
      </div>

      <GridPattern
        width={70}
        height={70}
        x={-1}
        y={-1}
        className={cn(
          '[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)] absolute top-0 left-0 z-5',
        )}
      />

      <div className="hidden lg:block absolute top-0 left-0 z-2 bg-secondary h-[500px] w-[80%]"></div>
    </div>
  )
}
