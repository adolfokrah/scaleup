import { Button } from '@/components/ui/button'
import { CMSLink } from '@/components/Link'
import type { Header as HeaderType } from '@/payload-types'
import { getHref } from '@/utilities/getHref'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function MobileNav({ data, onClose }: { data: HeaderType; onClose: () => void }) {
  const navItems = data?.navItems || []
  const [activeSubmenu, setActiveSubmenu] = useState<number | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)
  const [showSubmenuItems, setShowSubmenuItems] = useState(false)
  const [showMainItems, setShowMainItems] = useState(false)

  // Trigger main menu animation on mount
  useEffect(() => {
    const timer = setTimeout(() => setShowMainItems(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const handleSubmenuClick = (e: React.MouseEvent, index: number) => {
    e.preventDefault()
    setIsAnimating(true)
    setShowSubmenuItems(false)
    setTimeout(() => {
      setActiveSubmenu(index)
      setIsAnimating(false)
      // Start showing submenu items after slide animation completes
      setTimeout(() => setShowSubmenuItems(true), 50)
    }, 150)
  }

  const handleBackClick = () => {
    setShowSubmenuItems(false)
    setIsAnimating(true)
    setTimeout(() => {
      setActiveSubmenu(null)
      setIsAnimating(false)
      // Re-trigger main menu animation when returning
      setTimeout(() => setShowMainItems(true), 50)
    }, 200) // Slightly longer to allow items to fade out
  }

  const currentMenu = activeSubmenu !== null ? navItems[activeSubmenu] : null

  return (
    <div className="block md:hidden h-screen container text-white flex flex-col border-t border-white/20 pt-10 relative overflow-hidden">
      {/* Main Menu */}
      <div
        className={`flex flex-col gap-6 transition-transform duration-300 ease-in-out ${
          activeSubmenu !== null ? '-translate-x-full opacity-0' : 'translate-x-0 opacity-100'
        } ${isAnimating ? 'pointer-events-none' : ''}`}
      >
        {navItems.map((navItem, index) => {
          const hasSubmenus = navItem?.submenus && navItem.submenus.length > 0
          const href = getHref({ ...navItem.link })

          if (!href) return null

          if (hasSubmenus) {
            return (
              <div
                key={index}
                className={`transition-all duration-500 transform ${
                  showMainItems ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
                }`}
                style={{
                  transitionDelay: showMainItems ? `${index * 100}ms` : '0ms',
                }}
              >
                <button
                  onClick={(e) => handleSubmenuClick(e, index)}
                  className="font-tiempos text-2xl hover:opacity-[0.3] transition-opacity duration-300 flex justify-between items-center group w-full text-left"
                >
                  {navItem.link.label}
                  <ArrowRight className="w-6 h-6 text-white/60" />
                </button>
              </div>
            )
          }

          return (
            <div
              key={index}
              className={`transition-all duration-500 transform ${
                showMainItems ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
              }`}
              style={{
                transitionDelay: showMainItems ? `${index * 100}ms` : '0ms',
              }}
            >
              <Link
                className="font-tiempos text-2xl hover:opacity-[0.3] transition-opacity duration-300 flex justify-between items-center group"
                href={href}
                onClick={onClose}
              >
                {navItem.link.label}
              </Link>
            </div>
          )
        })}
        <div
          className={`transition-all duration-500 transform w-full ${
            showMainItems ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
          }`}
          style={{
            transitionDelay: showMainItems ? `${navItems.length * 100}ms` : '0ms',
          }}
        >
          {data?.supportButton && getHref({ ...data.supportButton.link }) && (
            <Link href={getHref({ ...data.supportButton.link })!} onClick={onClose}>
              <Button className="w-full">{data.supportButton.label || 'Support us'}</Button>
            </Link>
          )}
        </div>
      </div>

      {/* Submenu */}
      <div
        className={`absolute inset-0 pt-10 flex flex-col container gap-6 transition-transform duration-300 ease-in-out ${
          activeSubmenu !== null ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
        } ${isAnimating ? 'pointer-events-none' : ''}`}
      >
        {currentMenu && (
          <>
            {/* Back Button */}
            <button
              onClick={handleBackClick}
              className="flex items-center gap-3 font-tiempos text-2xl hover:opacity-[0.3] transition-opacity duration-300 mb-4"
            >
              <ArrowLeft className="w-6 h-6" />
              {currentMenu.link.label}
            </button>

            {/* Submenu Items */}
            <div className="flex flex-col gap-6">
              {currentMenu.submenus?.map((submenu, subIndex) => {
                const subHref = getHref({ ...submenu.link })
                if (!subHref) return null

                return (
                  <Link
                    key={subIndex}
                    href={subHref}
                    onClick={onClose}
                    className={`font-work-sans cursor-pointer text-md hover:opacity-[0.3] transition-all duration-500 transform ${
                      showSubmenuItems ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
                    }`}
                    style={{
                      transitionDelay: showSubmenuItems
                        ? `${subIndex * 100}ms`
                        : `${(currentMenu.submenus!.length - subIndex - 1) * 80}ms`,
                    }}
                  >
                    {submenu.link.label}
                  </Link>
                )
              })}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
