"use client"

import type React from "react"

import { useState, useEffect } from "react"
import {
  Heart,
  MessageCircle,
  Gift,
  Calendar,
  MapPin,
  Music,
  Camera,
  Clock,
  Share2,
  Users,
  Search,
  Filter,
  ThumbsUp,
  Smile,
  Star,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

interface Message {
  id: number
  name: string
  message: string
  timestamp: string
  likes: number
  category: "blessing" | "memory" | "wish" | "general"
  reactions: { [key: string]: number }
}

interface TimelineEvent {
  year: string
  title: string
  description: string
}

interface Photo {
  id: number
  src: string
  alt: string
}

export function WeddingAnnouncement() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      name: "Sarah & David",
      message: "Selamat atas pernikahan kalian! Semoga selalu bahagia dan diberkati dalam rumah tangga yang baru. ❤️",
      timestamp: "2 jam yang lalu",
      likes: 12,
      category: "blessing",
      reactions: { "❤️": 8, "🎉": 3, "🤲": 1 },
    },
    {
      id: 2,
      name: "Keluarga Besar",
      message:
        "Alhamdulillah, akhirnya kalian resmi menjadi suami istri. Semoga menjadi keluarga yang sakinah, mawaddah, warahmah.",
      timestamp: "5 jam yang lalu",
      likes: 18,
      category: "blessing",
      reactions: { "❤️": 10, "🤲": 5, "🎉": 3 },
    },
    {
      id: 3,
      name: "Teman Kampus",
      message:
        "Masih ingat waktu kalian pertama kali ketemu di perpustakaan! Senang banget lihat kalian sampai ke jenjang pernikahan 😊",
      timestamp: "1 hari yang lalu",
      likes: 7,
      category: "memory",
      reactions: { "😊": 4, "❤️": 2, "👏": 1 },
    },
  ])

  const [newMessage, setNewMessage] = useState({ name: "", message: "", category: "general" as Message["category"] })
  const [showSawer, setShowSawer] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)
  const [timeToAnniversary, setTimeToAnniversary] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState<Message["category"] | "all">("all")
  const [showReactionPicker, setShowReactionPicker] = useState<number | null>(null)

  const timeline: TimelineEvent[] = [
    {
      year: "2020",
      title: "Pertama Bertemu",
      description: "Kami bertemu di kampus dan langsung merasa ada chemistry yang istimewa",
    },
    {
      year: "2022",
      title: "Mulai Pacaran",
      description: "Setelah 2 tahun berteman, kami memutuskan untuk menjalin hubungan yang serius",
    },
    {
      year: "2024",
      title: "Lamaran",
      description: "Ahmad melamar Siti di hadapan kedua keluarga dengan penuh kebahagiaan",
    },
    {
      year: "2025",
      title: "Pernikahan",
      description: "Alhamdulillah, kami resmi menjadi suami istri pada 15 Januari 2025",
    },
  ]

  const photos: Photo[] = [
    { id: 1, src: "/romantic-wedding-couple-portrait.png", alt: "Wedding Portrait 1" },
    { id: 2, src: "/wedding-ceremony-moment.png", alt: "Wedding Ceremony" },
    { id: 3, src: "/couple-engagement.png", alt: "Engagement Photo" },
    { id: 4, src: "/wedding-reception.png", alt: "Wedding Reception" },
    { id: 5, src: "/couple-romantic-outdoor-photo.png", alt: "Romantic Photo" },
    { id: 6, src: "/wedding-family-group-photo.png", alt: "Family Photo" },
  ]

  useEffect(() => {
    const targetDate = new Date("2026-01-15T00:00:00").getTime()

    const updateCountdown = () => {
      const now = new Date().getTime()
      const distance = targetDate - now

      if (distance > 0) {
        setTimeToAnniversary({
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
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhotoIndex((prev) => (prev + 1) % photos.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [photos.length])

  const handleSubmitMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (newMessage.name && newMessage.message) {
      const message: Message = {
        id: messages.length + 1,
        name: newMessage.name,
        message: newMessage.message,
        timestamp: "Baru saja",
        likes: 0,
        category: newMessage.category,
        reactions: {},
      }
      setMessages([message, ...messages])
      setNewMessage({ name: "", message: "", category: "general" })
    }
  }

  const handleLike = (messageId: number) => {
    setMessages(messages.map((msg) => (msg.id === messageId ? { ...msg, likes: msg.likes + 1 } : msg)))
  }

  const handleReaction = (messageId: number, emoji: string) => {
    setMessages(
      messages.map((msg) =>
        msg.id === messageId
          ? {
              ...msg,
              reactions: {
                ...msg.reactions,
                [emoji]: (msg.reactions[emoji] || 0) + 1,
              },
            }
          : msg,
      ),
    )
    setShowReactionPicker(null)
  }

  const filteredMessages = messages.filter((message) => {
    const matchesSearch =
      message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.message.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === "all" || message.category === filterCategory
    return matchesSearch && matchesCategory
  })

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "Pengumuman Pernikahan Ahmad & Siti",
        text: "Alhamdulillah, kami telah resmi menjadi suami istri!",
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert("Link berhasil disalin!")
    }
  }

  const reactionEmojis = ["❤️", "😊", "🎉", "👏", "🤲", "🥰", "✨", "🌟"]
  const categoryLabels = {
    blessing: "Doa & Berkah",
    memory: "Kenangan",
    wish: "Harapan",
    general: "Umum",
  }

  return (
    <div className="min-h-screen bg-background">
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000"
          style={{
            backgroundImage: `url('/romantic-wedding-couple-portrait-elegant-outdoor-s.png')`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50"></div>
        </div>

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <Heart
              key={i}
              className={`absolute text-pink-300/30 animate-bounce`}
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + (i % 3) * 20}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${3 + i * 0.5}s`,
              }}
              size={16 + i * 4}
            />
          ))}
        </div>

        <div className="relative z-10 text-center text-white px-4 max-w-4xl animate-fade-in">
          <div className="mb-6">
            <Heart className="w-16 h-16 mx-auto mb-4 text-pink-300 animate-pulse" />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-4 text-balance animate-slide-up">Kami Sudah Menikah!</h1>
          <p className="text-xl md:text-2xl mb-6 text-balance animate-slide-up animation-delay-200">
            Alhamdulillah, kami telah resmi menjadi suami istri
          </p>
          <div className="text-lg md:text-xl mb-8 animate-slide-up animation-delay-400">
            <p className="mb-2 text-2xl font-semibold">Ahmad & Siti</p>
            <p className="text-pink-300 text-xl">15 Januari 2025</p>
          </div>
          <p className="text-lg text-balance max-w-2xl mx-auto mb-8 animate-slide-up animation-delay-600">
            Terima kasih atas doa dan dukungan dari keluarga dan sahabat. Mari berbagi kebahagiaan bersama kami!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up animation-delay-800">
            <Button
              size="lg"
              className="bg-pink-600 hover:bg-pink-700"
              onClick={() => document.getElementById("ucapan")?.scrollIntoView({ behavior: "smooth" })}
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Kirim Ucapan
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-black bg-transparent"
              onClick={handleShare}
            >
              <Share2 className="w-5 h-5 mr-2" />
              Bagikan
            </Button>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
          <div className="flex flex-col items-center">
            <span className="text-sm mb-2">Scroll untuk melihat lebih</span>
            <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-gradient-to-r from-pink-50 to-rose-50">
        <div className="max-w-4xl mx-auto text-center">
          <Clock className="w-12 h-12 mx-auto mb-4 text-pink-600" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">Menuju Anniversary Pertama</h2>
          <p className="text-gray-600 text-lg mb-8">Hitung mundur menuju momen spesial kami</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            {[
              { label: "Hari", value: timeToAnniversary.days },
              { label: "Jam", value: timeToAnniversary.hours },
              { label: "Menit", value: timeToAnniversary.minutes },
              { label: "Detik", value: timeToAnniversary.seconds },
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

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Calendar className="w-12 h-12 mx-auto mb-4 text-primary" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Perjalanan Cinta Kami</h2>
            <p className="text-muted-foreground text-lg">Dari pertemuan pertama hingga hari bahagia</p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-pink-300 to-rose-400 rounded-full"></div>

            {timeline.map((event, index) => (
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

      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <Camera className="w-12 h-12 mx-auto mb-4 text-primary" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Galeri Foto</h2>
            <p className="text-muted-foreground text-lg">Momen-momen indah perjalanan kami</p>
          </div>

          <div className="mb-8">
            <Card className="overflow-hidden">
              <div className="relative h-96 md:h-[500px]">
                <img
                  src={photos[currentPhotoIndex].src || "/placeholder.svg"}
                  alt={photos[currentPhotoIndex].alt}
                  className="w-full h-full object-cover transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="text-lg font-semibold">{photos[currentPhotoIndex].alt}</p>
                </div>
              </div>
            </Card>
          </div>

          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {photos.map((photo, index) => (
              <Card
                key={photo.id}
                className={`overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 ${
                  index === currentPhotoIndex ? "ring-4 ring-pink-500" : ""
                }`}
                onClick={() => setCurrentPhotoIndex(index)}
              >
                <div className="aspect-square">
                  <img src={photo.src || "/placeholder.svg"} alt={photo.alt} className="w-full h-full object-cover" />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-8 px-4 bg-gradient-to-r from-pink-100 to-rose-100">
        <div className="max-w-2xl mx-auto">
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Music className="w-8 h-8 text-pink-600" />
                  <div>
                    <h3 className="font-semibold">Lagu Favorit Kami</h3>
                    <p className="text-sm text-muted-foreground">Perfect - Ed Sheeran</p>
                  </div>
                </div>
                <Button
                  variant={isPlaying ? "default" : "outline"}
                  size="sm"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="min-w-[80px]"
                >
                  {isPlaying ? "Pause" : "Play"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="ucapan" className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <MessageCircle className="w-12 h-12 mx-auto mb-4 text-primary" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Buku Tamu Digital</h2>
            <p className="text-muted-foreground text-lg">Bagikan ucapan, kenangan, dan doa terbaik untuk kami</p>
          </div>

          <Card className="mb-12 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-pink-50 to-rose-50">
              <CardTitle className="flex items-center">
                <Heart className="w-5 h-5 mr-2 text-pink-600" />
                Tulis Ucapan
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <form onSubmit={handleSubmitMessage} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Nama</Label>
                    <Input
                      id="name"
                      value={newMessage.name}
                      onChange={(e) => setNewMessage({ ...newMessage, name: e.target.value })}
                      placeholder="Masukkan nama Anda"
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="category">Kategori</Label>
                    <select
                      id="category"
                      value={newMessage.category}
                      onChange={(e) =>
                        setNewMessage({ ...newMessage, category: e.target.value as Message["category"] })
                      }
                      className="mt-1 w-full px-3 py-2 border border-input bg-background rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                      <option value="general">Umum</option>
                      <option value="blessing">Doa & Berkah</option>
                      <option value="memory">Kenangan</option>
                      <option value="wish">Harapan</option>
                    </select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="message">Ucapan</Label>
                  <Textarea
                    id="message"
                    value={newMessage.message}
                    onChange={(e) => setNewMessage({ ...newMessage, message: e.target.value })}
                    placeholder="Tulis ucapan selamat, kenangan indah, atau doa untuk kami..."
                    rows={4}
                    required
                    className="mt-1"
                  />
                </div>
                <Button type="submit" className="w-full bg-pink-600 hover:bg-pink-700">
                  <Heart className="w-4 h-4 mr-2" />
                  Kirim Ucapan
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="mb-8 space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Cari ucapan atau nama..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value as Message["category"] | "all")}
                  className="px-3 py-2 border border-input bg-background rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="all">Semua Kategori</option>
                  <option value="blessing">Doa & Berkah</option>
                  <option value="memory">Kenangan</option>
                  <option value="wish">Harapan</option>
                  <option value="general">Umum</option>
                </select>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold flex items-center">
                <Users className="w-5 h-5 mr-2" />
                {filteredMessages.length} Ucapan
                {searchTerm && ` (dari ${messages.length} total)`}
              </h3>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Star className="w-4 h-4" />
                <span>Total {messages.reduce((sum, msg) => sum + msg.likes, 0)} likes</span>
              </div>
            </div>

            {filteredMessages.length === 0 ? (
              <Card className="text-center py-12">
                <CardContent>
                  <MessageCircle className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">
                    {searchTerm ? "Tidak ada ucapan yang sesuai dengan pencarian" : "Belum ada ucapan"}
                  </p>
                </CardContent>
              </Card>
            ) : (
              filteredMessages.map((message) => (
                <Card
                  key={message.id}
                  className="hover:shadow-lg transition-all duration-300 hover:scale-[1.01] relative"
                >
                  <CardContent className="pt-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <Heart className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <h4 className="font-semibold text-lg">{message.name}</h4>
                            <span
                              className={`px-2 py-1 text-xs rounded-full ${
                                message.category === "blessing"
                                  ? "bg-green-100 text-green-700"
                                  : message.category === "memory"
                                    ? "bg-blue-100 text-blue-700"
                                    : message.category === "wish"
                                      ? "bg-purple-100 text-purple-700"
                                      : "bg-gray-100 text-gray-700"
                              }`}
                            >
                              {categoryLabels[message.category]}
                            </span>
                          </div>
                          <span className="text-sm text-muted-foreground">{message.timestamp}</span>
                        </div>
                        <p className="text-foreground leading-relaxed mb-4">{message.message}</p>

                        {Object.keys(message.reactions).length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-3">
                            {Object.entries(message.reactions).map(([emoji, count]) => (
                              <span
                                key={emoji}
                                className="inline-flex items-center px-2 py-1 bg-muted rounded-full text-sm"
                              >
                                {emoji} {count}
                              </span>
                            ))}
                          </div>
                        )}

                        <div className="flex items-center space-x-4">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleLike(message.id)}
                            className="text-muted-foreground hover:text-pink-600 hover:bg-pink-50"
                          >
                            <ThumbsUp className="w-4 h-4 mr-1" />
                            {message.likes}
                          </Button>

                          <div className="relative">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() =>
                                setShowReactionPicker(showReactionPicker === message.id ? null : message.id)
                              }
                              className="text-muted-foreground hover:text-pink-600 hover:bg-pink-50"
                            >
                              <Smile className="w-4 h-4 mr-1" />
                              Reaksi
                            </Button>

                            {showReactionPicker === message.id && (
                              <div className="absolute bottom-full left-0 mb-2 bg-white border rounded-lg shadow-lg p-2 flex space-x-1 z-10">
                                {reactionEmojis.map((emoji) => (
                                  <button
                                    key={emoji}
                                    onClick={() => handleReaction(message.id, emoji)}
                                    className="hover:bg-gray-100 p-1 rounded text-lg transition-colors"
                                  >
                                    {emoji}
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>

          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="text-center">
              <CardContent className="pt-4">
                <div className="text-2xl font-bold text-pink-600">{messages.length}</div>
                <div className="text-sm text-muted-foreground">Total Ucapan</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-4">
                <div className="text-2xl font-bold text-pink-600">
                  {messages.reduce((sum, msg) => sum + msg.likes, 0)}
                </div>
                <div className="text-sm text-muted-foreground">Total Likes</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-4">
                <div className="text-2xl font-bold text-pink-600">
                  {messages.reduce((sum, msg) => sum + Object.values(msg.reactions).reduce((a, b) => a + b, 0), 0)}
                </div>
                <div className="text-sm text-muted-foreground">Total Reaksi</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-4">
                <div className="text-2xl font-bold text-pink-600">
                  {messages.filter((msg) => msg.category === "blessing").length}
                </div>
                <div className="text-sm text-muted-foreground">Doa & Berkah</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <MapPin className="w-12 h-12 mx-auto mb-4 text-primary" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Lokasi Resepsi</h2>
            <p className="text-muted-foreground text-lg">Bergabunglah dengan kami dalam perayaan</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Detail Acara</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-semibold">Tanggal</p>
                    <p className="text-muted-foreground">Sabtu, 15 Januari 2025</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-semibold">Waktu</p>
                    <p className="text-muted-foreground">10:00 - 14:00 WIB</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-semibold">Tempat</p>
                    <p className="text-muted-foreground">
                      Gedung Serbaguna Mawar
                      <br />
                      Jl. Melati No. 123, Jakarta
                    </p>
                  </div>
                </div>
                <Button className="w-full mt-4 bg-transparent" variant="outline">
                  <MapPin className="w-4 h-4 mr-2" />
                  Buka di Google Maps
                </Button>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Konfirmasi Kehadiran</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Mohon konfirmasi kehadiran Anda untuk membantu kami mempersiapkan acara dengan lebih baik.
                </p>
                <div className="space-y-3">
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    <Heart className="w-4 h-4 mr-2" />
                    Ya, Saya Akan Hadir
                  </Button>
                  <Button className="w-full bg-transparent" variant="outline">
                    Maaf, Tidak Bisa Hadir
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground mt-4 text-center">Terima kasih atas konfirmasinya!</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-gradient-to-r from-pink-50 to-rose-50">
        <div className="max-w-2xl mx-auto text-center">
          <Gift className="w-12 h-12 mx-auto mb-4 text-primary" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Sawer Online</h2>
          <p className="text-muted-foreground text-lg mb-8">
            Jika ingin memberikan hadiah untuk kami, bisa melalui transfer digital
          </p>

          <Card className="shadow-lg">
            <CardContent className="pt-6">
              {!showSawer ? (
                <Button onClick={() => setShowSawer(true)} size="lg" className="w-full bg-pink-600 hover:bg-pink-700">
                  <Gift className="w-5 h-5 mr-2" />
                  Lihat Rekening
                </Button>
              ) : (
                <div className="space-y-6">
                  <div className="text-center">
                    <h3 className="font-semibold text-lg mb-4">Rekening untuk Sawer</h3>
                  </div>

                  <div className="grid gap-4">
                    <Card className="border-2 border-primary/20 hover:border-primary/40 transition-colors">
                      <CardContent className="pt-4">
                        <div className="text-center">
                          <p className="font-semibold text-primary mb-1">Bank BCA</p>
                          <p className="text-2xl font-mono font-bold mb-1">1234567890</p>
                          <p className="text-sm text-muted-foreground">a.n. Ahmad Wijaya</p>
                          <Button
                            size="sm"
                            variant="outline"
                            className="mt-2 bg-transparent"
                            onClick={() => navigator.clipboard.writeText("1234567890")}
                          >
                            Salin Nomor
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-2 border-secondary/20 hover:border-secondary/40 transition-colors">
                      <CardContent className="pt-4">
                        <div className="text-center">
                          <p className="font-semibold text-secondary mb-1">DANA</p>
                          <p className="text-2xl font-mono font-bold mb-1">081234567890</p>
                          <p className="text-sm text-muted-foreground">a.n. Siti Nurhaliza</p>
                          <Button
                            size="sm"
                            variant="outline"
                            className="mt-2 bg-transparent"
                            onClick={() => navigator.clipboard.writeText("081234567890")}
                          >
                            Salin Nomor
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <p className="text-sm text-muted-foreground text-center">
                    Terima kasih atas kebaikan hati Anda. Doa Anda adalah hadiah terbaik untuk kami ❤️
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      <footer className="py-12 px-4 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <Heart className="w-12 h-12 mx-auto mb-4 text-pink-400 animate-pulse" />
            <h3 className="text-2xl font-bold mb-2">Ahmad & Siti</h3>
            <p className="text-gray-300 text-lg mb-4">Terima kasih telah menjadi bagian dari kebahagiaan kami</p>

            <div className="flex justify-center space-x-4 mb-6">
              <Button
                size="sm"
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
                onClick={handleShare}
              >
                <Share2 className="w-4 h-4 mr-2" />
                Bagikan
              </Button>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-6">
            <p className="text-sm text-gray-400">© 2025 - Dibuat dengan ❤️ untuk berbagi kebahagiaan</p>
            <p className="text-xs text-gray-500 mt-2">Ahmad & Siti Wedding Announcement</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
