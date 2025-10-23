"use client"
import { business } from '@/lib/settings'

export default function FixedCtas() {
  const wa = `https://wa.me/${business.whatsapp.replace(/[^\d]/g, '')}?text=${encodeURIComponent('Merhaba, randevu almak istiyorum.')}`
  return (
    <div className="fixed inset-x-0 bottom-3 z-50 mx-auto flex w-full max-w-md items-center justify-center gap-3 px-3 sm:hidden">
      <a href={`tel:${business.phone}`} className="flex-1 btn btn-ghost">Ara</a>
      <a href={wa} target="_blank" className="flex-1 btn btn-primary">WhatsApp</a>
    </div>
  )
}

