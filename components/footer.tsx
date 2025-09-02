"use client"

import { Heart, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface FooterProps {
  groomName: string
  brideName: string
  onShare: () => void
}

export function Footer({ groomName, brideName, onShare }: FooterProps) {
  return (
    <footer className="py-12 px-4 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-8">
          <Heart className="w-12 h-12 mx-auto mb-4 text-pink-400 animate-pulse" />
          <h3 className="text-2xl font-bold mb-2">
            {groomName} & {brideName}
          </h3>
          <p className="text-gray-300 text-lg mb-4">Terima kasih telah menjadi bagian dari kebahagiaan kami</p>

          <div className="flex justify-center space-x-4 mb-6">
            <Button
              size="sm"
              variant="outline"
              className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
              onClick={onShare}
            >
              <Share2 className="w-4 h-4 mr-2" />
              Bagikan
            </Button>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-6">
          <p className="text-sm text-gray-400">© 2025 - Dibuat dengan ❤️ untuk berbagi kebahagiaan</p>
          <p className="text-xs text-gray-500 mt-2">
            {groomName} & {brideName} Wedding Announcement
          </p>
        </div>
      </div>
    </footer>
  )
}
