export default function Loading() {
  return (
    <main className="container-max py-16">
      <div className="animate-pulse space-y-4">
        <div className="h-6 w-1/3 rounded bg-gray-200" />
        <div className="h-4 w-2/3 rounded bg-gray-200" />
        <div className="h-4 w-1/2 rounded bg-gray-200" />
        <div className="h-40 w-full rounded bg-gray-200" />
      </div>
    </main>
  )
}

