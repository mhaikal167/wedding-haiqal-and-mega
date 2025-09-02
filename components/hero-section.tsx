"use client"

import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

interface HeroSectionProps {
  onScrollToMessages: () => void
  onShare: () => void
}

export function HeroSection({ onScrollToMessages, onShare }: HeroSectionProps) {
    const [guestName, setGuestName] = useState("Tamu Undangan");
     useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const to = params.get("to")

    if (to) {
      const formatted = decodeURIComponent(to)
        .replace(/-/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase())

      setGuestName(formatted)
    }
  }, [])
  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden corner-florals"
      style={{
        background: "linear-gradient(135deg, #fefcf8 0%, #fdf9f3 25%, #fcf7ee 50%, #fbf5e9 75%, #faf3e4 100%)",
      }}
    >
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50/30 via-orange-50/20 to-yellow-50/40"></div>
        <div className="absolute top-0 left-0 w-full h-full opacity-20">
          <div className="absolute top-10 left-10 w-32 h-32 bg-amber-200/30 rounded-full blur-3xl"></div>
          <div className="absolute top-32 right-20 w-24 h-24 bg-orange-200/25 rounded-full blur-2xl"></div>
          <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-yellow-100/40 rounded-full blur-3xl"></div>
          <div className="absolute bottom-32 right-1/3 w-28 h-28 bg-amber-100/35 rounded-full blur-2xl"></div>
        </div>
      </div>

      <div className="relative z-10 text-center px-4 max-w-md mx-auto">
        <p className="text-amber-700 text-lg font-medium mb-4 tracking-wide">Pengumuman Pernikahan</p>

        <h1 className="text-5xl font-serif text-amber-800 mb-8 leading-tight">
          <span className="block">Haiqal</span>
          <span className="text-3xl font-sans text-amber-600 my-2">&</span>
          <span className="block">Mega</span>
        </h1>

        <div className="relative mb-8">
          <div className="floral-frame">
            <div className="w-64 h-64 mx-auto rounded-full overflow-hidden border-4 border-white shadow-xl bg-white p-1 relative z-10">
              <img
                src="/images/lamaran-3.jpg"
                alt="Justin & Sisca"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          </div>

          <div className="absolute -top-4 -left-8 z-20">
            <svg width="80" height="80" viewBox="0 0 80 80" className="text-amber-600">
              <g transform="translate(10,10)">
                <path d="M30 20 Q35 15 40 20 Q35 25 30 20" fill="currentColor" opacity="0.8" />
                <path d="M25 25 Q30 20 35 25 Q30 30 25 25" fill="currentColor" opacity="0.7" />
                <path d="M35 30 Q40 25 45 30 Q40 35 35 30" fill="currentColor" opacity="0.6" />
                <circle cx="32" cy="25" r="2" fill="#92400e" />
                <circle cx="38" cy="28" r="1.5" fill="#d97706" />
              </g>
            </svg>
          </div>

          <div className="absolute -bottom-6 -right-6 z-20">
            <svg width="100" height="100" viewBox="0 0 100 100" className="text-amber-500">
              <g transform="translate(20,20)">
                <path d="M20 30 Q25 25 30 30 Q25 35 20 30" fill="currentColor" opacity="0.8" />
                <path d="M30 35 Q35 30 40 35 Q35 40 30 35" fill="currentColor" opacity="0.7" />
                <path d="M40 25 Q45 20 50 25 Q45 30 40 25" fill="currentColor" opacity="0.6" />
                <path d="M25 40 Q30 35 35 40 Q30 45 25 40" fill="currentColor" opacity="0.5" />
                <circle cx="28" cy="33" r="2" fill="#92400e" />
                <circle cx="42" cy="28" r="1.5" fill="#d97706" />
                <circle cx="32" cy="42" r="1" fill="#f59e0b" />
              </g>
            </svg>
          </div>

          <div className="absolute top-1/2 -left-12 z-20">
            <svg width="60" height="60" viewBox="0 0 60 60" className="text-amber-400">
              <g transform="translate(5,5)">
                <path d="M15 20 Q20 15 25 20 Q20 25 15 20" fill="currentColor" opacity="0.6" />
                <path d="M20 25 Q25 20 30 25 Q25 30 20 25" fill="currentColor" opacity="0.5" />
                <circle cx="22" cy="22" r="1.5" fill="#d97706" />
              </g>
            </svg>
          </div>

          <div className="absolute top-8 right-4 w-2 h-2 bg-amber-500 rounded-full opacity-60"></div>
          <div className="absolute bottom-12 left-2 w-1.5 h-1.5 bg-amber-600 rounded-full opacity-50"></div>
          <div className="absolute top-20 left-8 w-1 h-1 bg-amber-700 rounded-full opacity-40"></div>
        </div>

        <div className="mb-6 px-4">
          <p className="text-amber-700 text-sm leading-relaxed">
            Dengan penuh rasa syukur, kami mengumumkan bahwa kami telah menikah. Terima kasih atas doa dan dukungan yang
            telah diberikan.
          </p>
        </div>

         <div className="mb-8">
        <p className="text-amber-700 text-xl font-medium">Kepada</p>
        <p className="text-amber-800 text-2xl font-semibold">{guestName}</p>
      </div>
     
      <div className="mx-auto flex flex-col items-center justify-center w-full max-w-xs cursor-pointer">
          <div className="animate-bounce mb-2">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <circle cx="24" cy="24" r="24" fill="#92400e" opacity="0.12" />
              <path
                d="M24 16v16M24 32l-6-6M24 32l6-6"
                stroke="#92400e"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <span className="text-amber-700 text-lg font-medium">
            Scroll untuk lihat pengumuman
          </span>
        </div>
      </div>
    </section>
  )
}
