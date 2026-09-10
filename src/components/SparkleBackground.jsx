import { useEffect, useRef } from 'react'

// Animated gold-sparkle + twinkling-star background, fixed behind all page content.
// Density is lower by default so it stays readable behind forms and lists;
// pass density="full" on the landing page for the fuller effect.
export default function SparkleBackground({ density = 'light' }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let w, h, frameId

    function resize() {
      w = canvas.width = window.innerWidth
      h = canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const starCount = density === 'full' ? 130 : 60
    const moteCount = density === 'full' ? 55 : 22

    const stars = Array.from({ length: starCount }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.8 + 0.6,
      phase: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.03 + 0.015,
    }))

    const motes = Array.from({ length: moteCount }, () => ({
      x: Math.random() * w,
      y: Math.random() * h + h,
      r: Math.random() * 2.5 + 1.5,
      drift: (Math.random() - 0.5) * 0.4,
      speed: Math.random() * 0.5 + 0.2,
      phase: Math.random() * Math.PI * 2,
    }))

    function draw() {
      ctx.clearRect(0, 0, w, h)

      stars.forEach((s) => {
        s.phase += s.speed
        const alpha = 0.5 + Math.sin(s.phase) * 0.35
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,253,248,${alpha})`
        ctx.fill()
      })

      motes.forEach((m) => {
        m.y -= m.speed
        m.x += m.drift
        m.phase += 0.04
        if (m.y < -10) {
          m.y = h + 10
          m.x = Math.random() * w
        }
        const glow = 0.6 + Math.sin(m.phase) * 0.3
        const grad = ctx.createRadialGradient(m.x, m.y, 0, m.x, m.y, m.r * 5)
        grad.addColorStop(0, `rgba(247,223,163,${glow})`)
        grad.addColorStop(1, 'rgba(247,223,163,0)')
        ctx.beginPath()
        ctx.arc(m.x, m.y, m.r * 5, 0, Math.PI * 2)
        ctx.fillStyle = grad
        ctx.fill()

        ctx.beginPath()
        ctx.arc(m.x, m.y, m.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,253,248,${glow})`
        ctx.fill()
      })

      frameId = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(frameId)
    }
  }, [density])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  )
}
