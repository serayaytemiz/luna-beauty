import { Service } from './types'

export const services: Service[] = [
  {
    id: 'svc-clean-60',
    slug: 'cilt-bakimi-60',
    name: 'Cilt Bakımı (60 dk)',
    durationMin: 60,
    price: 950,
    active: true,
    description: 'Derinlemesine temizlik, peeling ve yoğun nemlendirme. Cildinizi arındırıp canlı bir görünüm kazandırır.'
  },
  {
    id: 'svc-laser-30',
    slug: 'lazer-epilasyon-30',
    name: 'Lazer Epilasyon (30 dk)',
    durationMin: 30,
    price: 650,
    active: true,
    description: 'Bölgesel lazer epilasyon; hızlı, etkili ve konforlu. İstenmeyen tüylerde kalıcı azalma hedeflenir.'
  },
  {
    id: 'svc-brows-45',
    slug: 'kas-sekillendirme-45',
    name: 'Kaş Şekillendirme (45 dk)',
    durationMin: 45,
    price: 400,
    active: true,
    description: 'Yüz hatlarınıza uygun profesyonel kaş tasarımı. Doğal ve simetrik bir ifade için ölçülü uygulama.'
  },
  {
    id: 'svc-hydra-60',
    slug: 'hydrafacial-60',
    name: 'HydraFacial (60 dk)',
    durationMin: 60,
    price: 1200,
    active: true,
    description: 'Temizleme, soyma, çıkarma ve nemlendirmeyi bir arada sunan bakım. Işıltılı ve pürüzsüz bir cilt görünümü sağlar.'
  },
  {
    id: 'svc-rejuv-50',
    slug: 'cilt-genclestirme-50',
    name: 'Cilt Gençleştirme (50 dk)',
    durationMin: 50,
    price: 1100,
    active: true,
    description: 'Işıltı artıran, ince çizgilere karşı destekleyici bakım. Cilt tonunu eşitlemeye ve elastikiyeti artırmaya yardımcı olur.'
  },
  {
    id: 'svc-mask-30',
    slug: 'maske-bakim-30',
    name: 'Maske & Bakım (30 dk)',
    durationMin: 30,
    price: 350,
    active: true,
    description: 'Cilt tipinize özel maske uygulaması ve hızlı bakım. Kısa sürede ferah ve taze bir görünüm.'
  }
]

export const findServiceBySlug = (slug?: string | null) =>
  services.find((s) => s.slug === slug)

