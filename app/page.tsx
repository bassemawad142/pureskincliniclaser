'use client'

import { useEffect, useRef, useState } from 'react'

declare global {
  interface Window {
    dataLayer: Record<string, any>[]
  }
}

const GOOGLE_SHEET_URL =
  'https://script.google.com/macros/s/AKfycbyc95ujU9xSd5BU9yMxcNn3jjzRFhOz0MuY5puRGMFAK2d4sUO23dsah3NrzaU34gSDyw/exec'

const GOOGLE_REVIEWS_URL =
  'https://share.google/i0ilkk0cyukkV0Gpo'

const heroSlides = [
  {
    image: '/splendorx1.jpg',
    alt: 'جهاز Splendor X لإزالة الشعر بالليزر',
    title: 'Splendor X',
    subtitle: 'تقنية متقدمة لإزالة الشعر',
  },
  {
    image: '/gentalmax2.jpg',
    alt: 'جهاز GentleMax Pro Plus لإزالة الشعر بالليزر',
    title: 'GentleMax Pro Plus',
    subtitle: 'تقنية متقدمة لإزالة الشعر',
  },
  {
    image: '/qswitch1.jpg',
    alt: 'جهاز Q-Switch للتشقير',
    title: 'Q-Switch',
    subtitle: 'للتشقير وتوحيد مظهر البشرة',
  },
]

const laserServices = [
  {
    title: 'GentleMax Pro Plus',
    subtitle: 'Candela',
    image: '/gentalmax.png',
    description:
      'تقنية متقدمة لإزالة الشعر بالليزر، مع اختيار الإعدادات المناسبة حسب نوع البشرة والشعر وتقييم المختص.',
  },
  {
    title: 'Splendor X',
    subtitle: 'Lumenis',
    image: '/splendorx3.jpeg',
    description:
      'تقنية ليزر متقدمة لإزالة الشعر، مع اختيار الإعداد المناسب وفق احتياج كل حالة وتقييم المختص.',
  },
  {
    title: 'Q-Switch',
    subtitle: 'للتشقير',
    image: '/qswitch.png',
    description:
      'تقنية ليزر متخصصة تُستخدم ضمن خدمات التشقير وفق تقييم المختص.',
  },
]

export default function Page() {
  const [activeSlide, setActiveSlide] = useState(0)
  const [submitted, setSubmitted] = useState(false)
const [isSubmitting, setIsSubmitting] = useState(false)
const submissionLock = useRef(false)


  
  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((i) => (i + 1) % heroSlides.length)
    }, 5000)

    return () => window.clearInterval(timer)
  }, [])



