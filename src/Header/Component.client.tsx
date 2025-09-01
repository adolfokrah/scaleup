'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'
import { CMSLink } from '@/components/Link'
import { Button } from '@/components/ui/button'
import { getHref } from '@/utilities/getHref'
import MobileNav from './MobileNav'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const menu = data?.navItems?.find((item) => item.id === hoveredItem) || null

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-20 py-5 transition-colors duration-300 ${
        isScrolled || hoveredItem || isMobileMenuOpen ? 'bg-secondary' : 'bg-transparent'
      }`}
      {...(theme ? { 'data-theme': theme } : {})}
      onMouseLeave={() => setHoveredItem(null)}
    >
      <div className="flex justify-between container items-center">
        <div className="py-4 flex gap-4  items-center gap-5">
          <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
            <Logo loading="eager" priority="high" />
          </Link>
          <HeaderNav data={data} onHover={setHoveredItem} hoveredItem={hoveredItem} />
        </div>
        {data?.supportButton && getHref({ ...data.supportButton.link }) && (
          <Link
            href={getHref({ ...data.supportButton.link })!}
            onClick={() => setHoveredItem(null)}
            className="hidden md:block"
          >
            <Button>{data.supportButton.label || 'Support us'}</Button>
          </Link>
        )}
        <Button
          variant={'outline'}
          className="block md:hidden relative bg-white h-10 w-10 p-0 grid items-center text-black rounded-full"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <div className="relative w-5 h-5 flex flex-col justify-center items-center">
            {/* Top bar */}
            <span
              className={`block w-5 h-0.5 bg-current transform transition-all duration-300 ease-in-out absolute ${
                isMobileMenuOpen ? 'rotate-45' : 'rotate-0 -translate-y-1'
              }`}
            />
            {/* Middle bar */}
            <span
              className={`block w-5 h-0.5 bg-current transform transition-all duration-300 ease-in-out absolute ${
                isMobileMenuOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
              }`}
            />
            {/* Bottom bar */}
            <span
              className={`block w-5 h-0.5 bg-current transform transition-all duration-300 ease-in-out absolute ${
                isMobileMenuOpen ? '-rotate-45' : 'rotate-0 translate-y-1'
              }`}
            />
          </div>
        </Button>
      </div>
      {hoveredItem && menu && getHref({ ...menu.link }) && (
        <div className="py-4 text-white gap-5 hidden md:block">
          <div className="container grid grid-cols-3 gap-5">
            <div className="flex flex-col gap-10">
              <Link
                href={getHref({ ...menu.link })!}
                className="font-tiempos text-3xl font-thin hover:opacity-[.5] transition-opacity duration-300"
              >
                {menu.menuTitle}
              </Link>
              <p className="font-work-sans text-sm font-light">{menu?.menuSubtitle}</p>
              <div>
                <CMSLink
                  {...menu.link}
                  className="font-work-sans text-sm text-white inline-block"
                  label={'Learn More →'}
                  appearance="link"
                />
              </div>
            </div>
            <div className="flex flex-col gap-3">
              {menu?.submenus?.slice(0, 3).map((submenu, i) =>
                getHref({ ...submenu.link }) ? (
                  <Link
                    key={i}
                    href={getHref({ ...submenu.link })!}
                    className="text-lg font-thin hover:opacity-[.5] transition-opacity duration-300"
                  >
                    {submenu.link?.label}
                  </Link>
                ) : null,
              )}
            </div>
            <div className="flex flex-col gap-3">
              {menu?.submenus?.slice(3, 6).map((submenu, i) =>
                getHref({ ...submenu.link }) ? (
                  <Link
                    key={i}
                    href={getHref({ ...submenu.link })!}
                    className="text-lg font-thin hover:opacity-[.5] transition-opacity duration-300"
                  >
                    {submenu.link?.label}
                  </Link>
                ) : null,
              )}
            </div>
          </div>
        </div>
      )}
      {isMobileMenuOpen && <MobileNav data={data} onClose={() => setIsMobileMenuOpen(false)} />}
    </header>
  )
}
