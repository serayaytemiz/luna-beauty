"use client"
import { PropsWithChildren, useEffect, useRef, useState } from 'react'

type Props = PropsWithChildren<{
  as?: keyof JSX.IntrinsicElements
  variant?: 'fade-up' | 'fade-in' | 'slide-in'
  delay?: number
  className?: string
}>

export default function Reveal({ as = 'div', variant = 'fade-up', delay = 0, className = '', children }: Props) {
  const Comp: any = as
  const ref = useRef<any>(null)
  const [show, setShow] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setTimeout(() => setShow(true), delay)
        })
      },
      { threshold: 0.1 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [delay])

  return (
    <Comp ref={ref} className={`reveal ${variant} ${show ? 'show' : ''} ${className}`}>{children}</Comp>
  )
}
