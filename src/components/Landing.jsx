import React, { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Landing() {
  const scrollToNext = () => {
    const next = document.querySelector('.functions-section')
    if (next) next.scrollIntoView({ behavior: 'smooth' })
  }

  // Title animation
  const title = "Akshat weds Samiksha"
  const letters = title.split("")

  // Background images
  const images = [
    'cover1.jpg',
    
    'cover3.jpg',
    'cover2.jpg',
    'cover4.jpg',
    'cover5.jpg'
  ]

  const [index, setIndex] = useState(0)
  const slideshowInterval = 2500 // 2.5 seconds
  const audioRef = useRef(null)

  // Auto change background
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prev => (prev + 1) % images.length)
    }, slideshowInterval)
    return () => clearInterval(interval)
  }, [])

  // Autoplay music
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.4
      audioRef.current.loop = true
      audioRef.current.play().catch(() => {
        // autoplay might be blocked; user interaction needed
        console.log("Music will start after user interaction")
      })
    }
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
  }

  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <section className="hero-section-full">

      {/* Audio */}
      <audio ref={audioRef} src="background-music.mp3" />

      {/* Animated background slideshow */}
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          className="hero-bg-full"
          style={{ backgroundImage: `url(${images[index]})` }}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        />
      </AnimatePresence>

      <div className="hero-overlay-full" />
      <div className="site-hashtag">#ASweWished</div>

      {/* Text content */}
      <motion.div
        className="hero-text-bottom"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1
          className="landing-title"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {letters.map((letter, i) => (
            <motion.span key={i} variants={letterVariants}>
              {letter === " " ? "\u00A0" : letter}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p
          className="landing-date"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          12th March, 2026
        </motion.p>

        <motion.button
          className="scroll-arrow"
          onClick={scrollToNext}
          aria-label="Scroll to next section"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 8, 0] }}
          transition={{
            opacity: { delay: 1.5 },
            y: { repeat: Infinity, duration: 1.5 }
          }}
        >
          ↓
        </motion.button>

        {/* Slide dots */}
        <div className="slide-dots">
          {images.map((_, i) => (
            <span
              key={i}
              className={`dot ${i === index ? 'active' : ''}`}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
      </motion.div>

      {/* Add CSS inline or in your CSS file */}
      <style>{`
        .slide-dots {
          display: flex;
          justify-content: center;
          margin-top: 16px;
          gap: 8px;
        }
        .slide-dots .dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: rgba(255,255,255,0.5);
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .slide-dots .dot.active {
          width: 14px;
          height: 14px;
          background: rgba(255,255,255,0.9);
        }
      `}</style>

    </section>
  )
}
