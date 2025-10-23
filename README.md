# Luna Beauty Center – Web Sitesi ve Randevu Akışı (Public)

Bu proje, tek işletmeye yönelik, mobil öncelikli 1 sayfalık web sitesi ve gömülü randevu akışını içerir. İlk fazda sadece müşteri tarafı (public) uygulanmıştır. Admin ve veritabanı bağlantıları sonraki adımlarda eklenecektir.

## Stack
- Next.js (App Router) + TypeScript
- Tailwind CSS
- (Sonraki faz) Prisma (SQLite)

## Özellikler (Public)
- Tek sayfa: Hero, Hizmetler, Randevu, Hakkımızda, İletişim/Harita
- Randevu akışı (3 adım): Hizmet seçimi → Tarih/Saat → Bilgi formu (KVKK onayı)
- Onay ekranı `/confirm`: Özet + `.ics indir` + `WhatsApp ile teyit et`
- Mobilde sabit `Ara` ve `WhatsApp` butonları
- Türkçe UI, erişilebilir formlar, odak stilleri
- Basit SEO meta + Open Graph

## Kurulum
1. Bağımlılıkları yükleyin:
```
npm install
```
2. Geliştirme sunucusunu çalıştırın:
```
npm run dev
```
3. `http://localhost:3000` adresini açın.

## Ortam Değişkenleri
`.env` dosyasını oluşturun. Aşağıdakiler örnektir (tamamı opsiyonel):
```
NEXT_PUBLIC_BUSINESS_NAME=Luna Beauty Center
NEXT_PUBLIC_BUSINESS_PHONE=+905551112233
NEXT_PUBLIC_WHATSAPP_NUMBER=+905551112233
NEXT_PUBLIC_BUSINESS_EMAIL=info@lunabeauty.example
NEXT_PUBLIC_BUSINESS_ADDRESS=Bağdat Cad. No: 10, Kadıköy, İstanbul
NEXT_PUBLIC_MAP_EMBED_URL=https://www.openstreetmap.org/export/embed.html?bbox=28.95%2C41.01%2C29.05%2C41.06&layer=mapnik
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

> Bu fazda DB ve mail bildirimleri devre dışıdır. `.ics` dosyası istemci tarafında oluşturulur; WhatsApp teyit linki önceden doldurulmuş mesajla açılır.

## Proje Yapısı
- `app/page.tsx`: Ana sayfa (Hero, Hizmetler, Randevu, Hakkımızda, İletişim)
- `components/booking/BookingFlow.tsx`: 3 adımlı randevu bileşeni
- `app/confirm/`: Onay ekranı ve `.ics` indirme/WhatsApp linki
- `lib/data.ts`: Örnek hizmet listesi (geçici)
- `lib/slots.ts`: Tarih/saat slot üretimi (geçmişler pasif)
- `lib/settings.ts`: İşletme bilgileri (env üzerinden)

## Tasarım
- Tailwind ile sade, modern stil
- Marka renkleri: pembe/rose tonlarında `brand` paleti
- Mobil öncelikli; sabit alt çağrı butonları

## Build/Deploy
```
npm run build
npx serve out  # static export planlanmıyor; Vercel/Netlify önerilir
```
- Vercel/Netlify uyumludur.
- (Sonraki faz) Prisma migrate ve prod SQLite dosyası notları eklenecek.

## Yol Haritası
- Admin paneli `/admin/*` (login, bookings, services, slots, settings)
- Prisma (SQLite) şema + seed (admin, 2 hizmet, 1 hafta slot)
- E-posta bildirimleri (admin/müşteri)
- Slot kuralı (haftalık tekrar) ve kapasite

