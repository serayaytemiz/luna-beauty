const pad = (n: number) => String(n).padStart(2, '0')

export function formatDate(d: Date) {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}

export function isPast(dateStr: string, timeStr?: string) {
  const now = new Date()
  const [y, m, d] = dateStr.split('-').map(Number)
  const [hh, mm] = (timeStr ?? '00:00').split(':').map(Number)
  const dt = new Date(y, (m as number) - 1, d, hh, mm)
  return dt.getTime() < now.getTime()
}

export function generateSlots(
  dateStr: string,
  {
    start = '10:00',
    end = '18:00',
    stepMin = 30,
  }: { start?: string; end?: string; stepMin?: number } = {}
) {
  const [sh, sm] = start.split(':').map(Number)
  const [eh, em] = end.split(':').map(Number)
  const startMin = sh * 60 + sm
  const endMin = eh * 60 + em
  const slots: { time: string; disabled: boolean }[] = []
  for (let m = startMin; m <= endMin - stepMin; m += stepMin) {
    const hh = Math.floor(m / 60)
    const mm = m % 60
    const time = `${pad(hh)}:${pad(mm)}`
    slots.push({ time, disabled: isPast(dateStr, time) })
  }
  return slots
}

