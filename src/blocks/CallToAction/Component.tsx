import React from 'react'

import type { CallToActionBlock as CTABlockProps } from '@/payload-types'

import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { getHref } from '@/utilities/getHref'

export const CallToActionBlock: React.FC<CTABlockProps> = ({ links, richText }) => {
  return (
    <div className="bg-gradient-to-t from-primary/20 to-white mt-16">
      <div className="max-w-4xl flex flex-col md:flex-row gap-4 justify-between container items-center border-t py-20 border-t-gray-200/60">
        {/* Rich Text Content */}
        {richText && <RichText data={richText} enableGutter={false} className="flex-3" />}

        {/* Action Links */}
        {links && links.length > 0 && (
          <div className="flex gap-4 flex-2 justify-start  md:justify-end">
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
          </div>
        )}
      </div>
    </div>
  )
}
