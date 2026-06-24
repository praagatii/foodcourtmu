import { useEffect, useRef, useState } from 'react'
import LiquidEther from './components/LiquidEther/LiquidEther'
import TiltedCard from './components/TiltedCard/TiltedCard'
import FlowingMenu from './components/FlowingMenu/FlowingMenu'
import RotatingText from './components/RotatingText/RotatingText'
import DomeGallery from './components/DomeGallery/DomeGallery'

const slides = [
  { bg: '2.png', overlay: 'overlay-1.png', section: 'pizza' },
  { bg: '4.png', overlay: 'overlay-2.png', section: 'bakery' },
  { bg: '6.png', overlay: 'overlay-3.png', section: 'scoop' },
  { bg: '8.png', overlay: 'overlay-4.png', section: 'biryani' },
]

const menuItems = [
  { link: '#home', text: 'Home', image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=870&auto=format&fit=crop' },
  { link: '#food-court', text: 'Food Court', image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=774&auto=format&fit=crop' },
  { link: '#specials', text: 'Specials', image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=764&auto=format&fit=crop' },
  { link: '#contact', text: 'Contact Us', image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=774&auto=format&fit=crop' },
]

const menuData = {
  pizza: {
    title: 'Pizza',
    items: [
      { name: 'Classic Margherita', desc: 'Timeless pizza with rich tomato sauce, basil, and mozzarella perfection', price: '₹259 / ₹179' },
      { name: 'Veggie Delite', desc: 'Fresh garden vegetables layered over cheesy crust for wholesome satisfaction', price: '₹299 / ₹199' },
      { name: 'Bianca', desc: 'Creamy white sauce pizza with rich cheesy indulgent flavorful toppings', price: '₹289 / ₹199' },
      { name: 'Brave Heart', desc: 'Bold signature pizza packed with exciting flavors for adventurous cravings', price: '₹279 / ₹189' },
      { name: 'Nim Pizza', desc: 'Unique house-special pizza crafted with signature bold unforgettable flavors', price: '₹299 / ₹199' },
    ]
  },
  bakery: {
    title: 'Bakery',
    items: [
      { name: 'Red Velvet Mousse Cake', desc: 'Velvety smooth cake layered with rich creamy decadent red velvet', price: '₹169' },
      { name: 'Tres Leches', desc: 'Moist milk-soaked cake offering luscious sweetness in every heavenly bite', price: '₹229' },
      { name: 'Chocolate Fudge', desc: 'Warm fudgy chocolate dessert paired with creamy ice cream perfection', price: '₹199' },
      { name: 'Hot Chocolate', desc: 'Rich hot chocolate paired with creamy ice cream indulgent dessert bliss', price: '₹189' },
      { name: 'Donut Delight', desc: 'Soft glazed donuts dusted with sugar, pure bliss in every bite', price: '₹99' },
    ]
  },
  scoop: {
    title: 'Scoop',
    items: [
      { name: 'Single Scoop Ice Cream', desc: 'Classic creamy frozen delight perfect for sweet simple happy moments', price: '₹59' },
      { name: 'Brownie Sundae', desc: 'Warm brownie topped with ice cream, chocolate sauce, and nuts', price: '₹149' },
      { name: 'Chocolate Shake', desc: 'Rich and creamy chocolate milkshake blended to perfection', price: '₹149' },
      { name: 'Strawberry Shake', desc: 'Fresh strawberry milkshake with a creamy smooth finish', price: '₹149' },
      { name: 'Cold Coffee', desc: 'Chilled brewed coffee with milk and a hint of sweetness', price: '₹129' },
    ]
  },
  biryani: {
    title: 'Biryani',
    items: [
      { name: 'Veg Biryani', desc: 'Aromatic basmati rice layered with spiced vegetables and herbs', price: '₹199' },
      { name: 'Egg Biryani', desc: 'Fragrant biryani with spiced eggs, caramelized onions, and saffron', price: '₹229' },
      { name: 'Paneer Biryani', desc: 'Rich biryani with marinated paneer, aromatic spices, and herbs', price: '₹249' },
      { name: 'Jeera Rice', desc: 'Fragrant basmati rice tempered with cumin for simple flavorful perfection', price: '₹169' },
      { name: 'Curd Rice', desc: 'Cooling creamy curd rice, comforting classic for every satisfying meal', price: '₹129' },
    ]
  }
}

function scrollToSection(id) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [showBack, setShowBack] = useState(false)
  const [activeMenu, setActiveMenu] = useState(null)
  const [footerVisible, setFooterVisible] = useState(false)
  const containerRef = useRef(null)
  const footerRef = useRef(null)
  const reviewsRef = useRef(null)

  useEffect(() => {
    function updateSlides() {
      const els = containerRef.current?.querySelectorAll('.slide')
      if (!els || els.length === 0) return
      const t = window.scrollY / window.innerHeight - 1
      const raw = Math.round(t)
      const idx = raw <= -1 || raw >= 4 ? -1 : raw
      for (let i = 0; i < els.length; i++) {
        els[i].classList.toggle('active', i === idx)
      }
    }

    function updateBack() {
      setShowBack(window.scrollY > window.innerHeight * 6)
    }

    updateSlides()
    updateBack()

    let ticking = false
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => { updateSlides(); updateBack(); ticking = false })
        ticking = true
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', updateSlides)

    const footerObs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setFooterVisible(true) },
      { threshold: 0.15 }
    )
    if (footerRef.current) footerObs.observe(footerRef.current)

    const reviewsObs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) entry.target.classList.add('in-view') },
      { threshold: 0.15 }
    )
    if (reviewsRef.current) reviewsObs.observe(reviewsRef.current)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', updateSlides)
      if (footerRef.current) footerObs.unobserve(footerRef.current)
      if (reviewsRef.current) reviewsObs.unobserve(reviewsRef.current)
    }
  }, [])

  function closeMenu() {
    setMenuOpen(false)
  }

  return (
    <>
    <div className="loader">
      <div className="loader-inner">
        <div className="loader-logo">FC</div>
        <div className="loader-bar">
          <div className="loader-bar-fill"></div>
        </div>
      </div>
    </div>
    <div style={{ position: 'relative', width: '100%', minHeight: '100vh' }}>
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, width: '100%', height: '100%', opacity: 0.08, pointerEvents: 'none' }}>
        <DomeGallery grayscale={false} fit={2} minRadius={200} />
      </div>

      <div style={{
        position: 'fixed', inset: 0, zIndex: 1,
        width: '100%', height: '100%',
        opacity: 0.35
      }}>
        <LiquidEther
          colors={['#5227FF', '#FF9FFC', '#B497CF']}
          mouseForce={8}
          cursorSize={40}
          isViscous={false}
          viscous={20}
          iterationsViscous={4}
          iterationsPoisson={4}
          resolution={0.5}
          isBounce
          autoDemo
          autoSpeed={0.4}
          autoIntensity={0.8}
          takeoverDuration={0.25}
          autoResumeDelay={3000}
          autoRampDuration={0.6}
        />
      </div>

        <div id="home" className="hero-section">
        <div className="hero-headline">
          <span className="hero-craving">Craving</span>
          <span className="hero-box">
            <span className="hero-rotating-wrap">
              <RotatingText
                texts={['Pizza?', 'Bakes?', 'Ice Cream?', 'Biryani?']}
                mainClassName="hero-rotating overflow-hidden"
                staggerFrom="last"
                initial={{ rotateX: 90, opacity: 0 }}
                animate={{ rotateX: 0, opacity: 1 }}
                exit={{ rotateX: -90, opacity: 0 }}
                staggerDuration={0.025}
                splitLevelClassName="overflow-hidden pb-1"
                transition={{ type: 'spring', damping: 30, stiffness: 400 }}
                rotationInterval={2000}
              />
            </span>
          </span>
        </div>
        <div className="hero-tagline">something for everyone</div>
      </div>

      <div id="food-court" ref={containerRef} style={{ position: 'relative', zIndex: 2 }}>
        {slides.slice(0, 4).map((s, i) => (
          <div key={i} className="slide">
            <img className="bg" src={s.bg} alt="" />
            <div className="overlay-wrapper" onClick={() => setActiveMenu(s.section)}>
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

      <div id="specials" className="reviews-section" ref={reviewsRef}>
        <div className="reviews-cards">
          <div className="review-card review-card-1">
            <div className="review-card-inner">
              <div className="review-stars"><span className="star-filled">★</span><span className="star-filled">★</span><span className="star-filled">★</span><span className="star-filled">★</span><span className="star-filled">★</span></div>
              <p className="review-text">The butter chicken pizza at FC is a game-changer. I dream about that smoky, creamy perfection.</p>
              <div className="review-author-row">
                <div className="review-avatar" style={{ background: '#5227FF' }}>AR</div>
                <div className="review-author-info">
                  <span className="review-author-name">Ananya R.</span>
                  <span className="review-author-label">Pizza Enthusiast</span>
                </div>
              </div>
            </div>
          </div>
          <div className="review-card review-card-2">
            <div className="review-card-inner">
              <div className="review-stars"><span className="star-filled">★</span><span className="star-filled">★</span><span className="star-filled">★</span><span className="star-filled">★</span><span className="star-filled">★</span></div>
              <p className="review-text">Their biryani is hands-down the best in town. Fragrant, layered, and absolutely unforgettable.</p>
              <div className="review-author-row">
                <div className="review-avatar" style={{ background: '#B497CF' }}>RK</div>
                <div className="review-author-info">
                  <span className="review-author-name">Rahul K.</span>
                  <span className="review-author-label">Biryani Lover</span>
                </div>
              </div>
            </div>
          </div>
          <div className="review-card review-card-3">
            <div className="review-card-inner">
              <div className="review-stars"><span className="star-filled">★</span><span className="star-filled">★</span><span className="star-filled">★</span><span className="star-filled">★</span><span className="star-filled">★</span></div>
              <p className="review-text">Dangerous for my wallet, amazing for my soul. Every dessert here is a masterpiece worth every bite.</p>
              <div className="review-author-row">
                <div className="review-avatar" style={{ background: '#FF9FFC' }}>MJ</div>
                <div className="review-author-info">
                  <span className="review-author-name">Maya J.</span>
                  <span className="review-author-label">Food Blogger</span>
                </div>
              </div>
            </div>
          </div>
          <div className="review-card review-card-4">
            <div className="review-card-inner">
              <div className="review-stars"><span className="star-filled">★</span><span className="star-filled">★</span><span className="star-filled">★</span><span className="star-filled">★</span><span className="star-filled">★</span></div>
              <p className="review-text">Finally, a place where every dish feels intentional. The baked goods are next-level delicious.</p>
              <div className="review-author-row">
                <div className="review-avatar" style={{ background: '#5227FF' }}>PS</div>
                <div className="review-author-info">
                  <span className="review-author-name">Priya S.</span>
                  <span className="review-author-label">Pastry Chef</span>
                </div>
              </div>
            </div>
          </div>
          <div className="review-card review-card-5">
            <div className="review-card-inner">
              <div className="review-stars"><span className="star-filled">★</span><span className="star-filled">★</span><span className="star-filled">★</span><span className="star-filled">★</span><span className="star-filled">★</span></div>
              <p className="review-text">My kids beg to come here every weekend. The ice cream sundaes are pure childhood magic.</p>
              <div className="review-author-row">
                <div className="review-avatar" style={{ background: '#B497CF' }}>AK</div>
                <div className="review-author-info">
                  <span className="review-author-name">Arjun K.</span>
                  <span className="review-author-label">Regular Customer</span>
                </div>
              </div>
            </div>
          </div>
          <div className="review-card review-card-6">
            <div className="review-card-inner">
              <div className="review-stars"><span className="star-filled">★</span><span className="star-filled">★</span><span className="star-filled">★</span><span className="star-filled">★</span><span className="star-filled">★</span></div>
              <p className="review-text">The vibe, the flavours, the presentation — FC gets it. It&rsquo;s my go-to spot for every celebration.</p>
              <div className="review-author-row">
                <div className="review-avatar" style={{ background: '#FF9FFC' }}>NL</div>
                <div className="review-author-info">
                  <span className="review-author-name">Neha L.</span>
                  <span className="review-author-label">Loyal Regular</span>
                </div>
              </div>
            </div>
          </div>
          <span className="sparkle sparkle-1">✦</span>
          <span className="sparkle sparkle-2">✦</span>
          <span className="sparkle sparkle-3">✧</span>
          <span className="sparkle sparkle-4">✦</span>
          <span className="sparkle sparkle-5">✧</span>
        </div>
      </div>

        <footer id="contact" className={`contact-footer ${footerVisible ? 'visible' : ''}`} ref={footerRef}>
          <div className="footer-bg-text">FOOD COURT</div>
          <div className="footer-inner">
            <div className="footer-col footer-brand">
              <div className="footer-logo">
                <span className="footer-logo-mark">FC</span>
              </div>
              <p className="footer-tagline">A curated food experience under one roof.</p>
              <div className="footer-social">
                <button className="social-btn">Instagram</button>
                <button className="social-btn">WhatsApp</button>
              </div>
            </div>
            <div className="footer-col">
              <h4 className="footer-heading">Explore</h4>
              <a href="#" className="footer-link">Home</a>
              <a href="#" className="footer-link">Our Brands</a>
              <a href="#" className="footer-link">Menu</a>
            </div>
            <div className="footer-col">
              <h4 className="footer-heading">Visit Us</h4>
              <p className="footer-text">123 Foodie Lane,<br />Gourmet District,<br />Mumbai, India</p>
              <p className="footer-text">Mon–Sun: 11:00 AM – 11:00 PM</p>
              <p className="footer-text">+91 98765 43210<br />hello@foodcourt.in</p>
            </div>
          </div>
        </footer>
      </div>

      <button
        className="menu-btn"
        onClick={() => setMenuOpen(prev => !prev)}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <button
        className={`back-btn ${showBack ? 'visible' : ''}`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 19V5M5 12l7-7 7 7" />
        </svg>
      </button>

      {menuOpen && (
        <div className="menu-overlay" onClick={closeMenu}>
          <button className="menu-close" onClick={closeMenu}>✕</button>
          <FlowingMenu
            items={menuItems}
            textColor="#ffffff"
            bgColor="#11011f"
            marqueeBgColor="#ffffff"
            marqueeTextColor="#11011f"
            borderColor="#ffffff"
            onItemClick={(link) => { if (link && link !== '#') { const id = link.replace('#', ''); const el = document.getElementById(id); if (el) el.scrollIntoView({ behavior: 'smooth' }); } closeMenu(); }}
          />
        </div>
      )}

      {activeMenu && (
        <div className="food-menu-overlay" onClick={() => setActiveMenu(null)}>
          <div className="food-menu-modal" onClick={e => e.stopPropagation()}>
            <button className="food-menu-close" onClick={() => setActiveMenu(null)}>✕</button>
            <h2 className="food-menu-title">{menuData[activeMenu].title}</h2>
            <div className="food-menu-items">
              {menuData[activeMenu].items.map((item, idx) => (
                <div key={idx} className="menu-item">
                  <div className="menu-item-info">
                    <h3 className="menu-item-name">{item.name}</h3>
                    <p className="menu-item-desc">{item.desc}</p>
                  </div>
                  <span className="menu-item-price">{item.price}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { background: #11011f; scroll-behavior: smooth; }
        body { background: #11011f; }

        .slide {
          position: fixed;
          inset: 0;
          opacity: 0;
          visibility: hidden;
          transition: opacity 800ms ease-in-out, visibility 800ms;
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

        .loader {
          position: fixed;
          inset: 0;
          z-index: 9999;
          background: #11011f;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: loaderFade 0.4s ease 0.8s forwards;
          pointer-events: auto;
        }

        @keyframes loaderFade {
          to { opacity: 0; visibility: hidden; pointer-events: none; }
        }

        .loader-inner {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 24px;
        }

        .loader-logo {
          font-size: 4rem;
          font-weight: 900;
          color: #f8f7f2;
          letter-spacing: 0.06em;
          animation: loaderPulse 0.6s ease-in-out infinite;
        }

        @keyframes loaderPulse {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.08); opacity: 1; }
        }

        .loader-bar {
          width: 120px;
          height: 3px;
          background: rgba(248,247,242,0.15);
          border-radius: 2px;
          overflow: hidden;
        }

        .loader-bar-fill {
          height: 100%;
          width: 0;
          background: #f8f7f2;
          border-radius: 2px;
          animation: loaderFill 0.7s ease-in-out forwards;
        }

        @keyframes loaderFill {
          0% { width: 0; }
          100% { width: 100%; }
        }

        .overlay-wrapper {
          position: absolute;
          width: 42%;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          height: 70vh;
          filter: drop-shadow(0 0 30px rgba(255,255,255,0.3)) drop-shadow(0 0 60px rgba(255,255,255,0.15));
          cursor: pointer;
        }

        .hero-section {
          height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .hero-headline {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          gap: 20px;
          white-space: nowrap;
          line-height: 1.2;
        }

        .hero-tagline {
          position: relative;
          z-index: 1;
          color: #f8f7f2;
          font-size: clamp(1rem, 2.5vw, 1.4rem);
          font-weight: 400;
          text-align: center;
          margin-top: 16px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          opacity: 0.8;
        }

        .hero-craving {
          font-size: clamp(2.5rem, 6vw, 5rem);
          font-weight: 700;
          color: #f8f7f2;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          flex-shrink: 0;
          line-height: 1.2;
        }

        .hero-box {
          background: #f8f7f2;
          padding: 12px 28px;
          border-radius: 16px;
          display: inline-flex;
          align-items: center;
        }

        .hero-rotating-wrap {
          display: inline-flex;
          min-width: 22ch;
          vertical-align: middle;
          text-align: left;
          line-height: 1.2;
        }

        .hero-rotating {
          font-size: clamp(2.5rem, 6vw, 5rem);
          font-weight: 700;
          color: #11011f;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          justify-content: flex-start;
          flex-wrap: nowrap;
          perspective: 800px;
        }

        .menu-btn {
          position: fixed;
          top: 20px;
          right: 20px;
          z-index: 1000;
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
        }

        .menu-overlay {
          position: fixed;
          inset: 0;
          z-index: 100;
          overflow: hidden;
        }

        .back-btn {
          position: fixed;
          top: 16px;
          right: 70px;
          z-index: 1000;
          width: 40px;
          height: 40px;
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 50%;
          background: rgba(17,1,31,0.6);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          color: #fff;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transform: translateY(-10px);
          pointer-events: none;
          transition: opacity 0.4s ease, transform 0.4s ease, background 0.3s, border-color 0.3s;
        }

        .back-btn.visible {
          opacity: 1;
          transform: translateY(0);
          pointer-events: auto;
        }

        .back-btn:hover {
          background: rgba(82,39,255,0.5);
          border-color: rgba(82,39,255,0.6);
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

        .food-menu-overlay {
          position: fixed;
          inset: 0;
          z-index: 200;
          background: rgba(17,1,31,0.85);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .food-menu-modal {
          background: #f8f7f2;
          border-radius: 24px;
          padding: 48px 44px;
          width: 100%;
          max-width: 720px;
          max-height: 85vh;
          overflow-y: auto;
          position: relative;
          box-shadow: 0 25px 60px rgba(17,1,31,0.5), 0 0 0 1px rgba(82,39,255,0.08);
        }

        .food-menu-close {
          position: absolute;
          top: 18px;
          right: 18px;
          background: rgba(17,1,31,0.06);
          border: none;
          color: #11011f;
          font-size: 20px;
          cursor: pointer;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.3s;
        }

        .food-menu-close:hover {
          background: rgba(17,1,31,0.12);
        }

        .food-menu-title {
          font-size: clamp(1.8rem, 4vw, 2.8rem);
          font-weight: 800;
          color: #11011f;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          margin-bottom: 8px;
          position: relative;
        }

        .food-menu-title::after {
          content: '';
          display: block;
          width: 50px;
          height: 4px;
          background: #5227FF;
          border-radius: 2px;
          margin-top: 10px;
        }

        .food-menu-items {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-top: 28px;
        }

        .menu-item {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          padding: 16px 20px;
          border-radius: 14px;
          background: #ffffff;
          border: 1px solid rgba(17,1,31,0.06);
          transition: background 0.3s, border-color 0.3s, box-shadow 0.3s;
          box-shadow: 0 1px 3px rgba(17,1,31,0.04);
        }

        .menu-item:hover {
          background: #ffffff;
          border-color: rgba(82,39,255,0.15);
          box-shadow: 0 4px 14px rgba(82,39,255,0.08);
        }

        .menu-item-info {
          flex: 1;
          margin-right: 20px;
        }

        .menu-item-name {
          font-size: 1.05rem;
          font-weight: 700;
          color: #11011f;
          margin-bottom: 3px;
          letter-spacing: -0.01em;
        }

        .menu-item-desc {
          font-size: 0.82rem;
          color: rgba(17,1,31,0.45);
          line-height: 1.45;
        }

        .menu-item-price {
          font-size: 1.05rem;
          font-weight: 700;
          color: #5227FF;
          white-space: nowrap;
          padding-top: 2px;
          background: rgba(82,39,255,0.08);
          padding: 4px 12px;
          border-radius: 8px;
        }

        .spacer { height: 100vh; }

        .black-section {
          position: relative;
          z-index: 2;
          height: 100vh;
          background: #f8f7f2;
        }

        .reviews-section {
          position: relative;
          z-index: 2;
          background: #f8f7f2;
          padding: 40px 5%;
          overflow: hidden;
        }

        .reviews-cards {
          position: relative;
          width: 100%;
          max-width: 1100px;
          margin: 0 auto;
          min-height: 620px;
        }

        .review-card {
          position: absolute;
          width: clamp(300px, 40%, 400px);
          border-radius: 22px;
          box-shadow: 12px 12px 0px var(--card-shadow, #11011f);
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1), transform 0.6s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
          cursor: default;
        }

        .reviews-section.in-view .review-card {
          opacity: 1;
          transform: var(--card-transform);
        }

        .review-card:hover {
          transform: var(--card-hover-transform) !important;
          box-shadow: var(--card-hover-shadow) !important;
        }

        .review-card-inner {
          background: inherit;
          border-radius: 22px;
          padding: 38px 34px;
          position: relative;
        }

        .review-stars {
          color: var(--card-star, #11011f);
          font-size: 1.2rem;
          margin-bottom: 16px;
          letter-spacing: 4px;
        }

        .star-filled {
          display: inline-block;
        }

        .review-text {
          font-size: clamp(1.05rem, 1.4vw, 1.2rem);
          line-height: 1.7;
          color: var(--card-text, #11011f);
          margin-bottom: 24px;
          font-weight: 500;
          font-family: Georgia, 'Times New Roman', Times, serif;
          letter-spacing: -0.005em;
        }

        .review-author-row {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .review-avatar {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--card-avatar-text, #f8f7f2);
          background: var(--card-avatar-bg, #11011f);
          font-weight: 700;
          font-size: 0.85rem;
          flex-shrink: 0;
        }

        .review-author-info {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .review-author-name {
          font-weight: 700;
          font-size: 1rem;
          color: var(--card-name, #11011f);
        }

        .review-author-label {
          font-size: 0.8rem;
          color: var(--card-label, rgba(17,1,31,0.45));
          font-weight: 500;
        }

        .review-card-1 {
          left: -2%;
          top: 0;
          --card-transform: rotate(-6deg);
          --card-hover-transform: rotate(0deg) translateY(-10px);
          --card-hover-shadow: 20px 20px 0px #200934;
          --card-shadow: #200934;
          z-index: 1;
          background: #f8f7f2;
          --card-text: #11011f;
          --card-star: #11011f;
          --card-name: #11011f;
          --card-label: rgba(17,1,31,0.5);
          --card-avatar-bg: #200934;
          --card-avatar-text: #f8f7f2;
        }

        .review-card-2 {
          right: -2%;
          top: -15px;
          --card-transform: rotate(5deg);
          --card-hover-transform: rotate(0deg) translateY(-10px);
          --card-hover-shadow: 20px 20px 0px #11011f;
          --card-shadow: #11011f;
          z-index: 2;
          background: #200934;
          --card-text: #f8f7f2;
          --card-star: #f8f7f2;
          --card-name: #f8f7f2;
          --card-label: rgba(248,247,242,0.55);
          --card-avatar-bg: #f8f7f2;
          --card-avatar-text: #200934;
        }

        .review-card-3 {
          left: 50%;
          top: 20px;
          --card-transform: translateX(-50%) rotate(-2deg);
          --card-hover-transform: translateX(-50%) rotate(0deg) translateY(-12px);
          --card-hover-shadow: 24px 24px 0px #200934;
          --card-shadow: #200934;
          z-index: 3;
          width: clamp(320px, 44%, 440px);
          background: #f8f7f2;
          box-shadow: 14px 14px 0px #200934;
          --card-text: #11011f;
          --card-star: #11011f;
          --card-name: #11011f;
          --card-label: rgba(17,1,31,0.5);
          --card-avatar-bg: #200934;
          --card-avatar-text: #f8f7f2;
        }

        .review-card-4 {
          left: 2%;
          top: 280px;
          --card-transform: rotate(4deg);
          --card-hover-transform: rotate(0deg) translateY(-10px);
          --card-hover-shadow: 20px 20px 0px #11011f;
          --card-shadow: #11011f;
          z-index: 1;
          background: #200934;
          --card-text: #f8f7f2;
          --card-star: #f8f7f2;
          --card-name: #f8f7f2;
          --card-label: rgba(248,247,242,0.55);
          --card-avatar-bg: #f8f7f2;
          --card-avatar-text: #200934;
        }

        .review-card-5 {
          right: 2%;
          top: 255px;
          --card-transform: rotate(-4deg);
          --card-hover-transform: rotate(0deg) translateY(-10px);
          --card-hover-shadow: 20px 20px 0px #200934;
          --card-shadow: #200934;
          z-index: 2;
          background: #f8f7f2;
          --card-text: #11011f;
          --card-star: #11011f;
          --card-name: #11011f;
          --card-label: rgba(17,1,31,0.5);
          --card-avatar-bg: #200934;
          --card-avatar-text: #f8f7f2;
        }

        .review-card-6 {
          left: 50%;
          top: 320px;
          --card-transform: translateX(-50%) rotate(1deg);
          --card-hover-transform: translateX(-50%) rotate(0deg) translateY(-12px);
          --card-hover-shadow: 24px 24px 0px #11011f;
          --card-shadow: #11011f;
          z-index: 3;
          width: clamp(320px, 44%, 440px);
          background: #200934;
          box-shadow: 14px 14px 0px #11011f;
          --card-text: #f8f7f2;
          --card-star: #f8f7f2;
          --card-name: #f8f7f2;
          --card-label: rgba(248,247,242,0.55);
          --card-avatar-bg: #f8f7f2;
          --card-avatar-text: #200934;
        }

        @keyframes float1 {
          0%, 100% { transform: rotate(-6deg) translateY(0); }
          50% { transform: rotate(-5deg) translateY(-7px); }
        }

        @keyframes float2 {
          0%, 100% { transform: rotate(5deg) translateY(0); }
          50% { transform: rotate(4deg) translateY(-7px); }
        }

        @keyframes float3 {
          0%, 100% { transform: translateX(-50%) rotate(-2deg) translateY(0); }
          50% { transform: translateX(-50%) rotate(-1.5deg) translateY(-9px); }
        }

        @keyframes float4 {
          0%, 100% { transform: rotate(4deg) translateY(0); }
          50% { transform: rotate(3deg) translateY(-7px); }
        }

        @keyframes float5 {
          0%, 100% { transform: rotate(-4deg) translateY(0); }
          50% { transform: rotate(-3deg) translateY(-7px); }
        }

        @keyframes float6 {
          0%, 100% { transform: translateX(-50%) rotate(1deg) translateY(0); }
          50% { transform: translateX(-50%) rotate(0.5deg) translateY(-9px); }
        }

        .reviews-section.in-view .review-card-1 {
          animation: float1 4.5s ease-in-out infinite;
          animation-delay: 0.7s;
        }

        .reviews-section.in-view .review-card-2 {
          animation: float2 4.8s ease-in-out infinite;
          animation-delay: 0.9s;
        }

        .reviews-section.in-view .review-card-3 {
          animation: float3 5.2s ease-in-out infinite;
          animation-delay: 1.1s;
        }

        .reviews-section.in-view .review-card-4,
        .reviews-section.in-view .review-card-5,
        .reviews-section.in-view .review-card-6 {
          animation: none;
        }

        .review-card-1:hover,
        .review-card-2:hover,
        .review-card-3:hover,
        .review-card-4:hover,
        .review-card-5:hover,
        .review-card-6:hover {
          animation: none !important;
        }

        .sparkle {
          position: absolute;
          color: rgba(32,9,52,0.15);
          font-size: 1.6rem;
          pointer-events: none;
          animation: sparklePulse 2.5s ease-in-out infinite;
        }

        .sparkle-1 { top: -10px; left: 8%; }
        .sparkle-2 { bottom: 30px; right: 6%; animation-delay: 0.7s; }
        .sparkle-3 { top: 40px; right: 22%; font-size: 1rem; animation-delay: 1.2s; }
        .sparkle-4 { bottom: 120px; left: 4%; font-size: 1.2rem; animation-delay: 0.4s; }
        .sparkle-5 { top: 50%; left: 50%; font-size: 0.8rem; animation-delay: 1.6s; opacity: 0.4; }

        @keyframes sparklePulse {
          0%, 100% { opacity: 0.2; transform: scale(0.8) rotate(0deg); }
          50% { opacity: 0.7; transform: scale(1.15) rotate(20deg); }
        }

        @media (max-width: 900px) {
          .reviews-cards {
            min-height: auto;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 36px;
          }

          .review-card {
            position: relative;
            width: 100%;
            max-width: 420px;
            left: auto !important;
            right: auto !important;
            top: auto !important;
            opacity: 0;
            transform: translateY(30px);
          }

          .reviews-section.in-view .review-card {
            opacity: 1;
            transform: translateY(0);
            transform: var(--card-transform);
          }

          .review-card-1 { --card-transform: rotate(-3deg); }
          .review-card-2 { --card-transform: rotate(2deg); }
          .review-card-3 { --card-transform: rotate(-1deg); width: 100%; max-width: 420px; }
          .review-card-4 { --card-transform: rotate(2deg); }
          .review-card-5 { --card-transform: rotate(-2deg); }
          .review-card-6 { --card-transform: rotate(1deg); width: 100%; max-width: 420px; }

          .reviews-section.in-view .review-card-1,
          .reviews-section.in-view .review-card-2,
          .reviews-section.in-view .review-card-3,
          .reviews-section.in-view .review-card-4,
          .reviews-section.in-view .review-card-5,
          .reviews-section.in-view .review-card-6 {
            animation: none !important;
          }

          .review-card-1:hover,
          .review-card-2:hover,
          .review-card-3:hover,
          .review-card-4:hover,
          .review-card-5:hover,
          .review-card-6:hover {
            animation: none !important;
          }
        }

        @media (max-width: 640px) {
          .food-menu-modal { padding: 32px 20px; }
        .menu-item {
            flex-direction: column;
            gap: 8px;
            padding: 14px 16px;
          }
          .menu-item-info { margin-right: 0; }
          .menu-item-price { align-self: flex-start; }
        }

        .contact-footer {
          position: relative;
          z-index: 10;
          background: #11011f;
          overflow: hidden;
          padding: 80px 5% 60px;
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }

        .contact-footer.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .footer-bg-text {
          position: absolute;
          bottom: -0.08em;
          left: 50%;
          transform: translateX(-50%);
          font-size: clamp(8rem, 25vw, 22rem);
          font-weight: 900;
          color: rgba(248,247,242,0.06);
          white-space: nowrap;
          pointer-events: none;
          line-height: 0.85;
          letter-spacing: 0.03em;
          user-select: none;
        }

        .footer-inner {
          position: relative;
          display: grid;
          grid-template-columns: 1.5fr 1fr 1fr;
          gap: 40px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .footer-logo {
          margin-bottom: 16px;
        }

        .footer-logo-mark {
          font-size: 2rem;
          font-weight: 900;
          color: #f8f7f2;
          letter-spacing: 0.05em;
        }

        .footer-tagline {
          font-size: 0.95rem;
          color: rgba(248,247,242,0.7);
          line-height: 1.6;
          margin-bottom: 24px;
          max-width: 280px;
        }

        .footer-social {
          display: flex;
          gap: 12px;
        }

        .social-btn {
          background: rgba(248,247,242,0.12);
          border: 1px solid rgba(248,247,242,0.2);
          color: #f8f7f2;
          padding: 8px 20px;
          border-radius: 999px;
          font-size: 0.85rem;
          cursor: pointer;
          transition: background 0.3s, border-color 0.3s;
        }

        .social-btn:hover {
          background: rgba(248,247,242,0.2);
          border-color: rgba(248,247,242,0.35);
        }

        .footer-heading {
          font-size: 0.8rem;
          font-weight: 700;
          color: rgba(248,247,242,0.5);
          text-transform: uppercase;
          letter-spacing: 0.12em;
          margin-bottom: 20px;
        }

        .footer-link {
          display: block;
          color: #f8f7f2;
          text-decoration: none;
          font-size: 0.95rem;
          margin-bottom: 12px;
          transition: opacity 0.3s;
        }

        .footer-link:hover {
          opacity: 0.7;
        }

        .footer-text {
          color: rgba(248,247,242,0.8);
          font-size: 0.9rem;
          line-height: 1.7;
          margin-bottom: 12px;
        }

        @media (max-width: 768px) {
          .footer-inner {
            grid-template-columns: 1fr;
            gap: 36px;
          }
          .footer-col:first-child {
            order: -1;
          }
          .contact-footer {
            padding: 60px 5% 40px;
          }
        }
      `}</style>
    </>
  )
}
