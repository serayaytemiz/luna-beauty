"use client"
import { useEffect, useMemo, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { services, findServiceBySlug } from '@/lib/data'
import type { BookingInput } from '@/lib/types'
import { formatDate, generateSlots, isPast } from '@/lib/slots'

export default function RandevuPage() {
  const search = useSearchParams()
  const fromSlug = search.get('service') ?? undefined
  const preselected = findServiceBySlug(fromSlug || undefined)?.id

  return (
    <main>
      <Hero />
      <section className="relative -mt-16 pb-16">
        <div className="container-max">
          <div className="mx-auto max-w-4xl rounded-2xl border border-emerald-100 bg-white/90 p-4 shadow-xl shadow-emerald-100/40 backdrop-blur sm:p-6">
            <OrganicBooking preselectedServiceId={preselected} />
          </div>
        </div>
      </section>
    </main>
  )
}

function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-br from-emerald-50 via-lime-50 to-white">
      <div className="absolute inset-0 opacity-60" aria-hidden>
        <svg className="absolute -left-24 top-12 h-56 w-56 text-emerald-100" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path fill="currentColor" d="M46.8,-64.8C59.2,-55.3,66.7,-39.9,71.7,-24.1C76.7,-8.3,79.3,8,74.3,21.1C69.3,34.3,56.7,44.4,43.2,53.2C29.6,62,14.8,69.5,-1.6,72C-18,74.4,-35.9,71.8,-50.9,63.5C-65.8,55.3,-77.9,41.4,-83.2,25.1C-88.5,8.7,-87,-10,-78.9,-23.9C-70.7,-37.8,-55.9,-46.8,-41.8,-56.1C-27.6,-65.3,-13.8,-74.8,2.1,-77.7C17.9,-80.6,35.8,-77,46.8,-64.8Z" transform="translate(100 100)" />
        </svg>
        <svg className="absolute -right-16 bottom-0 h-64 w-64 text-lime-100" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path fill="currentColor" d="M42.9,-56.1C55.1,-48.7,63,-35.8,66.7,-22.1C70.3,-8.5,69.7,6,64.8,19.2C59.9,32.4,50.7,44.3,38.9,53.1C27.1,61.8,13.6,67.5,-0.3,68C-14.3,68.6,-28.6,64.1,-41.1,56C-53.6,47.9,-64.4,36.2,-71.2,22.1C-78,8,-80.9,-8.3,-76.1,-22.5C-71.2,-36.8,-58.6,-48.9,-44.6,-56.8C-30.6,-64.7,-15.3,-68.4,-0.5,-67.5C14.3,-66.7,28.6,-61.5,42.9,-56.1Z" transform="translate(100 100)" />
        </svg>
      </div>
      <div className="container-max relative py-20 sm:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50/80 px-3 py-1 text-emerald-700">
            <span className="text-lg">🌿</span>
            <span className="text-sm font-medium">Organik ve Doğal Bakım</span>
          </div>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-emerald-900 sm:text-5xl">Randevunuzu Oluşturun</h1>
          <p className="mt-3 text-lg text-emerald-800/80">Doğal ve sade bir deneyimle, size en uygun zamanı seçin.</p>
        </div>
      </div>
    </section>
  )
}

