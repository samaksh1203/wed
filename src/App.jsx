import React, { useState, useEffect } from 'react'
import Landing from './components/Landing.jsx'
import MusicPlayer from './components/MusicPlayer.jsx'
import VenueMap from './components/Map.jsx'
import { motion } from 'framer-motion'

export default function App() {
  const [playing, setPlaying] = useState(false)
  const [bgLoaded, setBgLoaded] = useState(false)

  // Preload background image
  useEffect(() => {
    const img = new Image()
    img.src = 'background.jpg'
    img.onload = () => setBgLoaded(true)
  }, [])

  const events = [
    {
      key: 'phoolon',
      title: 'Phoolon ki Haldi',
      date: '11 Mar 2026',
      time: '11:00 AM onwards',
      note: 'Dress code: Floral and pop colors',
      img: 'haldi.jpg'
    },
    {
      key: 'mehfil',
      title: 'Mehfil-e-Sangeet',
      date: '11 Mar 2026',
      time: '7:00 PM onwards',
      note: 'Dress code: Glitters and Glams / Indo-Western',
      img: 'mehfil.jpg'
    },
    {
      key: 'mayra',
      title: 'Mayra',
      date: '12 Mar 2026',
      time: '9:00 AM onwards',
      note: 'Dress code: Red & Whites / Red Chunri',
      img: 'mayra.jpg'
    },
    {
      key: 'baraat',
      title: 'Baraat',
      date: '12 Mar 2026',
      time: '12:30 PM onwards',
      note: 'Dress code: Traditionals',
      img: 'baraat.jpg'
    },
    {
      key: 'phera',
      title: 'Phera',
      date: '12 Mar 2026',
      time: '4:00 PM onwards',
      note: 'Dress code: Traditionals',
      img: 'phera.jpg'
    },
    {
      key: 'reception',
      title: 'Reception',
      date: '12 Mar 2026',
      time: '7:30 PM onwards',
      note: '',
      img: 'reception.jpg'
    }
  ]

  const address = {
    text: 'Bharat Hotel, Tapola Rd, near Glen Ogale Lake, Mahabaleshwar, Maharashtra 412806',
    mapsUrl: 'https://maps.app.goo.gl/nC2kJ2J3UnnG1vRTA',
    lat: 17.9193,
    lng: 73.6619
  }

  const contacts = [
    { name: 'Sunil Jain', phone: '8603110392' },
    { name: 'Deepak Jain', phone: '9260996515' },
    { name: 'Khushal Jain', phone: '7209716023' }
  ]

  const parents = {
    bride: 'Vaishali Rajesh Godha',
    groom: 'Rajul Sunil Patni'
  }

  const container = { 
    hidden: {}, 
    show: { 
      transition: { 
        staggerChildren: 0.2,
        delayChildren: 0 
      } 
    } 
  }
  
  const cardVariant = { 
    hidden: { 
      opacity: 0, 
      y: 80,
      scale: 0.85
    }, 
    show: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { 
        duration: 0.6,
        ease: "easeOut" 
      } 
    }, 
    hover: { 
      scale: 1.05,
      y: -10,
      transition: { duration: 0.3 } 
    } 
  }

  // Show loading screen until background is loaded
  if (!bgLoaded) {
    return (
      <div className="loading-screen">
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <div className="app smooth-scroll">
      <MusicPlayer />
      <Landing />

      {/* Functions page: animate on scroll with stagger */}
      <motion.section
        className="functions-section events-wrap"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.05 }}
      >
        {events.map((ev, i) => {
          const side = i % 2 === 0 ? 'left' : 'right'
          return (
            <motion.article className={`event-card ${side}`} key={ev.key} variants={cardVariant} whileHover="hover">
              <div className="card-bg" style={{ backgroundImage: `url(${ev.img})` }} />
              <div className="event-media">
                <img src={ev.img} alt={ev.title} className="event-img" />
              </div>
              <div className="event-body">
                <h3>{ev.title}</h3>
                <p className="meta">{ev.date} • {ev.time}</p>
                <p className="note">{ev.note}</p>
              </div>
            </motion.article>
          )
        })}
      </motion.section>

      {/* Venue page */}
      <motion.section 
        className="venue page section"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h2 initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          Venue
        </motion.h2>
        <motion.article 
          className="event-card venue-card"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="map-media">
            <div className="map-box">
              <VenueMap lat={address.lat} lng={address.lng} address={address.text} mapsUrl={address.mapsUrl} />
              <a className="map-link-overlay" href={address.mapsUrl} target="_blank" rel="noreferrer">Open in Google Maps</a>
            </div>
          </div>
          <div className="event-body">
            <h3 className="venue-title">{address.text}</h3>
          </div>
        </motion.article>
      </motion.section>

      {/* Bottom page */}
      <motion.footer 
        className="section footer centered-footer" 
        initial={{ opacity: 0, y: 30 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
      >
        <p className="invite-message">We cordially invite you to grace the auspicious wedding ceremony of Akshat and Samiksha. Your presence and blessings will make the occasion truly special. 🙏🏽</p>
        <h3>Patni Family</h3>
        <div className="address centered">
          <h4>RSVP</h4>
          {contacts.map(c => (
            <p key={c.phone} className="muted">
              <span className="contact-name">{c.name} — </span>
              <a href={`tel:+91${c.phone}`} className="tel-link">+91-{c.phone}</a>
            </p>
          ))}
        </div>
      </motion.footer>
    </div>
  )
}
