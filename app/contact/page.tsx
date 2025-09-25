"use client"

import type React from "react"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Mail, MessageSquare, Send } from "lucide-react"
import { useState } from "react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Contact form submission logic would go here
    console.log("Contact form submitted:", formData)
    // Reset form
    setFormData({ name: "", email: "", subject: "", message: "" })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <Navigation />

      <main className="pt-16 relative">
        <section className="relative py-12 overflow-hidden border-b border-border/20">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-amber-600/5" />

          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-blue-400/40 rounded-full animate-pulse" />
            <div className="absolute top-1/3 right-1/3 w-0.5 h-0.5 bg-purple-400/60 rounded-full animate-ping" />
            <div className="absolute bottom-1/4 right-1/4 w-1 h-1 bg-amber-500/30 rounded-full animate-pulse" />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-amber-500/20 rounded-full blur-lg animate-pulse" />
                <Mail className="relative w-12 h-12 text-primary drop-shadow-lg" />
              </div>

              <div>
                <h1 className="text-4xl lg:text-5xl font-bold mb-2 bg-gradient-to-r from-blue-600 via-purple-500 to-amber-600 bg-clip-text text-transparent animate-shimmer bg-[length:200%_100%]">
                  Get In Touch
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
                  I'd love to hear from you! Whether you're curious about
                  my latest tech review, need a book recommendation, or want to collaborate, feel free to reach out using the
                  form below or via email. Let's connect and share our passion for technology and literature!
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/3 via-purple-500/3 to-amber-500/3" />
          <div className="relative max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="relative overflow-hidden border-purple-500/20 shadow-2xl shadow-purple-500/10">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-amber-500/5" />
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-amber-500" />

              <CardHeader className="relative">
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full blur-lg animate-pulse" />
                    <MessageSquare className="relative w-6 h-6 text-purple-500" />
                  </div>
                  <span className="bg-gradient-to-r from-blue-600 via-purple-500 to-amber-600 bg-clip-text text-transparent">
                    Send a message
                  </span>
                </CardTitle>
              </CardHeader>

              <CardContent className="relative">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-sm font-medium">
                        Name
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="border-purple-500/20 focus:border-purple-500/50 focus:ring-purple-500/25 transition-all duration-300"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium">
                        Email
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="border-purple-500/20 focus:border-purple-500/50 focus:ring-purple-500/25 transition-all duration-300"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject" className="text-sm font-medium">
                      Subject
                    </Label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="border-purple-500/20 focus:border-purple-500/50 focus:ring-purple-500/25 transition-all duration-300"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-sm font-medium">
                      Message
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="border-purple-500/20 focus:border-purple-500/50 focus:ring-purple-500/25 transition-all duration-300 resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-amber-600 hover:from-blue-700 hover:via-purple-700 hover:to-amber-700 text-white font-medium py-3 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25 hover:scale-[1.02]"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="py-16 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/30 to-transparent" />
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-12 text-balance bg-gradient-to-r from-blue-600 via-purple-500 to-amber-600 bg-clip-text text-transparent">
              Other Ways to Connect
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="group p-6 rounded-2xl bg-gradient-to-br from-blue-500/5 to-purple-500/5 border border-blue-500/10 hover:border-blue-500/20 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10">
                <div className="relative inline-block mb-4">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-lg animate-pulse" />
                  <Mail className="relative w-10 h-10 mx-auto text-blue-500 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h3 className="font-semibold mb-2 text-lg bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Email
                </h3>
                <p className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                  circuitschapters@gmail.com
                </p>
              </div>

              <div className="group p-6 rounded-2xl bg-gradient-to-br from-purple-500/5 to-amber-500/5 border border-purple-500/10 hover:border-purple-500/20 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10">
                <div className="relative inline-block mb-4">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-amber-500/20 rounded-full blur-lg animate-pulse" />
                  <MessageSquare className="relative w-10 h-10 mx-auto text-purple-500 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h3 className="font-semibold mb-2 text-lg bg-gradient-to-r from-purple-600 to-amber-600 bg-clip-text text-transparent">
                  Social Media
                </h3>
                <p className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                  Follow us for updates
                </p>
              </div>

              <div className="group p-6 rounded-2xl bg-gradient-to-br from-amber-500/5 to-blue-500/5 border border-amber-500/10 hover:border-amber-500/20 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/10">
                <div className="relative inline-block mb-4">
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-blue-500/20 rounded-full blur-lg animate-pulse" />
                  <Send className="relative w-10 h-10 mx-auto text-amber-500 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h3 className="font-semibold mb-2 text-lg bg-gradient-to-r from-amber-600 to-blue-600 bg-clip-text text-transparent">
                  Newsletter
                </h3>
                <p className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                  Subscribe for weekly insights
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
