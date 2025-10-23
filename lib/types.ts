export type Service = {
  id: string
  slug: string
  name: string
  durationMin: number
  price?: number
  active: boolean
  description?: string
}

export type BookingInput = {
  serviceId: string
  date: string // YYYY-MM-DD
  time: string // HH:mm
  name: string
  phone: string
  email?: string
  note?: string
}

