import { Button, type ButtonProps } from '@/components/ui/button'
import { cn } from '@/utilities/ui'
import { getHref } from '@/utilities/getHref'
import Link from 'next/link'
import React from 'react'
import { ChevronDown } from 'lucide-react'

import type { Page, Post } from '@/payload-types'

type CMSLinkType = {
  appearance?: 'inline' | ButtonProps['variant']
  children?: React.ReactNode
  className?: string
  label?: string | null
  newTab?: boolean | null
  reference?: {
    relationTo: 'pages' | 'posts'
    value: Page | Post | string | number
  } | null
  size?: ButtonProps['size'] | null
  type?: 'custom' | 'reference' | null
  url?: string | null
  hasSubmenu?: boolean
}

export const CMSLink: React.FC<CMSLinkType> = (props) => {
  const {
    type,
    appearance = 'inline',
    children,
    className,
    label,
    newTab,
    reference,
    size: sizeFromProps,
    url,
    hasSubmenu,
  } = props

  const href = getHref({ type, reference, url })

  if (!href) return null

  const size = appearance === 'link' ? 'clear' : sizeFromProps
  const newTabProps = newTab ? { rel: 'noopener noreferrer', target: '_blank' } : {}

  // Custom underline effect for nav links
  const underlineEffect = appearance === 'link' ? 'underline-hover' : ''

  /* Ensure we don't break any styles set by richText */
  if (appearance === 'inline') {
    return (
      <Link className={cn(className, underlineEffect)} href={href || url || ''} {...newTabProps}>
        {label && label}
        {children && children}
      </Link>
    )
  }

  return (
    <div className={className}>
      <Link
        className={cn('flex items-center', className, underlineEffect)}
        href={href || url || ''}
        {...newTabProps}
      >
        {label && label}
        {children && children}

        {hasSubmenu && (
          <ChevronDown className="ml-1 w-4 h-4 text-white transition-transform duration-300 group-hover:rotate-180 group-[.underline-static]:rotate-180" />
        )}
      </Link>
    </div>
  )
}
