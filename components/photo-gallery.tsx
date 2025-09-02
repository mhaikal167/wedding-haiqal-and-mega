"use client"

import { useState, useEffect } from "react"
import { Camera } from "lucide-react"
import { Card } from "@/components/ui/card"

interface Photo {
  id: number
  src: string
  alt: string
}

interface PhotoGalleryProps {
  photos: Photo[]
}

export function PhotoGallery({ photos }: PhotoGalleryProps) {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhotoIndex((prev) => (prev + 1) % photos.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [photos.length])

  return (
    <section className="py-16 px-4 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-12">
          <Camera className="w-12 h-12 mx-auto mb-4 text-primary" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Galeri Foto</h2>
          <p className="text-muted-foreground text-lg">
            Momen-momen indah perjalanan kami
          </p>
        </div>

        {/* Main Photo */}
        <div className="mb-8">
          <Card className="overflow-hidden">
            <div className="relative w-full h-96 md:h-[500px]">
              <img
                src={photos[currentPhotoIndex]?.src || "/placeholder.svg"}
                alt={photos[currentPhotoIndex]?.alt || "Wedding Photo"}
                className="w-full h-full object-cover transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <p className="text-lg font-semibold">
                  {photos[currentPhotoIndex]?.alt}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Thumbnails */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
          {photos.map((photo, index) => (
            <Card
              key={photo.id}
              className={`overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 ${
                index === currentPhotoIndex ? "ring-4 ring-pink-500" : ""
              }`}
              onClick={() => setCurrentPhotoIndex(index)}
            >
              <div className="w-full h-32">
                <img
                  src={photo.src || "/placeholder.svg"}
                  alt={photo.alt}
                  className="w-full h-full object-cover"
                />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
