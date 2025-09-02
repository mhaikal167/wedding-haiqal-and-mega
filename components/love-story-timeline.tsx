"use client"

import { Calendar, Heart } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface TimelineEvent {
  year: string
  title: string
  description: string
}

interface LoveStoryTimelineProps {
  events: TimelineEvent[]
}

export function LoveStoryTimeline({ events }: LoveStoryTimelineProps) {
  return (
    <section className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <Calendar className="w-12 h-12 mx-auto mb-4 text-primary" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Perjalanan Cinta Kami</h2>
          <p className="text-muted-foreground text-lg">Dari pertemuan pertama hingga hari bahagia</p>
        </div>

        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-pink-300 to-rose-400 rounded-full"></div>

          {events.map((event, index) => (
            <div
              key={index}
              className={`relative flex items-center mb-12 ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
            >
              <div className={`w-1/2 ${index % 2 === 0 ? "pr-8 text-right" : "pl-8 text-left"}`}>
                <Card className="hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="pt-6">
                    <div className="text-2xl font-bold text-pink-600 mb-2">{event.year}</div>
                    <h3 className="text-xl font-semibold mb-3">{event.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{event.description}</p>
                  </CardContent>
                </Card>
              </div>

              <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-pink-500 rounded-full border-4 border-white shadow-lg z-10">
                <Heart className="w-3 h-3 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
