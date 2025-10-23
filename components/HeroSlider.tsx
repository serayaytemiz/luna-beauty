"use client"
import { useEffect, useState } from 'react'

type Props = {
  images: string[]
  intervalMs?: number
}

export default function HeroSlider({ images, intervalMs = 3500 }: Props) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (!images?.length) return
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % images.length)
    }, intervalMs)
    return () => clearInterval(id)
  }, [images, intervalMs])

  function prev() {
    setIndex((i) => (i - 1 + images.length) % images.length)
  }
  function next() {
    setIndex((i) => (i + 1) % images.length)
  }

  return (
    <div className="absolute inset-0">
      {images.map((src, i) => (
        <img
          key={src + i}
          src={src}
          alt="Hero background"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = '/hero-1.svg'
          }}
          className={`absolute inset-0 h-full w-full object-cover transition-all duration-1000 ease-in-out ${
            i === index ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
          }`}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/10" />

      <div className="pointer-events-none absolute inset-x-0 bottom-6 flex justify-center">
        <div className="pointer-events-auto flex items-center gap-3 rounded-full bg-black/35 px-3 py-2 backdrop-blur-sm">
          <button aria-label="Önceki" onClick={prev} className="group inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/80 text-gray-800 hover:bg-white">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
          <div className="flex items-center gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                aria-label={`Slayt ${i + 1}`}
                onClick={() => setIndex(i)}
                className={`h-2.5 rounded-full transition-all ${
                  i === index ? 'w-6 bg-white' : 'w-2.5 bg-white/60 hover:bg-white/80'
                }`}
              />
            ))}
          </div>
          <button aria-label="Sonraki" onClick={next} className="group inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/80 text-gray-800 hover:bg-white">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
        </div>
      </div>
    </div>
  )
}
