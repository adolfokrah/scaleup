import React from 'react'

import type { Page } from '@/payload-types'

import RichText from '@/components/RichText'
import { GridPattern } from '@/components/magicui/grid-pattern'
import { cn } from '@/utilities/ui'

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
        {children || (richText && <RichText data={richText} enableGutter={false} />)}
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

      <div className="hidden md:block bg-secondary h-[500px] w-[80%] lg:absolute top-0 left-0 z-2">
        sdfsdfs
      </div>
    </div>
  )
}
