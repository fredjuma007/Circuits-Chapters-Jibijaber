import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Zap, BookOpen, Users, Target } from "lucide-react"

export default function AboutPage() {
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
                <Target className="relative w-12 h-12 text-primary drop-shadow-lg" />
              </div>

              <div>
                <h1 className="text-4xl lg:text-5xl font-bold mb-2 bg-gradient-to-r from-blue-600 via-purple-500 to-amber-600 bg-clip-text text-transparent animate-shimmer bg-[length:200%_100%]">
                  About Circuits & Chapters
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
                  Where Tech Sparks Meet Story Pages
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/3 via-purple-500/3 to-amber-500/3" />
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-amber-500/5 rounded-3xl blur-xl" />
              <div className="relative p-8">
                <h2 className="text-3xl font-bold mb-6 text-balance bg-gradient-to-r from-blue-600 via-purple-500 to-amber-600 bg-clip-text text-transparent">
                  Our Mission
                </h2>
                <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
                  We believe that technology and literature are not separate worlds, but interconnected realms that
                  shape our understanding of the present and future. Our mission is to explore the fascinating
                  intersection where digital innovation meets timeless storytelling.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/30 to-transparent" />
          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12 text-balance bg-gradient-to-r from-blue-600 via-purple-500 to-amber-600 bg-clip-text text-transparent">
              What We Cover
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="tech-theme relative overflow-hidden group hover:shadow-2xl hover:shadow-blue-500/25 transition-all duration-500 border-blue-500/20">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-500" />
                <CardContent className="p-8 relative">
                  <div className="relative inline-block mb-6">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-xl animate-pulse" />
                    <Zap className="relative w-12 h-12 text-blue-500 drop-shadow-lg" />
                  </div>
                  <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                    Tech
                  </h3>
                  <ul className="space-y-4 text-muted-foreground">
                    <li className="flex items-start group/item">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-4 flex-shrink-0 group-hover/item:animate-pulse" />
                      <span className="group-hover/item:text-foreground transition-colors duration-300">
                        <strong className="text-blue-600">Gadgets & Devices:</strong> Latest tech reviews and
                        innovations
                      </span>
                    </li>
                    <li className="flex items-start group/item">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-4 flex-shrink-0 group-hover/item:animate-pulse" />
                      <span className="group-hover/item:text-foreground transition-colors duration-300">
                        <strong className="text-blue-600">Apps & Tools:</strong> Productivity boosters and digital
                        solutions
                      </span>
                    </li>
                    <li className="flex items-start group/item">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-4 flex-shrink-0 group-hover/item:animate-pulse" />
                      <span className="group-hover/item:text-foreground transition-colors duration-300">
                        <strong className="text-blue-600">Developer Resources:</strong> Coding insights and development
                        trends
                      </span>
                    </li>
                    <li className="flex items-start group/item">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-4 flex-shrink-0 group-hover/item:animate-pulse" />
                      <span className="group-hover/item:text-foreground transition-colors duration-300">
                        <strong className="text-blue-600">Industry Trends:</strong> Future predictions and market
                        analysis
                      </span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="books-theme relative overflow-hidden group hover:shadow-2xl hover:shadow-amber-500/25 transition-all duration-500 border-amber-500/20">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 to-orange-500" />
                <CardContent className="p-8 relative">
                  <div className="relative inline-block mb-6">
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-full blur-xl animate-pulse" />
                    <BookOpen className="relative w-12 h-12 text-amber-500 drop-shadow-lg" />
                  </div>
                  <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                    Books
                  </h3>
                  <ul className="space-y-4 text-muted-foreground">
                    <li className="flex items-start group/item">
                      <span className="w-2 h-2 bg-amber-500 rounded-full mt-2 mr-4 flex-shrink-0 group-hover/item:animate-pulse" />
                      <span className="group-hover/item:text-foreground transition-colors duration-300">
                        <strong className="text-amber-600">Reviews:</strong> Honest opinions on the latest releases
                      </span>
                    </li>
                    <li className="flex items-start group/item">
                      <span className="w-2 h-2 bg-amber-500 rounded-full mt-2 mr-4 flex-shrink-0 group-hover/item:animate-pulse" />
                      <span className="group-hover/item:text-foreground transition-colors duration-300">
                        <strong className="text-amber-600">Recommendations & Lists:</strong> Curated reading collections
                      </span>
                    </li>
                    <li className="flex items-start group/item">
                      <span className="w-2 h-2 bg-amber-500 rounded-full mt-2 mr-4 flex-shrink-0 group-hover/item:animate-pulse" />
                      <span className="group-hover/item:text-foreground transition-colors duration-300">
                        <strong className="text-amber-600">Author Spotlights:</strong> Meet the writers behind the words
                      </span>
                    </li>
                    <li className="flex items-start group/item">
                      <span className="w-2 h-2 bg-amber-500 rounded-full mt-2 mr-4 flex-shrink-0 group-hover/item:animate-pulse" />
                      <span className="group-hover/item:text-foreground transition-colors duration-300">
                        <strong className="text-amber-600">Book vs. Screen:</strong> Adaptation analysis and comparisons
                      </span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-16 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/3 via-purple-500/3 to-amber-500/3" />
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="relative inline-block mb-6">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full blur-xl animate-pulse" />
              <Users className="relative w-12 h-12 mx-auto text-primary drop-shadow-lg" />
            </div>
            <h2 className="text-3xl font-bold mb-8 text-balance bg-gradient-to-r from-blue-600 via-purple-500 to-amber-600 bg-clip-text text-transparent">
              Our Team
            </h2>
            <div className="space-y-6">
              <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
                We're a passionate team of tech enthusiasts and book lovers who believe in the power of both digital
                innovation and timeless storytelling. Our diverse backgrounds in technology, literature, and journalism
                allow us to bring unique perspectives to every piece we create.
              </p>
              <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
                Whether we're diving deep into the latest AI breakthrough or exploring the themes in a contemporary
                novel, we approach each topic with curiosity, critical thinking, and a commitment to quality content.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
