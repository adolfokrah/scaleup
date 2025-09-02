'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'
import { motion } from 'framer-motion'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import Link from 'next/link'
import { getHref } from '@/utilities/getHref'
import { Button } from '@/components/ui/button'

export const HighImpactHero: React.FC<Page['hero']> = ({ links, media, richText }) => {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('dark')
  })

  return (
    <div
      className="relative -mt-[6.4rem] flex items-center justify-center text-white"
      data-theme="dark"
    >
      <div className="container mb-8 z-10 relative  items-center justify-center">
        <div className="min-w-[90%]">
          {richText && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <RichText
                className="mb-6
                      mx-auto prose"
                data={richText}
                enableGutter={false}
              />
            </motion.div>
          )}
          <div className="mt-20">
            {Array.isArray(links) && links.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut', delay: 0.4 }}
              >
                <ul className="flex flex-col md:flex-row md:items-center gap-4">
                  {links.map(({ link }, i) => {
                    const href = getHref({ ...link })
                    if (!href) return null

                    return (
                      <li key={i}>
                        <Link href={href}>
                          <Button variant={link.appearance}>{link.label.toUpperCase()}</Button>
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </motion.div>
            )}
          </div>
        </div>
      </div>
      <div className="w-full h-full bg-black/40 absolute left-0 top-0">fdfs</div>

      <div className=" min-h-[800px]  2xl:min-h-[1200px] select-none">
        {media && typeof media === 'object' && (
          <Media fill imgClassName="-z-10 object-cover" priority resource={media} />
        )}
      </div>
    </div>
  )
}
