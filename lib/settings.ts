export const business = {
  name: process.env.NEXT_PUBLIC_BUSINESS_NAME ?? 'Luna Beauty Center',
  phone: process.env.NEXT_PUBLIC_BUSINESS_PHONE ?? '+905551112233',
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '+905551112233',
  email: process.env.NEXT_PUBLIC_BUSINESS_EMAIL ?? 'info@lunabeauty.example',
  address: process.env.NEXT_PUBLIC_BUSINESS_ADDRESS ?? 'Bağdat Cad. No: 10, Kadıköy, İstanbul',
  mapEmbedUrl:
    process.env.NEXT_PUBLIC_MAP_EMBED_URL ??
    'https://www.openstreetmap.org/export/embed.html?bbox=28.95%2C41.01%2C29.05%2C41.06&layer=mapnik',
  baseUrl:
    process.env.NEXT_PUBLIC_BASE_URL ??
    (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000'),
}

