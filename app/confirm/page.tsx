import ConfirmClient from './ui'

export default function ConfirmPage({ searchParams }: { searchParams: Record<string, string | string[] | undefined> }) {
  const s = typeof searchParams.s === 'string' ? searchParams.s : undefined
  const d = typeof searchParams.d === 'string' ? searchParams.d : undefined
  const t = typeof searchParams.t === 'string' ? searchParams.t : undefined
  const n = typeof searchParams.n === 'string' ? searchParams.n : undefined
  const p = typeof searchParams.p === 'string' ? searchParams.p : undefined
  const e = typeof searchParams.e === 'string' ? searchParams.e : undefined
  const no = typeof searchParams.no === 'string' ? searchParams.no : undefined

  const ok = s && d && t && n && p
  return <ConfirmClient ok={!!ok} s={s} d={d} t={t} n={n} p={p} e={e} no={no} />
}

