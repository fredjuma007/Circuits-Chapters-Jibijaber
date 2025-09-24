import { Navigation } from "@/components/navigation"
import { SplitHero } from "@/components/split-hero"
import { LatestPosts } from "@/components/latest-posts"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <div className="pt-16">
        <div className="text-center py-12 px-4">
          <h1 className="text-4xl lg:text-6xl font-bold mb-4 text-balance">Circuits & Chapters Jibijaber</h1>
          <p className="text-xl lg:text-2xl text-muted-foreground text-pretty">Where Tech Sparks Meet Story Pages</p>
        </div>

        <SplitHero />
      </div>

      {/* Latest Posts Sections */}
      <LatestPosts type="tech" title="Latest from Tech" />
      <LatestPosts type="books" title="Latest from Books" />

      <Footer />
    </main>
  )
}
