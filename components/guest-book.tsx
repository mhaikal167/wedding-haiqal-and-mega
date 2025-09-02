"use client";

import type React from "react";

import { useEffect, useState } from "react";
import {
  MessageCircle,
  Heart,
  Search,
  Filter,
  ThumbsUp,
  Smile,
  Star,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toJakartaTime } from "@/lib/utils";
import { useMessages } from "@/hooks/useGetMessage";
import { usePostMessage } from "@/hooks/usePostMessage";
import { useUpdateMessages } from "@/hooks/useUpdateMessage";

interface Message {
  id: number;
  name: string;
  message: string;
  timestamp: string;
  likes: number;
  category: "blessing" | "memory" | "wish" | "general";
  reactions: { [key: string]: number };
}

interface GuestBookProps {
  initialMessages?: Message[];
}

export function GuestBook({ initialMessages = [] }: GuestBookProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState({
    name: "",
    message: "",
    category: "general" as Message["category"],
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState<
    Message["category"] | "all"
  >("all");
  const [showReactionPicker, setShowReactionPicker] = useState<number | null>(
    null
  );

  const { data: messagesData, isLoading } = useMessages();
  const { mutate: postMessage, isPending } = usePostMessage();
  const { likeMessage, reactMessage } = useUpdateMessages();
  useEffect(() => {
    if (messagesData) {
      setMessages(messagesData);
    }
  }, [messagesData]);

  const handleSubmitMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.name && newMessage.message) {
      postMessage({
        name: "Haikal",
        category: "Wedding",
        message: "Selamat menempuh hidup baru 🎉",
      });
      setNewMessage({ name: "", message: "", category: "general" });
    }
  };

  const handleLike = async (messageId: number) => {
    likeMessage(messageId);
  };

  const handleReaction = async (messageId: number, emoji: string) => {
    const msg = messages.find((m) => m.id === messageId);
    if (!msg) return;

    reactMessage({ messageId, emoji, reactions: msg.reactions });
    setShowReactionPicker(null);
  };

  const filteredMessages = messages.filter((message) => {
    const matchesSearch =
      message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      filterCategory === "all" || message.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const reactionEmojis = ["❤️", "😊", "🎉", "👏", "🤲", "🥰", "✨", "🌟"];
  const categoryLabels = {
    blessing: "Doa & Berkah",
    memory: "Kenangan",
    wish: "Harapan",
    general: "Umum",
  };

  return (
    <section id="ucapan" className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <MessageCircle className="w-12 h-12 mx-auto mb-4 text-amber-600" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-amber-800">
            Buku Tamu Digital
          </h2>
          <p className="text-amber-700 text-lg">
            Bagikan ucapan, kenangan, dan doa terbaik untuk kami
          </p>
        </div>

        <Card className="mb-12 shadow-lg border-amber-200">
          <CardHeader>
            <CardTitle className="flex items-center text-amber-800">
              <Heart className="w-5 h-5 mr-2 text-amber-600" />
              Tulis Ucapan
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 bg-cream-50">
            <form onSubmit={handleSubmitMessage} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name" className="text-amber-800">
                    Nama
                  </Label>
                  <Input
                    id="name"
                    value={newMessage.name}
                    onChange={(e) =>
                      setNewMessage({ ...newMessage, name: e.target.value })
                    }
                    placeholder="Masukkan nama Anda"
                    required
                    className="mt-1 border-amber-200 focus:border-amber-400"
                  />
                </div>
                <div>
                  <Label htmlFor="category" className="text-amber-800">
                    Kategori
                  </Label>
                  <select
                    id="category"
                    value={newMessage.category}
                    onChange={(e) =>
                      setNewMessage({
                        ...newMessage,
                        category: e.target.value as Message["category"],
                      })
                    }
                    className="mt-1 w-full px-3 py-2 border border-amber-200 bg-white rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 text-amber-800"
                  >
                    <option value="general">Umum</option>
                    <option value="blessing">Doa & Berkah</option>
                    <option value="memory">Kenangan</option>
                    <option value="wish">Harapan</option>
                  </select>
                </div>
              </div>
              <div>
                <Label htmlFor="message" className="text-amber-800">
                  Ucapan
                </Label>
                <Textarea
                  id="message"
                  value={newMessage.message}
                  onChange={(e) =>
                    setNewMessage({ ...newMessage, message: e.target.value })
                  }
                  placeholder="Tulis ucapan selamat, kenangan indah, atau doa untuk kami..."
                  rows={4}
                  required
                  className="mt-1 border-amber-200 focus:border-amber-400"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-amber-600 hover:bg-amber-700 text-white"
              >
                <Heart className="w-4 h-4 mr-2" />
                Kirim Ucapan
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-600 w-4 h-4" />
              <Input
                placeholder="Cari ucapan atau nama..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-amber-200 focus:border-amber-400 bg-white/70 backdrop-blur-sm"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-amber-600" />
              <select
                value={filterCategory}
                onChange={(e) =>
                  setFilterCategory(
                    e.target.value as Message["category"] | "all"
                  )
                }
                className="px-3 py-2 border border-amber-200 bg-white/70 backdrop-blur-sm rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 text-amber-800"
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
            <h3 className="text-xl font-semibold flex items-center text-amber-800">
              <Users className="w-5 h-5 mr-2 text-amber-600" />
              {filteredMessages.length} Ucapan
              {searchTerm && ` (dari ${messages.length} total)`}
            </h3>
            <div className="flex items-center space-x-2 text-sm text-amber-700">
              <Star className="w-4 h-4 text-amber-600" />
              <span>
                Total {messages.reduce((sum, msg) => sum + msg.likes, 0)} likes
              </span>
            </div>
          </div>

          {isLoading ? (
            <p className="text-amber-700">Memuat ucapan...</p>
          ) : filteredMessages.length === 0 ? (
            <Card className="text-center py-12 border-amber-200 bg-white/70 backdrop-blur-sm">
              <CardContent>
                <MessageCircle className="w-12 h-12 mx-auto mb-4 text-amber-600" />
                <p className="text-amber-700">
                  {searchTerm
                    ? "Tidak ada ucapan yang sesuai dengan pencarian"
                    : "Belum ada ucapan"}
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredMessages.map((message) => (
              <Card
                key={message.id}
                className="hover:shadow-lg transition-all duration-300 hover:scale-[1.01] relative border-amber-200 bg-white/70 backdrop-blur-sm"
              >
                <CardContent className="pt-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <Heart className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <h4 className="font-semibold text-lg text-amber-800">
                            {message.name}
                          </h4>
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${
                              message.category === "blessing"
                                ? "bg-green-100 text-green-700"
                                : message.category === "memory"
                                ? "bg-blue-100 text-blue-700"
                                : message.category === "wish"
                                ? "bg-purple-100 text-purple-700"
                                : "bg-amber-100 text-amber-700"
                            }`}
                          >
                            {categoryLabels[message.category]}
                          </span>
                        </div>
                        <span className="text-sm text-amber-600">
                          {toJakartaTime(message.timestamp)}
                        </span>
                      </div>
                      <p className="text-amber-800 leading-relaxed mb-4">
                        {message.message}
                      </p>

                      {Object.keys(message.reactions).length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-3">
                          {Object.entries(message.reactions).map(
                            ([emoji, count]) => (
                              <span
                                key={emoji}
                                className="inline-flex items-center px-2 py-1 bg-amber-100 rounded-full text-sm text-amber-800"
                              >
                                {emoji} {count}
                              </span>
                            )
                          )}
                        </div>
                      )}

                      <div className="flex items-center space-x-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleLike(message.id)}
                          className="text-amber-600 hover:text-amber-700 hover:bg-amber-50"
                        >
                          <ThumbsUp className="w-4 h-4 mr-1" />
                          {message.likes}
                        </Button>

                        <div className="relative">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              setShowReactionPicker(
                                showReactionPicker === message.id
                                  ? null
                                  : message.id
                              )
                            }
                            className="text-amber-600 hover:text-amber-700 hover:bg-amber-50"
                          >
                            <Smile className="w-4 h-4 mr-1" />
                            Reaksi
                          </Button>

                          {showReactionPicker === message.id && (
                            <div className="absolute bottom-full left-0 mb-2 bg-white border border-amber-200 rounded-lg shadow-lg p-2 flex space-x-1 z-10">
                              {reactionEmojis.map((emoji) => (
                                <button
                                  key={emoji}
                                  onClick={() =>
                                    handleReaction(message.id, emoji)
                                  }
                                  className="hover:bg-amber-100 p-1 rounded text-lg transition-colors"
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
          <Card className="text-center border-amber-200 bg-white/70 backdrop-blur-sm">
            <CardContent className="pt-4">
              <div className="text-2xl font-bold text-amber-600">
                {messages.length}
              </div>
              <div className="text-sm text-amber-700">Total Ucapan</div>
            </CardContent>
          </Card>
          <Card className="text-center border-amber-200 bg-white/70 backdrop-blur-sm">
            <CardContent className="pt-4">
              <div className="text-2xl font-bold text-amber-600">
                {messages.reduce((sum, msg) => sum + msg.likes, 0)}
              </div>
              <div className="text-sm text-amber-700">Total Likes</div>
            </CardContent>
          </Card>
          <Card className="text-center border-amber-200 bg-white/70 backdrop-blur-sm">
            <CardContent className="pt-4">
              <div className="text-2xl font-bold text-amber-600">
                {messages.reduce(
                  (sum, msg) =>
                    sum +
                    Object.values(msg.reactions).reduce((a, b) => a + b, 0),
                  0
                )}
              </div>
              <div className="text-sm text-amber-700">Total Reaksi</div>
            </CardContent>
          </Card>
          <Card className="text-center border-amber-200 bg-white/70 backdrop-blur-sm">
            <CardContent className="pt-4">
              <div className="text-2xl font-bold text-amber-600">
                {messages.filter((msg) => msg.category === "blessing").length}
              </div>
              <div className="text-sm text-amber-700">Doa & Berkah</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
