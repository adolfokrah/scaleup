import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'
import { Facebook, Linkedin } from 'lucide-react'

import type { Footer } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { getHref } from '@/utilities/getHref'
import RichText from '@/components/RichText'

export async function Footer() {
  const footer: Footer = await getCachedGlobal('footer', 1)()
  const currentYear = new Date().getFullYear()

  const firstColumn = footer?.firstColumn?.navItems || []
  const secondColumn = footer?.secondColumn || {}
  const address = footer?.address || ''
  const socialMedia = footer?.socialMedia || {}

  return (
    <footer className="mt-auto bg-secondary text-white py-20">
      <div className="container py-8 gap-20 lg:gap-8 grid grid-cols-1 lg:grid-cols-3">
        <nav className="flex flex-col gap-6">
          {firstColumn.map(({ link }, i) => {
            const href = getHref({ ...link })
            if (!href) return null

            return (
              <Link
                key={i}
                className="font-tiempos text-3xl font-bold hover:opacity-[0.3] transition-opacity duration-300 flex justify-between items-center group"
                href={href}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>
        <div>
          <h3 className="font-tiempos text-3xl font-bold">{secondColumn.title}</h3>
          <nav className="flex flex-col gap-3 mt-4">
            {secondColumn.navItems?.map(({ link }, i) => {
              const href = getHref({ ...link })
              if (!href) return null

              return (
                <div key={i} className="w-content">
                  <Link
                    className="font-work-sans underline-hover relative z-10 text-[13px]"
                    href={href}
                  >
                    {link.label}
                  </Link>
                </div>
              )
            })}
          </nav>
        </div>

        <div>
          <Link className="flex items-center" href="/">
            <Logo />
          </Link>
          {address && (
            <div className="mt-6">
              <RichText
                data={address}
                enableGutter={false}
                className="prose prose-sm prose-invert"
              />
            </div>
          )}
        </div>
      </div>
      <div className="text-center container font-work-sans text-[13px] pt-20">
        {footer.copyrightText && (
          <span className="inline-flex items-center gap-1">
            ©{currentYear}{' '}
            <span className="inline">
              <RichText
                data={footer.copyrightText}
                enableGutter={false}
                className="inline [&>*]:inline [&>p]:inline [&>*]:m-0"
              />
            </span>
          </span>
        )}
      </div>

      <div className="flex justify-center items-center gap-4 container pt-8">
        {socialMedia.facebookUrl && (
          <Link
            href={socialMedia.facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 bg-white text-secondary rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors hover:text-primary"
          >
            <Facebook size={20} />
          </Link>
        )}

        {socialMedia.linkedinUrl && (
          <Link
            href={socialMedia.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 bg-white text-secondary rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors hover:text-primary"
          >
            <Linkedin size={20} />
          </Link>
        )}
      </div>
    </footer>
  )
}
