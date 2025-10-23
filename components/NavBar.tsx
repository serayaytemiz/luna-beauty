"use client"
import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'

const LINKS = [
  { href: '#hizmetler', label: 'Hizmetler' },
  { href: '#randevu', label: 'Randevu' },
  { href: '#hakkimizda', label: 'Hakkımızda' },
  { href: '#iletisim', label: 'İletişim' },
]

export default function NavBar() {
  const [active, setActive] = useState<string>('')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const ids = useMemo(() => LINKS.map((l) => l.href.replace('#', '')), [])

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el)

    if (!elements.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { root: null, rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.1, 0.25, 0.5, 1] }
    )
    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [ids])

  return (
    <nav className={`sticky top-0 z-50 w-full transition-all ${
      scrolled ? 'backdrop-blur supports-blur bg-white/60 border-b border-white/40 shadow-sm' : 'bg-transparent'
    }`}>
      <div className="container-max flex items-center justify-between py-3">
        <Link href="/" className="flex items-center gap-2">
          <img src="/logo.png" alt="Luna Beauty Center" className="h-8 w-auto" />
        </Link>
        <div className="hidden gap-1 sm:flex">
          {LINKS.map((l) => {
            const id = l.href.replace('#', '')
            const isActive = active === id
            return (
              <a key={l.href} href={l.href} className={`nav-link ${isActive ? 'active' : ''}`}>
                {l.label}
              </a>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
