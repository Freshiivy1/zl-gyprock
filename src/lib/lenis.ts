import Lenis from 'lenis'

let lenis: Lenis | null = null

export function initLenis(): Lenis {
  if (!lenis) {
    lenis = new Lenis({ lerp: 0.1 })
    function raf(time: number) {
      lenis?.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
  }
  return lenis
}

export function getLenis(): Lenis | null {
  return lenis
}

export function scrollToTop() {
  if (lenis) lenis.scrollTo(0, { duration: 1.2 })
  else window.scrollTo({ top: 0, behavior: 'smooth' })
}
