'use client'

import React from 'react'
import type { Header as HeaderType } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { cn } from '@/utilities/ui'

export const HeaderNav: React.FC<{
  data: HeaderType
  onHover: (item: string | null) => void
  hoveredItem: string | null
}> = ({ data, onHover, hoveredItem }) => {
  const navItems = data?.navItems || []

  return (
    <nav className=" gap-8 items-center hidden md:flex">
      {navItems.map((navItem, i) => {
        const hasSubmenus = navItem?.submenus && navItem.submenus.length > 0

        return (
          <div
            key={i}
            className="relative flex items-center"
            onMouseEnter={() => {
              onHover(hasSubmenus ? navItem?.id || null : null)
            }}
          >
            <CMSLink
              {...navItem.link}
              className={cn(
                `font-normal group transition-colors text-white duration-300 tracking-[0.15em] font-work-sans text-[13px]`,
                {
                  'underline-static': hoveredItem == navItem?.id,
                },
              )}
              appearance="link"
              hasSubmenu={hasSubmenus || false}
            />
          </div>
        )
      })}
    </nav>
  )
}
