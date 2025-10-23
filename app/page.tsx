import Link from 'next/link'
import { services } from '@/lib/data'
import { business } from '@/lib/settings'
import Reveal from '@/components/Reveal'
import ServiceCard from '@/components/ServiceCard'
import HeroSlider from '@/components/HeroSlider'

export default function Home() {

  return (
    <main>
      <section className="relative overflow-hidden min-h-[50vh]">
        <HeroSlider images={["/1.jpg","/2.jpg","/3.jpg","/4.jpg"]} intervalMs={3600} />
        <div className="container-max relative py-28 sm:py-36">
          <Reveal className="max-w-2xl text-white" variant="fade-up">
            <img src="/logo.png" alt="Luna Beauty Center" className="mb-6 h-12 w-auto" />
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl drop-shadow" style={{ fontFamily: 'var(--font-script), cursive' }}>
              {business.name}
            </h1>
            <p className="mt-4 text-lg text-white/90">
              Güzelliğinize değer katıyoruz. Cilt bakımı, lazer epilasyon ve daha fazlası için uzman ekibimizle yanınızdayız. Hızlıca randevu alın.
            </p>
            <div className="mt-8 flex items-center gap-3">
              <a href="/randevu" className="btn btn-primary">Randevu Al</a>
              <a href="#hizmetler" className="btn btn-ghost">Hizmetleri Gör</a>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="hizmetler" className="container-max py-12 sm:py-16 scroll-mt-24">
        <h2 className="section-title" style={{ fontFamily: 'var(--font-script), cursive' }}>Hizmetler</h2>
        <p className="mt-2 text-gray-600">Size uygun bakımı seçin.</p>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {services.filter(s=>s.active).map((s, i) => (
            <Reveal key={s.id} delay={i*60}>
              <ServiceCard service={s} />
            </Reveal>
          ))}
        </div>
      </section>


      <section id="hakkimizda" className="container-max py-12 sm:py-16 scroll-mt-24">
        <h2 className="section-title" style={{ fontFamily: 'var(--font-script), cursive' }}>Hakkımızda</h2>
        <Reveal className="mt-2 max-w-3xl text-gray-600" variant="fade-in">
          Deneyimli ekibimizle, modern cihazlar ve hijyenik ortamda kişiye özel çözümler sunuyoruz. Önceliğimiz memnuniyetiniz ve doğal güzelliğiniz.
        </Reveal>
      </section>

      <section id="iletisim" className="container-max py-12 sm:py-16 scroll-mt-24">
        <h2 className="section-title" style={{ fontFamily: 'var(--font-script), cursive' }}>İletişim</h2>
        <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <Reveal className="card" variant="fade-up">
            <h3 className="font-semibold text-gray-900">Adres</h3>
            <p className="mt-1 text-gray-600">{business.address}</p>
            <div className="mt-3 flex gap-3">
              <a href={`tel:${business.phone}`} className="btn btn-primary">Ara</a>
              <a href={`https://wa.me/${business.whatsapp.replace(/[^\\d]/g,'')}?text=${encodeURIComponent('Merhaba, randevu hakkında bilgi alabilir miyim?')}`} target="_blank" className="btn btn-ghost">WhatsApp</a>
            </div>
          </Reveal>
          <Reveal className="overflow-hidden rounded-xl border" variant="fade-up" delay={80}>
            <iframe
              src={business.mapEmbedUrl}
              className="h-72 w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </Reveal>
        </div>
      </section>
    </main>
  )
}

