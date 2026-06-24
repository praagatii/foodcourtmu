import { useEffect, useRef, useState } from 'react'
import LiquidEther from './components/LiquidEther/LiquidEther'
import TiltedCard from './components/TiltedCard/TiltedCard'
import FlowingMenu from './components/FlowingMenu/FlowingMenu'

const slides = [
  { bg: '2.png', overlay: 'overlay%201.png' },
  { bg: '4.png', overlay: 'overlay%202.png' },
  { bg: '6.png', overlay: 'overlay-3.png' },
  { bg: '8.png', overlay: 'overlay%204.png' },
]

const menuItems = [
  { link: '#', text: 'Pizza', image: 'overlay%201.png' },
  { link: '#', text: 'Donut', image: 'overlay%202.png' },
  { link: '#', text: 'Ice Cream', image: 'overlay-3.png' },
  { link: '#', text: 'Biryani', image: 'overlay%204.png' },
]

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const slideRefs = useRef([])

  useEffect(() => {
    const els = slideRefs.current

    function update() {
      const t = window.scrollY / window.innerHeight
      const idx = Math.max(0, Math.min(3, Math.round(t)))
      for (let i = 0; i < els.length; i++) {
        els[i].classList.toggle('active', i === idx)
      }
    }

    update()

    let ticking = false
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => { update(); ticking = false })
        ticking = true
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', update)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', update)
    }
  }, [])

  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '100vh' }}>
      <div style={{
        position: 'fixed', inset: 0, zIndex: 1,
        width: '100%', height: '100%',
        willChange: 'transform',
        transform: 'translateZ(0)'
      }}>
        <LiquidEther
          colors={['#5227FF', '#FF9FFC', '#B497CF']}
          mouseForce={12}
          cursorSize={50}
          isViscous={false}
          viscous={20}
          iterationsViscous={8}
          iterationsPoisson={8}
          resolution={0.3}
          isBounce
          autoDemo
          autoSpeed={0.55}
          autoIntensity={1.5}
          takeoverDuration={0.25}
          autoResumeDelay={3000}
          autoRampDuration={0.6}
        />
      </div>

      <div style={{ position: 'relative', zIndex: 2 }}>
        {slides.map((s, i) => (
          <div
            key={i}
            ref={el => slideRefs.current[i] = el}
            className={`slide ${i === 0 ? 'active' : ''}`}
          >
            <img className="bg" src={s.bg} alt="" />
            <div className="overlay-wrapper">
              <TiltedCard
                imageSrc={s.overlay}
                altText=""
                containerWidth="100%"
                containerHeight="100%"
                imageWidth="100%"
                imageHeight="100%"
                rotateAmplitude={8}
                scaleOnHover={1.05}
                showMobileWarning={false}
                showTooltip={false}
                displayOverlayContent={false}
              />
            </div>
          </div>
        ))}
        <div className="spacer"></div>
        <div className="spacer"></div>
        <div className="spacer"></div>
        <div className="spacer"></div>
      </div>

      <button
        className="menu-btn"
        onClick={() => setMenuOpen(true)}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {menuOpen && (
        <div className="menu-overlay">
          <button className="menu-close" onClick={() => setMenuOpen(false)}>✕</button>
          <FlowingMenu
            items={menuItems}
            textColor="#ffffff"
            bgColor="#11011f"
            marqueeBgColor="#ffffff"
            marqueeTextColor="#11011f"
            borderColor="#ffffff"
            onItemClick={() => setMenuOpen(false)}
          />
        </div>
      )}

      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { background: #11011f; }
        body { background: #11011f; }

        .slide {
          position: fixed;
          inset: 0;
          opacity: 0;
          visibility: hidden;
          transition: opacity 600ms ease-in-out, visibility 600ms;
          will-change: opacity;
        }

        .slide.active {
          opacity: 1;
          visibility: visible;
        }

        .slide img.bg {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        @keyframes float {
          0%, 100% { transform: translate(-50%, -50%) translateY(0); }
          50% { transform: translate(-50%, -50%) translateY(-12px); }
        }

        .overlay-wrapper {
          position: absolute;
          width: 42%;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          animation: float 3s ease-in-out infinite;
          filter: drop-shadow(0 0 30px rgba(255,255,255,0.3)) drop-shadow(0 0 60px rgba(255,255,255,0.15));
          cursor: pointer;
        }

        .menu-btn {
          position: fixed;
          top: 20px;
          left: 20px;
          z-index: 10;
          width: 40px;
          height: 32px;
          background: none;
          border: none;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 0;
        }

        .menu-btn span {
          display: block;
          width: 100%;
          height: 3px;
          background: #fff;
          border-radius: 2px;
          transition: background 0.3s;
        }

        .menu-overlay {
          position: fixed;
          inset: 0;
          z-index: 100;
          overflow: hidden;
        }

        .menu-close {
          position: absolute;
          top: 20px;
          right: 20px;
          z-index: 101;
          background: none;
          border: none;
          color: #fff;
          font-size: 28px;
          cursor: pointer;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .spacer { height: 100vh; }
      `}</style>
    </div>
  )
}
