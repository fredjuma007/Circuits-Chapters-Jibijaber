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
    <div className="min-h-screen">
      <Navigation />

      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-amber-600/10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Mail className="w-16 h-16 mx-auto mb-6 text-primary" />
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 text-balance">Get In Touch</h1>
            <p className="text-xl lg:text-2xl text-muted-foreground text-pretty">
              Have a question, suggestion, or just want to say hello? We'd love to hear from you.
            </p>
          </div>
        </section>

        {/* Contact Form */}
        <section className="py-16">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Send us a message
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" name="name" type="text" value={formData.name} onChange={handleChange} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Contact Info */}
        <section className="py-16 bg-muted/50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-8 text-balance">Other Ways to Connect</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <Mail className="w-8 h-8 mx-auto mb-4 text-primary" />
                <h3 className="font-semibold mb-2">Email</h3>
                <p className="text-muted-foreground">hello@circuitschapters.com</p>
              </div>
              <div>
                <MessageSquare className="w-8 h-8 mx-auto mb-4 text-primary" />
                <h3 className="font-semibold mb-2">Social Media</h3>
                <p className="text-muted-foreground">Follow us for updates</p>
              </div>
              <div>
                <Send className="w-8 h-8 mx-auto mb-4 text-primary" />
                <h3 className="font-semibold mb-2">Newsletter</h3>
                <p className="text-muted-foreground">Subscribe for weekly insights</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
