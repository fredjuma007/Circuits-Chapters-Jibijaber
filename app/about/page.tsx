import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Zap, BookOpen, Users, Target } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Navigation />

      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-amber-600/10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 text-balance">About Circuits & Chapters</h1>
            <p className="text-xl lg:text-2xl text-muted-foreground text-pretty">Where Tech Sparks Meet Story Pages</p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <Target className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h2 className="text-3xl font-bold mb-6 text-balance">Our Mission</h2>
              <p className="text-lg text-muted-foreground text-pretty">
                We believe that technology and literature are not separate worlds, but interconnected realms that shape
                our understanding of the present and future. Our mission is to explore the fascinating intersection
                where digital innovation meets timeless storytelling.
              </p>
            </div>
          </div>
        </section>

        {/* What We Cover */}
        <section className="py-16 bg-muted/50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12 text-balance">What We Cover</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Tech Section */}
              <Card className="tech-theme">
                <CardContent className="p-8">
                  <Zap className="w-12 h-12 mb-4 text-blue-500" />
                  <h3 className="text-2xl font-bold mb-4">Tech</h3>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>
                        <strong>Gadgets & Devices:</strong> Latest tech reviews and innovations
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>
                        <strong>Apps & Tools:</strong> Productivity boosters and digital solutions
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>
                        <strong>Developer Resources:</strong> Coding insights and development trends
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>
                        <strong>Industry Trends:</strong> Future predictions and market analysis
                      </span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Books Section */}
              <Card className="books-theme">
                <CardContent className="p-8">
                  <BookOpen className="w-12 h-12 mb-4 text-amber-500" />
                  <h3 className="text-2xl font-bold mb-4">Books</h3>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-amber-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>
                        <strong>Reviews:</strong> Honest opinions on the latest releases
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-amber-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>
                        <strong>Recommendations & Lists:</strong> Curated reading collections
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-amber-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>
                        <strong>Author Spotlights:</strong> Meet the writers behind the words
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-amber-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>
                        <strong>Book vs. Screen:</strong> Adaptation analysis and comparisons
                      </span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Users className="w-12 h-12 mx-auto mb-4 text-primary" />
            <h2 className="text-3xl font-bold mb-6 text-balance">Our Team</h2>
            <p className="text-lg text-muted-foreground mb-8 text-pretty">
              We're a passionate team of tech enthusiasts and book lovers who believe in the power of both digital
              innovation and timeless storytelling. Our diverse backgrounds in technology, literature, and journalism
              allow us to bring unique perspectives to every piece we create.
            </p>
            <p className="text-lg text-muted-foreground text-pretty">
              Whether we're diving deep into the latest AI breakthrough or exploring the themes in a contemporary novel,
              we approach each topic with curiosity, critical thinking, and a commitment to quality content.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
