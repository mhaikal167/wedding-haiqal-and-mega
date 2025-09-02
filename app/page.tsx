"use client";

import { HeroSection } from "@/components/hero-section";
import { CountdownTimer } from "@/components/countdown-timer";
import { LocationRSVP } from "@/components/location-rsvp";
import { Footer } from "@/components/footer";
import { LoveStoryTimeline } from "@/components/love-story-timeline";
import { PhotoGallery } from "@/components/photo-gallery";
import { MusicPlayer } from "@/components/music-player";
import { GuestBook } from "@/components/guest-book";
import { SawerSection } from "@/components/sawer-section";

export default function Home() {
  // Sample data - in a real app, this would come from a CMS or database
  const timelineEvents = [
    {
      year: "2024",
      title: "Pertama Bertemu",
      description:
        "Kami bertemu di Blok M dan langsung merasa ada chemistry yang istimewa",
    },
    {
      year: "2024",
      title: "Mulai Pacaran",
      description:
        "Setelah 2 bulan berteman, kami memutuskan untuk menjalin hubungan yang serius",
    },
    {
      year: "2025",
      title: "Lamaran",
      description:
        "Setelah berpacaran satu tahun setengah, Aku melamar mega di hadapan kedua keluarga dengan penuh kebahagiaan",
    },
    {
      year: "2025",
      title: "Pernikahan",
      description:
        "Alhamdulillah, kami akan resmi menjadi suami istri pada 4 September 2025",
    },
  ];

  const photos = [
    {
      id: 1,
      src: "/images/lamaran-2.jpg",
      alt: "Lamaran Photo",
    },
    { id: 2, src: "/images/lamaran-1.jpg", alt: "Lamaran Photo 2" },
    { id: 3, src: "/images/prewed-1.jpg", alt: "Pre-wedding Photo" },
    { id: 4, src: "/images/prewed-2.jpg", alt: "Pre-wedding Photo" },
    { id: 5, src: "/images/kenangan-farm-house.jpg", alt: "Romantic Photo" },
    { id: 6, src: "/images/family-photo.jpg", alt: "Family Photo" },
  ];



  const bankAccounts = [
    {
      bank: "Bank Mandiri",
      accountNumber: "1320027594028",
      accountName: "MUHAMMAD HAFIDZ HAIQ",
      color: "primary" as const,
    },
  ];


  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "Pengumuman Pernikahan Ahmad & Siti",
        text: "Alhamdulillah, kami telah resmi menjadi suami istri!",
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link berhasil disalin!");
    }
  };


  return (
    <div className="min-h-screen bg-background">
      <HeroSection
      />
<MusicPlayer songTitle="I Think They Call This Love" artist="Elliot James Reay" src="/I-think-they-call-this-love.mp3" />

      <CountdownTimer
        targetDate="2025-09-04T00:00:00"
        title="Menuju Hari Bahagia"
        subtitle="Hitung mundur menuju hari spesial kami 💍"
      />

      <LoveStoryTimeline events={timelineEvents} />

      <PhotoGallery photos={photos} />


      <GuestBook  />

      <LocationRSVP
        eventDate="Kamis, 4 September 2025"
        eventTime="8:00 - 9:00 WIB"
        venue="Mesjid Istiqlal"
        address="Jl. Taman Wijaya Kusuma, Ps. Baru, Kec. Sawah Besar, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta 10710"
      />

      <SawerSection accounts={bankAccounts} />

      <Footer groomName="Haiqal" brideName="Mega" onShare={handleShare} />
    </div>
  );
}
