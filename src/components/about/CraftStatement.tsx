import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const STATEMENT =
  "EVERY CREW MEMBER IS A CAREER PLASTERER. NO SUBBIES YOU'VE NEVER MET, NO APPRENTICES LEFT UNSUPERVISED."

const TILES = [
  { img: '/work-2.jpg', alt: 'Gyprock sheets being installed on a timber stud frame', caption: 'Sheet-out, Kellyville' },
  { img: '/work-3.jpg', alt: 'Ornate heritage cornice and ceiling rose detail', caption: 'Heritage restoration, Paddington' },
  { img: '/work-5.jpg', alt: 'Venetian-style plaster finish in a luxury bathroom', caption: 'Venetian finish, Mosman' },
]

export default function CraftStatement() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

      // Word-scrub reveal tied to scroll (like home §3)
      const words = gsap.utils.toArray<HTMLElement>('.craft-word')
      if (reduced) {
        gsap.set(words, { opacity: 1 })
      } else {
        gsap.to(words, {
          opacity: 1,
          stagger: 0.06,
          ease: 'none',
          scrollTrigger: {
            trigger: '.craft-statement',
            start: 'top 80%',
            end: 'bottom 45%',
            scrub: true,
          },
        })
      }

      // Curtain reveals, staggered 0.15s
      gsap.utils.toArray<HTMLElement>('.craft-tile').forEach((tile, i) => {
        const curtain = tile.querySelector('.craft-curtain')
        const img = tile.querySelector('.craft-img')
        const st = { trigger: tile, start: 'top 80%', once: true }
        gsap.fromTo(
          curtain,
          { xPercent: 0 },
          { xPercent: 100, duration: reduced ? 0 : 0.8, delay: i * 0.15, ease: 'power3.out', scrollTrigger: st },
        )
        gsap.fromTo(
          img,
          { scale: reduced ? 1 : 1.08 },
          { scale: 1, duration: reduced ? 0 : 0.9, delay: i * 0.15 + 0.2, ease: 'power3.out', scrollTrigger: st },
        )
      })

      gsap.fromTo(
        '.craft-caption',
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          duration: reduced ? 0 : 0.5,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.craft-grid', start: 'top 80%', once: true },
        },
      )
    },
    { scope: root },
  )

  return (
    <section ref={root} className="bg-paper py-24 md:py-[140px]">
      <div className="container">
        <div className="mx-auto max-w-[900px] text-center">
          <span className="eyebrow !text-amber-deep">The Standard</span>
          <p className="craft-statement mt-8 font-display text-[26px] font-bold uppercase leading-[1.2] tracking-[-0.015em] text-ink md:text-[36px]">
            {STATEMENT.split(' ').map((word, i) => (
              <span key={`${word}-${i}`} className="craft-word inline-block opacity-[0.15]">
                {word}
                {'\u00A0'}
              </span>
            ))}
          </p>
        </div>

        <div className="craft-grid mt-14 grid grid-cols-1 gap-6 sm:grid-cols-3 md:mt-20">
          {TILES.map((tile) => (
            <figure key={tile.img}>
              <div className="craft-tile group relative overflow-hidden" style={{ aspectRatio: '4 / 3' }}>
                <img
                  src={tile.img}
                  alt={tile.alt}
                  loading="lazy"
                  className="craft-img h-full w-full object-cover transition-transform duration-500 will-change-transform group-hover:scale-[1.05]"
                />
                <div
                  className="craft-curtain absolute inset-0 z-10 bg-paper will-change-transform"
                  aria-hidden="true"
                />
              </div>
              <figcaption className="craft-caption mt-3 text-[13px] font-medium tracking-[0.04em] text-ink-soft">
                {tile.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
