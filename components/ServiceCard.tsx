"use client"
import Link from 'next/link'
import type { Service } from '@/lib/types'

export default function ServiceCard({ service }: { service: Service }) {
  const href = { pathname: '/', query: { service: service.slug }, hash: 'randevu' as const }
  return (
    <div className="card flex flex-col justify-between transition-shadow hover:shadow-soft">
      <div>
        <div className="aspect-video w-full overflow-hidden rounded-lg bg-gray-100">
          <img
            src={`/services/${service.slug}.jpg`}
            alt={service.name}
            className="h-full w-full object-cover"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = '/service-placeholder.svg'
            }}
          />
        </div>
        <h3
          className="mt-3 text-lg font-semibold text-gray-900"
          style={{ fontFamily: 'var(--font-display), serif' }}
        >
          {service.name}
        </h3>
        {service.description && (
          <p className="mt-1 text-gray-600">{service.description}</p>
        )}
      </div>
      <div className="mt-4 flex items-center justify-end">
        <Link href={href} className="btn btn-primary">Randevu Al</Link>
      </div>
    </div>
  )
}

