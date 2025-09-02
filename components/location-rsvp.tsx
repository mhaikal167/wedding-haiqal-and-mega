"use client";

import { MapPin, Calendar, Clock, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "./ui/input";
import { useState } from "react";
import { supabaseServer } from "@/lib/utils";


interface LocationRSVPProps {
  eventDate: string;
  eventTime: string;
  venue: string;
  address: string;
}

export function LocationRSVP({
  eventDate,
  eventTime,
  venue,
  address,
}: LocationRSVPProps) {
  const [attendance, setAttendance] = useState({
    name: "",
    attend: false,
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // simpan ke supabase
  const handleRSVP = async (attending: boolean) => {
    if (!attendance.name.trim()) return alert("Nama harus diisi sayang 🤍");

    setLoading(true);

    const { error } = await supabaseServer.from("rsvp").insert([
      {
        name: attendance.name,
        attend: attending,
      },
    ]);

    setLoading(false);

    if (error) {
      console.error(error);
      alert("Gagal menyimpan RSVP 😢");
    } else {
      setSubmitted(true);
      setAttendance({ ...attendance, attend: attending });
    }
  };

  return (
    <section className="py-16 px-4 bg-muted/30">
      <div className="max-w-4xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-12">
          <MapPin className="w-12 h-12 mx-auto mb-4 text-primary" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Lokasi Akad dan Syukuran</h2>
          <p className="text-muted-foreground text-lg">
            Bergabunglah dengan kami dalam perayaan
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Detail Acara */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Detail Acara Akad</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-semibold">Tanggal</p>
                  <p className="text-muted-foreground">{eventDate}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-semibold">Waktu</p>
                  <p className="text-muted-foreground">{eventTime}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-semibold">Tempat</p>
                  <p className="text-muted-foreground">
                    {venue}
                    <br />
                    {address}
                  </p>
                </div>
              </div>
              <Button
                className="w-full mt-4 bg-transparent"
                variant="outline"
                asChild
              >
                <a
                  href="https://maps.app.goo.gl/NfXYq1QDgHLGzhw19"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MapPin className="w-4 h-4 mr-2" />
                  Buka di Google Maps
                </a>
              </Button>
            </CardContent>
          </Card>

           <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Detail Acara Syukuran</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-semibold">Tanggal</p>
                  <p className="text-muted-foreground">{eventDate}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-semibold">Waktu</p>
                  <p className="text-muted-foreground">11:00 - 14:00 WIB</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-semibold">Tempat</p>
                  <p className="text-muted-foreground">
                    Ramstar Kitchen
                    <br />
                    Letjen S. Parman St No.65, RT.14/RW.66, Slipi, Palmerah, West Jakarta City, Jakarta 11410
                  </p>
                </div>
              </div>
              <Button
                className="w-full mt-4 bg-transparent"
                variant="outline"
                asChild
              >
                <a
                  href="https://maps.app.goo.gl/4Awjv9CdsvHWd7xF8"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MapPin className="w-4 h-4 mr-2" />
                  Buka di Google Maps
                </a>
              </Button>
            </CardContent>
          </Card>

          {/* RSVP Form */}
          <Card className="shadow-lg col-span-1 md:col-span-2">
            <CardHeader>
              <CardTitle>Konfirmasi Kehadiran</CardTitle>
            </CardHeader>
            <CardContent>
              {submitted ? (
                <p className="text-green-600 font-semibold text-center">
                  Terima kasih sudah konfirmasi, {attendance.name}! 🤍
                </p>
              ) : (
                <>
                  <p className="text-muted-foreground mb-4">
                    Mohon konfirmasi kehadiran Anda untuk membantu kami
                    mempersiapkan acara dengan lebih baik.
                  </p>
                  <div className="space-y-3">
                    <Input
                      id="name"
                      value={attendance.name}
                      onChange={(e) =>
                        setAttendance({ ...attendance, name: e.target.value })
                      }
                      placeholder="Masukkan nama Anda"
                      required
                      className="mt-1 border-amber-200 focus:border-amber-400"
                    />
                    <Button
                      className="w-full bg-green-600 hover:bg-green-700"
                      onClick={() => handleRSVP(true)}
                      disabled={loading}
                    >
                      <Heart className="w-4 h-4 mr-2" />
                      {loading ? "Mengirim..." : "Ya, Saya Akan Hadir"}
                    </Button>
                    <Button
                      className="w-full bg-transparent"
                      variant="outline"
                      onClick={() => handleRSVP(false)}
                      disabled={loading}
                    >
                      {loading ? "Mengirim..." : "Maaf, Tidak Bisa Hadir"}
                    </Button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
