"use client"

import { useState, useEffect } from "react"
import { Clock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface CountdownTimerProps {
  targetDate: string
  title: string
  subtitle: string
}

export function CountdownTimer({ targetDate, title, subtitle }: CountdownTimerProps) {
  const [timeToTarget, setTimeToTarget] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const target = new Date(targetDate).getTime()

    const updateCountdown = () => {
      const now = new Date().getTime()
      const distance = target - now

      if (distance > 0) {
        setTimeToTarget({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        })
      }
    }

    updateCountdown()
    const interval = setInterval(updateCountdown, 1000)
    return () => clearInterval(interval)
  }, [targetDate])

  return (
    <section className="py-16 px-4 bg-gradient-to-r from-pink-50 to-rose-50">
      <div className="max-w-4xl mx-auto text-center">
        <Clock className="w-12 h-12 mx-auto mb-4 text-pink-600" />
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">{title}</h2>
        <p className="text-gray-600 text-lg mb-8">{subtitle}</p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
          {[
            { label: "Hari", value: timeToTarget.days },
            { label: "Jam", value: timeToTarget.hours },
            { label: "Menit", value: timeToTarget.minutes },
            { label: "Detik", value: timeToTarget.seconds },
          ].map((item, index) => (
            <Card key={index} className="bg-white/80 backdrop-blur-sm border-pink-200">
              <CardContent className="pt-6 text-center">
                <div className="text-3xl md:text-4xl font-bold text-pink-600 mb-2">
                  {item.value.toString().padStart(2, "0")}
                </div>
                <div className="text-sm text-gray-600 font-medium">{item.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
