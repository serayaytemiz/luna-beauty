"use client"
import { business } from '@/lib/settings'

type Props = {
  ok: boolean
  s?: string
  d?: string
  t?: string
  n?: string
  p?: string
  e?: string
  no?: string
}

export default function ConfirmClient({ ok, s, d, t, n, p, e, no }: Props) {
  if (!ok) {
    return (
      <main className="container-max py-16">
        <div className="card">
          <h1 className="text-xl font-semibold text-gray-900">Eksik bilgi</h1>
          <p className="mt-2 text-gray-600">Randevu özeti için gerekli bilgiler sağlanamadı.</p>
        </div>
      </main>
    )
  }

  const title = `${s} – Randevu`
  const start = `${d} ${t}` // local time
  const end = computeEnd(d!, t!, 60) // default +60dk (not exact per service here)
  const details = `Ad: ${n}\nTelefon: ${p}${e ? `\nE-posta: ${e}` : ''}${no ? `\nNot: ${no}` : ''}`

  const icsContent = makeICS({
    title,
    description: details,
    startLocal: start,
    endLocal: end,
    location: business.address,
  })

  const waText = `Merhaba, ${d} ${t} için '${s}' randevumu teyit etmek istiyorum.\nAd: ${n}\nTel: ${p}`
  const waUrl = `https://wa.me/${business.whatsapp.replace(/[^\d]/g,'')}?text=${encodeURIComponent(waText)}`

  function downloadICS() {
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'randevu.ics'
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  }

  return (
    <main className="container-max py-16">
      <div className="card">
        <h1 className="text-xl font-semibold text-gray-900">Randevunuz Alındı</h1>
        <p className="mt-2 text-gray-600">Aşağıda özet bilgileri görebilirsiniz.</p>

        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Info label="Hizmet" value={s!} />
          <Info label="Tarih" value={d!} />
          <Info label="Saat" value={t!} />
          <Info label="Ad Soyad" value={n!} />
          <Info label="Telefon" value={p!} />
          {e && <Info label="E-posta" value={e} />}
          {no && <div className="sm:col-span-2"><Info label="Not" value={no} /></div>}
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <button onClick={downloadICS} className="btn btn-primary">.ics indir</button>
          <a href={waUrl} target="_blank" className="btn btn-ghost">WhatsApp ile teyit et</a>
        </div>
      </div>
    </main>
  )
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-gray-200 p-3">
      <div className="text-xs uppercase tracking-wide text-gray-500">{label}</div>
      <div className="mt-1 text-gray-900">{value}</div>
    </div>
  )
}

function computeEnd(date: string, time: string, addMin: number) {
  const [y, m, d] = date.split('-').map(Number)
  const [hh, mm] = time.split(':').map(Number)
  const start = new Date(y, (m as number) - 1, d, hh, mm)
  const end = new Date(start.getTime() + addMin * 60000)
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${end.getFullYear()}-${pad(end.getMonth() + 1)}-${pad(end.getDate())} ${pad(end.getHours())}:${pad(end.getMinutes())}`
}

function makeICS({ title, description, startLocal, endLocal, location }: { title: string; description: string; startLocal: string; endLocal: string; location: string }) {
  const dtStart = toICSDate(startLocal)
  const dtEnd = toICSDate(endLocal)
  const uid = `${Date.now()}@lunabeauty.local`
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Luna Beauty Center//Randevu//TR',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${toICSDate(new Date().toISOString().slice(0,16).replace('T',' '))}`,
    `DTSTART:${dtStart}`,
    `DTEND:${dtEnd}`,
    `SUMMARY:${escapeICS(title)}`,
    `DESCRIPTION:${escapeICS(description)}`,
    `LOCATION:${escapeICS(location)}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ]
  return lines.join('\r\n')
}

function toICSDate(local: string) {
  // local = YYYY-MM-DD HH:mm (local time); format to floating time (no TZ)
  const [d, t] = local.split(' ')
  const [Y, M, D] = d.split('-')
  const [h, m] = t.split(':')
  return `${Y}${M}${D}T${h}${m}00`
}

function escapeICS(s: string) {
  return s.replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/,|;/g, (c) => `\\${c}`)
}

