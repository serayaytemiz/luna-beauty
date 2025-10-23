"use client"
import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { services } from '@/lib/data'
import type { BookingInput } from '@/lib/types'
import { formatDate, generateSlots, isPast } from '@/lib/slots'

type Props = { preselectedServiceId?: string }

export default function BookingFlow({ preselectedServiceId }: Props) {
  const router = useRouter()
  // step = 1: service, 2: date/time, 3: info
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
  }, [date])

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
    <div className="card">
      <Stepper step={step} />
      {selectedService && (
        <div className="mb-4 flex items-center justify-between rounded-lg bg-brand-50 px-3 py-2 text-sm">
          <span className="font-medium text-brand-700">Seçili: {selectedService.name}</span>
          <span className="font-medium text-brand-700">{selectedService.price ? `${selectedService.price.toLocaleString('tr-TR')} TL` : '—'}</span>
        </div>
      )}

      {step === 1 && (
        <div>
          <h3 className="font-semibold text-gray-900">1. Hizmet Seçimi</h3>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {services.filter(s=>s.active).map((s) => (
              <label key={s.id} className={`flex cursor-pointer items-start gap-3 rounded-lg border p-3 transition hover:border-brand-300 ${serviceId === s.id ? 'border-brand-500 ring-2 ring-brand-200' : 'border-gray-200'}`}>
                <input
                  type="radio"
                  name="service"
                  className="mt-1"
                  checked={serviceId === s.id}
                  onChange={() => setServiceId(s.id)}
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-900">{s.name}</span>
                    <span className="text-brand-700 font-medium">{s.price ? `${s.price.toLocaleString('tr-TR')} TL` : '—'}</span>
                  </div>
                  {s.description && (
                    <p className="mt-1 text-sm text-gray-600">{s.description}</p>
                  )}
                </div>
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
          <h3 className="font-semibold text-gray-900">2. Tarih/Saat</h3>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="sm:col-span-1">
              <label className="block text-sm font-medium text-gray-700">Tarih</label>
              <input
                type="date"
                min={today}
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:border-brand-400 focus:ring-brand-400"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Uygun Saatler</label>
              <div className="mt-1 grid grid-cols-3 gap-2 sm:grid-cols-4">
                {slots.map((s) => (
                  <button
                    key={s.time}
                    onClick={() => !s.disabled && setTime(s.time)}
                    disabled={s.disabled}
                    className={`rounded-md border px-2 py-2 text-sm ${time === s.time ? 'border-brand-500 bg-brand-50 text-brand-700' : 'border-gray-200 hover:border-brand-300'} ${s.disabled ? 'opacity-40 cursor-not-allowed' : ''}`}
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
          <h3 className="font-semibold text-gray-900">3. Bilgiler</h3>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Ad Soyad<span className="text-red-500">*</span></label>
              <input value={name} onChange={(e)=>setName(e.target.value)} placeholder="Adınız Soyadınız" className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:border-brand-400 focus:ring-brand-400" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Telefon<span className="text-red-500">*</span></label>
              <input value={phone} onChange={(e)=>setPhone(e.target.value)} placeholder="05XXXXXXXXX" inputMode="tel" className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:border-brand-400 focus:ring-brand-400" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">E-posta (opsiyonel)</label>
              <input value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="ornek@mail.com" type="email" className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:border-brand-400 focus:ring-brand-400" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Not (opsiyonel)</label>
              <textarea value={note} onChange={(e)=>setNote(e.target.value)} rows={3} className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:border-brand-400 focus:ring-brand-400" />
            </div>
            <label className="sm:col-span-2 flex items-start gap-3">
              <input type="checkbox" checked={kvkk} onChange={(e)=>setKvkk(e.target.checked)} className="mt-1" />
              <span className="text-sm text-gray-700">KVKK metnini okudum ve onaylıyorum.</span>
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

function Stepper({ step }: { step: number }) {
  return (
    <div className="mb-6 flex items-center gap-2 text-sm text-gray-600">
      <Step n={1} label="Hizmet" active={step === 1} done={step > 1} />
      <span className="opacity-50">›</span>
      <Step n={2} label="Tarih/Saat" active={step === 2} done={step > 2} />
      <span className="opacity-50">›</span>
      <Step n={3} label="Bilgiler" active={step === 3} done={false} />
    </div>
  )
}

function Step({ n, label, active, done }: { n: number; label: string; active: boolean; done: boolean }) {
  return (
    <div className={`flex items-center gap-2 ${active ? 'text-brand-700' : ''}`}>
      <div className={`h-6 w-6 rounded-full text-center text-xs leading-6 ${done ? 'bg-brand-500 text-white' : active ? 'border border-brand-500 text-brand-700' : 'border border-gray-300 text-gray-600'}`}>{done ? '✓' : n}</div>
      <span>{label}</span>
    </div>
  )
}

