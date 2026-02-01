import React, { useEffect, useRef, useState } from 'react'

export default function LazyLoadImage({ src, alt = '', className = '', bg = false, style = {}, width, height }) {
  const ref = useRef(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (!ref.current) return
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setLoaded(true)
            io.unobserve(entry.target)
          }
        })
      }, { rootMargin: '200px' })
      io.observe(ref.current)
      return () => io.disconnect()
    } else {
      // fallback: load immediately
      setLoaded(true)
    }
  }, [])

  if (bg) {
    return (
      <div
        ref={ref}
        className={`${className} lazy-bg ${loaded ? 'loaded' : ''}`}
        style={{
          ...style,
          backgroundImage: loaded ? `url(${src})` : undefined
        }}
        role="img"
        aria-label={alt}
      />
    )
  }

  const placeholder = 'data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="10" height="6"></svg>'
  return (
    <img
      ref={ref}
      src={loaded ? src : placeholder}
      data-src={src}
      alt={alt}
      className={`${className} lazy-img ${loaded ? 'loaded' : ''}`}
      loading="lazy"
      decoding="async"
      width={width}
      height={height}
      style={style}
    />
  )
}
