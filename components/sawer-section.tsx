"use client"

import { useState } from "react"
import { Gift } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { toast } from "sonner"

interface BankAccount {
  bank: string
  accountNumber: string
  accountName: string
  color: "primary" | "secondary"
}

interface SawerSectionProps {
  accounts: BankAccount[]
}

export function SawerSection({ accounts }: SawerSectionProps) {
  const [showSawer, setShowSawer] = useState(false)

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    // You could add a toast notification here
    toast.success("Nomor rekening disalin ke clipboard!")
  }

  return (
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
                  {accounts.map((account, index) => (
                    <Card
                      key={index}
                      className={`border-2 ${
                        account.color === "primary"
                          ? "border-primary/20 hover:border-primary/40"
                          : "border-secondary/20 hover:border-secondary/40"
                      } transition-colors`}
                    >
                      <CardContent className="pt-4">
                        <div className="text-center">
                          <p
                            className={`font-semibold mb-1 ${
                              account.color === "primary" ? "text-primary" : "text-secondary"
                            }`}
                          >
                            {account.bank}
                          </p>
                          <p className="text-2xl font-mono font-bold mb-1">{account.accountNumber}</p>
                          <p className="text-sm text-muted-foreground">a.n. {account.accountName}</p>
                          <Button
                            size="sm"
                            variant="outline"
                            className="mt-2 bg-transparent"
                            onClick={() => copyToClipboard(account.accountNumber)}
                          >
                            Salin Nomor
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
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
  )
}