const handleSubmit = async (
  e: React.FormEvent<HTMLFormElement>
) => {
  e.preventDefault()

  // منع تكرار التسجيل عند الضغط أكثر من مرة
  if (submissionLock.current) return

  const form = e.currentTarget
  const fd = new FormData(form)

  const data = {
    name: fd.get('name')?.toString().trim() || '',
    phone: fd.get('phone')?.toString().trim() || '',
    service: fd.get('service')?.toString().trim() || '',
  }

  if (
    !data.name ||
    !data.phone ||
    !data.service ||
    data.service === 'الخدمة المطلوبة'
  ) {
    alert('يرجى تعبئة جميع البيانات')
    return
  }

  submissionLock.current = true
  setIsSubmitting(true)

  try {
    await fetch(GOOGLE_SHEET_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(data),
    })

    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({
      event: 'laser_lead_submitted',
    })

    setSubmitted(true)
    form.reset()
  } catch (error) {
    console.error('Booking submission error:', error)
    alert('حدث خطأ، يرجى المحاولة مرة أخرى.')
  } finally {
    submissionLock.current = false
    setIsSubmitting(false)
  }
}


  return (
    <main
      dir="rtl"
      className="min-h-screen bg-[#fbf8f5] text-[#3d3030]"
    >
      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="relative min-h-[760px] overflow-hidden bg-[#211d1b] text-white">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.image}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
              activeSlide === index
                ? 'opacity-100'
                : 'opacity-0'
            }`}
            style={{
              backgroundImage: `url('${slide.image}')`,
            }}
          />
        ))}

        <div className="absolute inset-0 bg-gradient-to-l from-black/80 via-black/35 to-black/20" />

        <nav className="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-6 py-7">
          <div className="font-sans text-lg font-medium tracking-[0.08em] text-[#f6e5d7] sm:text-xl md:text-2xl">
            pure skin clinic
          </div>

          <div className="hidden items-center gap-8 text-sm md:flex">
            <a href="#laser">الليزر</a>
            <a href="#technology">التقنيات</a>
            <a href="#reviews">آراء العملاء</a>
            <a href="#contact">تواصلي معنا</a>
          </div>

          <a
            href="#booking"
            className="rounded-full border border-[#eed5c5]/60 px-5 py-2.5 text-xs font-semibold"
          >
            احجزي موعدك
          </a>
        </nav>

        <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-start px-6 pb-20 pt-36 md:pt-44">
          <p className="mb-4 text-sm font-semibold tracking-[0.18em] text-[#e7bda8]">
            PURE SKIN CLINIC
          </p>

          <h1 className="text-4xl font-light leading-tight md:text-5xl">
            إزالة الشعر بتقنيات ليزر متقدمة
          </h1>

          <p className="mt-6 max-w-xl text-base leading-8 text-[#f0dfd6]">
            {heroSlides[activeSlide].title} —{' '}
            {heroSlides[activeSlide].subtitle}
          </p>

          <a
            href="#booking"
            className="mt-9 rounded-full bg-[#e6b69c] px-8 py-4 text-sm font-bold text-[#3d2524]"
          >
            احجزي موعدك
          </a>
        </div>

        <div className="absolute bottom-7 left-1/2 z-20 flex -translate-x-1/2 gap-3">
          {heroSlides.map((slide, index) => (
            <button
              key={slide.image}
              type="button"
              aria-label={`الصورة ${index + 1}`}
              onClick={() => setActiveSlide(index)}
              className={`h-2.5 rounded-full transition-all ${
                activeSlide === index
                  ? 'w-8 bg-[#e6b69c]'
                  : 'w-2.5 bg-white/60'
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          aria-label="الصورة السابقة"
          onClick={() =>
            setActiveSlide(
              (activeSlide - 1 + heroSlides.length) %
                heroSlides.length
            )
          }
          className="absolute right-5 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 rounded-full border border-white/30 bg-black/15 text-xl md:block"
        >
          ‹
        </button>

        <button
          type="button"
          aria-label="الصورة التالية"
          onClick={() =>
            setActiveSlide(
              (activeSlide + 1) % heroSlides.length
            )
          }
          className="absolute left-5 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 rounded-full border border-white/30 bg-black/15 text-xl md:block"
        >
          ›
        </button>
      </section>

      {/* =====================================================
          LASER SERVICES
      ====================================================== */}

      <section id="laser" className="px-6 py-24">
        <div className="mx-auto max-w-6xl text-center">
          <p className="mb-3 text-xs font-bold tracking-[0.25em] text-[#a96f59]">
            تقنيات الليزر
          </p>

          <h2 className="text-4xl font-light text-[#4a3430]">
            تقنيات متقدمة لإزالة الشعر
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-8 text-[#806b63]">
            نوفر في بيور سكن مجموعة من تقنيات الليزر، ويتم اختيار
            التقنية والإعدادات المناسبة بعد تقييم الحالة.
          </p>

          <div className="mt-14 grid gap-7 md:grid-cols-3">
            {laserServices.map((service) => (
              <article
                key={service.title}
                className="group overflow-hidden rounded-[2rem] bg-white text-right shadow-[0_12px_40px_rgba(92,62,52,0.08)]"
              >
                <div className="h-80 overflow-hidden bg-[#eee8e2]">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                </div>

                <div className="p-7">
                  <p className="text-xs font-bold tracking-[0.18em] text-[#a96f59]">
                    {service.subtitle}
                  </p>

                  <h3 className="mt-2 text-2xl font-semibold text-[#4d3731]">
                    {service.title}
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-[#88736c]">
                    {service.description}
                  </p>

                  <a
                    href="#booking"
                    className="mt-5 inline-block text-sm font-bold text-[#b17c67]"
                  >
                    احجزي موعد ←
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          BOOKING
      ====================================================== */}

      <section id="booking" className="px-6 py-24">
        <div className="mx-auto max-w-4xl rounded-[2rem] bg-[#422c2b] px-7 py-12 text-center text-white md:px-16">
          <p className="text-xs font-bold tracking-[0.25em] text-[#e7bda8]">
            خطوتك الأولى
          </p>

          <h2 className="mt-4 text-4xl font-light">
            احجزي موعدك
          </h2>

          {submitted ? (
            <div className="mx-auto mt-8 max-w-2xl rounded-2xl border border-[#e7bda8]/30 bg-white/10 p-6">
              <p className="text-lg font-semibold">
                تم استلام بياناتك بنجاح ✓
              </p>

              <p className="mt-2 text-sm text-[#ead8cf]">
                سيتواصل معك فريق بيور سكن قريباً.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="mx-auto mt-8 grid max-w-2xl gap-3 md:grid-cols-2"
            >
              <input
                name="name"
                required
                placeholder="الاسم الكامل"
                className="rounded-xl border border-white/15 bg-white/10 px-5 py-4 text-right text-sm placeholder:text-[#d9c2b8]"
              />

              <input
                name="phone"
                required
                type="tel"
                inputMode="tel"
                placeholder="رقم الجوال"
                className="rounded-xl border border-white/15 bg-white/10 px-5 py-4 text-right text-sm placeholder:text-[#d9c2b8]"
              />

              <select
                name="service"
                required
                defaultValue="الخدمة المطلوبة"
                className="rounded-xl border border-white/15 bg-white/10 px-5 py-4 text-right text-sm text-[#ead8cf] md:col-span-2"
              >
                <option className="text-[#3d3030]">
                  الخدمة المطلوبة
                </option>

                <option className="text-[#3d3030]">
                  GentleMax Pro Plus
                </option>

                <option className="text-[#3d3030]">
                  Splendor X
                </option>

                <option className="text-[#3d3030]">
                  Q-Switch للتشقير
                </option>

                <option className="text-[#3d3030]">
                  استشارة ليزر
                </option>
              </select>

              <button
                type="submit"
                disabled={isSubmitting}
                aria-busy={isSubmitting}
                className="rounded-xl bg-[#e6b69c] px-6 py-4 text-sm font-bold text-[#3d2524] transition-opacity disabled:cursor-not-allowed disabled:opacity-60 md:col-span-2"
              >
                {isSubmitting ? 'جاري التسجيل...' : 'أرغب بحجز موعد'}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* =====================================================
          TECHNOLOGY
      ====================================================== */}

      <section
        id="technology"
        className="bg-[#efe4dc] px-6 py-24"
      >
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <p className="mb-3 text-xs font-bold tracking-[0.25em] text-[#a96f59]">
              تقنيات بيور سكن
            </p>

            <h2 className="text-4xl font-light text-[#4a3430]">
              اختيار التقنية المناسبة يبدأ من التقييم
            </h2>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            <div className="rounded-[1.75rem] bg-white/75 p-7">
              <h3 className="text-xl font-semibold">
                GentleMax Pro Plus
              </h3>

              <p className="mt-3 text-sm leading-7 text-[#806b63]">
                جهاز Candela متقدم لإزالة الشعر، مع إعدادات
                تُحدد بحسب الحالة.
              </p>
            </div>

            <div className="rounded-[1.75rem] bg-white/75 p-7">
              <h3 className="text-xl font-semibold">
                Splendor X
              </h3>

              <p className="mt-3 text-sm leading-7 text-[#806b63]">
                جهاز Lumenis متقدم لإزالة الشعر، مع اختيار
                التقنية المناسبة حسب الحالة.
              </p>
            </div>

            <div className="rounded-[1.75rem] bg-white/75 p-7">
              <h3 className="text-xl font-semibold">
                Q-Switch
              </h3>

              <p className="mt-3 text-sm leading-7 text-[#806b63]">
                تقنية متخصصة للتشقير ضمن خطة مناسبة بعد تقييم
                المختص.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          REVIEWS
      ====================================================== */}

      <section
        id="reviews"
        className="bg-[#faf7f3] px-6 py-24 text-[#422c2b]"
        dir="rtl"
      >
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-xs font-bold tracking-[0.25em] text-[#b98262]">
            تجارب عملائنا
          </p>

          <h2 className="mt-4 text-4xl font-light md:text-5xl">
            ماذا يقول عملاؤنا؟
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-[#8a6c6f]">
            تجارب عملائنا مع جلسات إزالة الشعر بالليزر في بيور سكن
          </p>

          <div className="mt-14 grid gap-7 md:grid-cols-3">

            <div className="rounded-[1.75rem] bg-white p-7 text-right shadow-[0_10px_35px_rgba(63,43,43,0.06)]">
              <h3 className="text-xl font-semibold">
                تجربة إزالة الشعر بالليزر
              </h3>

              <div className="mt-4 flex gap-1 text-[#d9a04d]">
                ★ ★ ★ ★ ★
              </div>

              <p className="mt-6 text-sm leading-8 text-[#765f57]">
                كانت تجربتي مع جلسات إزالة الشعر بالليزر ممتازة،
                وأكثر شيء أعجبني هو الاهتمام بالتفاصيل وشرح الخطوات
                قبل الجلسة.
              </p>

              <div className="mt-6 border-t border-[#eadfd8] pt-5 text-sm font-semibold">
                تجربة عميلة
              </div>
            </div>

            <div className="rounded-[1.75rem] bg-white p-7 text-right shadow-[0_10px_35px_rgba(63,43,43,0.06)]">
              <h3 className="text-xl font-semibold">
                تجربة Splendor X
              </h3>

              <div className="mt-4 flex gap-1 text-[#d9a04d]">
                ★ ★ ★ ★ ★
              </div>

              <p className="mt-6 text-sm leading-8 text-[#765f57]">
                تجربة مريحة جدًا، والموظفة كانت متعاونة وشرحت لي
                كل شيء قبل الجلسة. أعجبني الاهتمام بنظافة المكان
                ودقة التعامل أثناء الجلسة.
              </p>

              <div className="mt-6 border-t border-[#eadfd8] pt-5 text-sm font-semibold">
                تجربة عميلة
              </div>
            </div>

            <div className="rounded-[1.75rem] bg-white p-7 text-right shadow-[0_10px_35px_rgba(63,43,43,0.06)]">
              <h3 className="text-xl font-semibold">
                تجربة GentleMax Pro Plus
              </h3>

              <div className="mt-4 flex gap-1 text-[#d9a04d]">
                ★ ★ ★ ★ ★
              </div>

              <p className="mt-6 text-sm leading-8 text-[#765f57]">
                من أفضل تجارب الليزر بالنسبة لي. المكان مرتب،
                والتعامل راقٍ، وتم اختيار الإعدادات المناسبة لي
                مع متابعة واهتمام أثناء الجلسة.
              </p>

              <div className="mt-6 border-t border-[#eadfd8] pt-5 text-sm font-semibold">
                تجربة عميلة
              </div>
            </div>

          </div>

          <a
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-12 inline-flex items-center gap-3 rounded-full bg-[#422c2b] px-9 py-4 text-sm font-semibold text-white transition hover:-translate-y-1 hover:shadow-lg"
          >
            شاهد تقييمات Google
          </a>
        </div>
      </section>

      {/* =====================================================
          LOCATION
      ====================================================== */}

      <section
        id="location"
        className="bg-[#efe4dc] px-6 py-20 md:py-24"
      >
        <div className="mx-auto max-w-6xl">

          <div className="mb-12 text-center">
            <p className="mb-3 text-xs font-bold tracking-[0.25em] text-[#b17c67]">
              زورينا في العيادة
            </p>

            <h2 className="text-3xl font-light text-[#4a3430] md:text-4xl">
              موقع بيور سكن
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[#826e67]">
              يسعدنا زيارتك في عيادتنا في الرياض لتجربة تقنيات الليزر المتقدمة.
            </p>
          </div>

          <div className="grid overflow-hidden rounded-[2rem] bg-white shadow-[0_12px_40px_rgba(92,62,52,0.08)] md:grid-cols-2">

            <div className="min-h-[380px]">
              <iframe
                title="موقع بيور سكن في الرياض"
                src="https://www.google.com/maps?q=Pure%20Skin%20Clinics%20Riyadh&output=embed"
                className="h-full min-h-[380px] w-full border-0"
                loading="lazy"
                allowFullScreen
              />
            </div>

            <div className="flex flex-col justify-center p-8 md:p-12">

              <p className="text-xs font-bold tracking-[0.25em] text-[#b17c67]">
                PURE SKIN CLINIC
              </p>

              <h3 className="mt-4 text-3xl font-light text-[#4a3430]">
                ننتظرك في الرياض
              </h3>

              <p className="mt-5 leading-8 text-[#765f57]">
                اختاري تقنية الليزر المناسبة لك، واستمتعي بتجربة متقدمة
                لإزالة الشعر مع أجهزة حديثة وفريق متخصص يهتم بأدق تفاصيل جلساتك.
              </p>

              <p className="mt-4 leading-8 text-[#765f57]">
                في بيور سكن نحرص على اختيار الإعدادات المناسبة لكل حالة
                لتقديم تجربة ليزر مريحة وآمنة ومناسبة لاحتياجاتك.
              </p>

              <a
                href="https://www.google.com/maps/search/?api=1&query=Pure%20Skin%20Clinics%20Riyadh"
                target="_blank"
                rel="noreferrer"
                className="mt-7 inline-flex w-fit rounded-full bg-[#422c2b] px-7 py-4 text-sm font-bold text-white transition hover:bg-[#5a3b39]"
              >
                افتحي الموقع على Google Maps
              </a>

            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          FOOTER
      ====================================================== */}

      <footer
        id="contact"
        className="border-t border-[#eaded7] px-6 py-10 pb-28"
      >
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-center text-sm text-[#806b63] md:flex-row">

          <div className="font-sans text-lg tracking-[0.06em] text-[#4a3430]">
            pure skin clinic
          </div>

          <div>
            الرياض &nbsp; | &nbsp; 920017285
          </div>

          <div>
            © 2026 Pure Skin Clinic
          </div>

        </div>
      </footer>

      {/* =====================================================
          FLOATING BUTTONS
      ====================================================== */}

      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3">

        {/* WhatsApp */}

        <a
          href="https://wa.me/966559610942"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="واتساب"
          onClick={() => {
            window.dataLayer = window.dataLayer || []

            window.dataLayer.push({
              event: 'laser_whatsapp_click',
            })
          }}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg"
        >
          <span className="text-2xl">◉</span>
        </a>

        {/* Phone */}

        <a
          href="tel:920017285"
          aria-label="اتصال"
          onClick={() => {
            window.dataLayer = window.dataLayer || []

            window.dataLayer.push({
              event: 'laser_phone_click',
            })
          }}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-[#c9a27e] text-white shadow-lg"
        >
          <span className="text-2xl">☎</span>
        </a>

      </div>

    </main>
  )
}
