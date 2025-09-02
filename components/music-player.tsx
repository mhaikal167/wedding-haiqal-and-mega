"use client"
import { useEffect, useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Music } from "lucide-react"

type MusicPlayerProps = {
  songTitle: string
  artist: string
  src: string // link ke file lagu
}

export function MusicPlayer({ songTitle, artist, src }: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const togglePlay = () => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }

    useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play().then(() => {
        setIsPlaying(true)
      }).catch((err) => {
        console.log("Autoplay diblokir browser:", err)
      })
    }
  }, [])

  return (
    <section className="py-8 px-4 bg-gradient-to-r from-pink-100 to-rose-100">
      <div className="max-w-2xl mx-auto">
        <Card className="bg-white/80 backdrop-blur-sm">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Music className="w-8 h-8 text-pink-600" />
                <div>
                  <h3 className="font-semibold">Lagu Favorit Kami</h3>
                  <p className="text-sm text-muted-foreground">
                    {songTitle} - {artist}
                  </p>
                </div>
              </div>
              <Button
                variant={isPlaying ? "default" : "outline"}
                size="sm"
                onClick={togglePlay}
                className="min-w-[80px]"
              >
                {isPlaying ? "Pause" : "Play"}
              </Button>
            </div>
            {/* Elemen audio */}
            <audio
              ref={audioRef}
              src={src}
              onEnded={() => setIsPlaying(false)} 
            />
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