function OrganicBooking({ preselectedServiceId }: { preselectedServiceId?: string }) {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [serviceId, setServiceId] = useState<string | undefined>(preselectedServiceId)
  const today = useMemo(() => formatDate(new Date()), [])
  const [date, setDate] = useState(today)
  const [time, setTime] = useState<string | undefined>()
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [note, setNote] = useState("")
  const [kvkk, setKvkk] = useState(false)

  useEffect(() => {
    if (preselectedServiceId) setServiceId(preselectedServiceId)
  }, [preselectedServiceId])

  const selectedService = useMemo(() => services.find((s) => s.id === serviceId), [serviceId])
  const slots = useMemo(() => generateSlots(date), [date])

  useEffect(() => {
    if (time && isPast(date, time)) setTime(undefined)
  }, [date, time])

  const canNextFromService = !!serviceId
  const canNextFromSchedule = !!time && !isPast(date, time)
  const canSubmitInfo = name.trim().length > 1 && phone.trim().length >= 10 && kvkk

  function goNext() {
    if (step === 1 && canNextFromService) setStep(2)
    if (step === 2 && canNextFromSchedule) setStep(3)
  }
  function goBack() {
    if (step > 1) setStep(step - 1)
  }

  function submit() {
    if (!selectedService || !time || !canSubmitInfo) return
    const payload: BookingInput = {
      serviceId: selectedService.id,
      date,
      time,
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim() || undefined,
      note: note.trim() || undefined,
    }
    const params = new URLSearchParams({
      s: selectedService.name,
      d: date,
      t: time,
      n: payload.name,
      p: payload.phone,
    })
    if (payload.email) params.set('e', payload.email)
    if (payload.note) params.set('no', payload.note)
    router.push(`/confirm?${params.toString()}`)
  }

  return (
    <div>
      <OrganicStepper step={step} />

      {selectedService && (
        <div className="mb-5 rounded-xl bg-emerald-50/80 p-3 ring-1 ring-inset ring-emerald-200">
          <div className="flex items-center justify-between text-emerald-900">
            <div className="font-medium">Seçili Hizmet: {selectedService.name}</div>
            <div className="font-semibold">{selectedService.price ? `${selectedService.price.toLocaleString('tr-TR')} TL` : '—'}</div>
          </div>
        </div>
      )}

      {step === 1 && (
        <div>
          <h3 className="font-semibold text-emerald-900">1. Hizmet Seçimi</h3>
          <p className="mt-1 text-sm text-emerald-800/80">İhtiyacınıza uygun doğal bakımınızı seçin.</p>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {services.filter((s) => s.active).map((s) => (
              <label
                key={s.id}
                className={`group relative flex cursor-pointer items-start gap-3 rounded-xl border p-3 transition ${
                  serviceId === s.id
                    ? 'border-emerald-500 bg-emerald-50 ring-2 ring-emerald-100'
                    : 'border-emerald-100 hover:border-emerald-300'
                }`}
              >
                <input
                  type="radio"
                  name="service"
                  className="mt-1"
                  checked={serviceId === s.id}
                  onChange={() => setServiceId(s.id)}
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-emerald-900">{s.name}</span>
                    <span className="font-semibold text-emerald-700">{s.price ? `${s.price.toLocaleString('tr-TR')} TL` : '—'}</span>
                  </div>
                  {s.description && (
                    <p className="mt-1 text-sm text-emerald-800/80">{s.description}</p>
                  )}
                </div>
                <span className="pointer-events-none absolute -right-1 -top-1 hidden rounded-full bg-emerald-500 px-2 py-0.5 text-xs text-white shadow-sm group-[.border-emerald-500]:block">
                  🌿 Seçildi
                </span>
              </label>
            ))}
          </div>
          <div className="mt-6 flex justify-end gap-3">
            <button className="btn btn-primary" disabled={!canNextFromService} onClick={goNext}>Devam</button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <h3 className="font-semibold text-emerald-900">2. Tarih ve Saat</h3>
          <p className="mt-1 text-sm text-emerald-800/80">Müsait olduğunuz zamanı seçin.</p>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="sm:col-span-1">
              <label className="block text-sm font-medium text-emerald-900">Tarih</label>
              <input
                type="date"
                min={today}
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="mt-1 w-full rounded-md border border-emerald-200 px-3 py-2 focus:border-emerald-400 focus:ring-emerald-400"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-emerald-900">Uygun Saatler</label>
              <div className="mt-1 grid grid-cols-3 gap-2 sm:grid-cols-4">
                {slots.map((s) => (
                  <button
                    key={s.time}
                    onClick={() => !s.disabled && setTime(s.time)}
                    disabled={s.disabled}
                    className={`rounded-md border px-2 py-2 text-sm transition ${
                      time === s.time
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-800'
                        : 'border-emerald-200 hover:border-emerald-400'
                    } ${s.disabled ? 'cursor-not-allowed opacity-40' : ''}`}
                  >
                    {s.time}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-6 flex justify-between gap-3">
            <button className="btn btn-ghost" onClick={goBack}>Geri</button>
            <button className="btn btn-primary" disabled={!canNextFromSchedule} onClick={goNext}>Devam</button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div>
          <h3 className="font-semibold text-emerald-900">3. Bilgiler</h3>
          <p className="mt-1 text-sm text-emerald-800/80">İletişim bilgilerinizi paylaşın.</p>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-emerald-900">Ad Soyad<span className="text-red-500">*</span></label>
              <input value={name} onChange={(e)=>setName(e.target.value)} placeholder="Adınız Soyadınız" className="mt-1 w-full rounded-md border border-emerald-200 px-3 py-2 focus:border-emerald-400 focus:ring-emerald-400" />
            </div>
            <div>
              <label className="block text-sm font-medium text-emerald-900">Telefon<span className="text-red-500">*</span></label>
              <input value={phone} onChange={(e)=>setPhone(e.target.value)} placeholder="05XXXXXXXXX" inputMode="tel" className="mt-1 w-full rounded-md border border-emerald-200 px-3 py-2 focus:border-emerald-400 focus:ring-emerald-400" />
            </div>
            <div>
              <label className="block text-sm font-medium text-emerald-900">E-posta (opsiyonel)</label>
              <input value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="ornek@mail.com" type="email" className="mt-1 w-full rounded-md border border-emerald-200 px-3 py-2 focus:border-emerald-400 focus:ring-emerald-400" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-emerald-900">Not (opsiyonel)</label>
              <textarea value={note} onChange={(e)=>setNote(e.target.value)} rows={3} className="mt-1 w-full rounded-md border border-emerald-200 px-3 py-2 focus:border-emerald-400 focus:ring-emerald-400" />
            </div>
            <label className="sm:col-span-2 flex items-start gap-3">
              <input type="checkbox" checked={kvkk} onChange={(e)=>setKvkk(e.target.checked)} className="mt-1" />
              <span className="text-sm text-emerald-900">KVKK metnini okudum ve onaylıyorum.</span>
            </label>
          </div>
          <div className="mt-6 flex justify-between gap-3">
            <button className="btn btn-ghost" onClick={goBack}>Geri</button>
            <button className="btn btn-primary" disabled={!canSubmitInfo} onClick={submit}>Randevuyu Onayla</button>
          </div>
        </div>
      )}
    </div>
  )
}

function OrganicStepper({ step }: { step: number }) {
  return (
    <div className="mb-6 flex items-center gap-3 text-sm text-emerald-800/80">
      <Step n={1} label="Hizmet" active={step === 1} done={step > 1} />
      <span className="opacity-60">—</span>
      <Step n={2} label="Tarih/Saat" active={step === 2} done={step > 2} />
      <span className="opacity-60">—</span>
      <Step n={3} label="Bilgiler" active={step === 3} done={false} />
    </div>
  )
}

function Step({ n, label, active, done }: { n: number; label: string; active: boolean; done: boolean }) {
  return (
    <div className={`flex items-center gap-2 ${active ? 'text-emerald-800' : ''}`}>
      <div className={`h-6 w-6 rounded-full text-center text-xs leading-6 ${done ? 'bg-emerald-500 text-white' : active ? 'border border-emerald-500 text-emerald-700' : 'border border-emerald-200 text-emerald-700'}`}>{done ? '✓' : n}</div>
      <span>{label}</span>
    </div>
  )
}
