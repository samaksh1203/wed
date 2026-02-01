import React, { useEffect, useRef, useState } from 'react'
import { Howl } from 'howler'

export default function MusicPlayer() {
  const soundRef = useRef(null)
  const [muted, setMuted] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [needTap, setNeedTap] = useState(false)

  useEffect(() => {
    soundRef.current = new Howl({
      src: ['/sample-song.mp3'],
      html5: true,
      loop: true,
      volume: 0.6,
      onplay: () => { setPlaying(true); setNeedTap(false) },
      onpause: () => setPlaying(false),
      onloaderror: () => console.warn('Audio load error')
    })

    // attempt autoplay
    const tryPlay = async () => {
      try {
        await soundRef.current.play()
      } catch {
        // browser blocked autoplay with sound
        setNeedTap(true)
      }
    }
    tryPlay()

    return () => soundRef.current && soundRef.current.unload()
  }, [])

  useEffect(() => {
    if (!soundRef.current) return
    soundRef.current.mute(muted)
  }, [muted])

  const enableAudio = () => {
    if (!soundRef.current) return
    soundRef.current.play()
    setMuted(false)
    setNeedTap(false)
  }

  return (
    <>
      {/* Audio UI removed from top; keep only the tap overlay if autoplay is blocked */}
      {needTap && (
        <div className="audio-tap-overlay" onClick={enableAudio}>
          <div className="tap-card">
            Tap to enable audio
          </div>
        </div>
      )}
    </>
  )
}
