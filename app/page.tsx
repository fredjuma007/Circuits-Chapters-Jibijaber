import { Navigation } from "@/components/navigation"
import { EpicHero } from "@/components/epic-hero"
import { SplitHero } from "@/components/split-hero"
import { LatestPosts } from "@/components/latest-posts"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navigation />

      <div className="lg:hidden">
        <EpicHero />
      </div>

      <div className="hidden lg:block">
        <SplitHero />
      </div>

      {/* Latest Posts Sections */}
      <LatestPosts type="tech" title="Latest from Tech" />
      <LatestPosts type="books" title="Latest from Books" />

      <Footer />
    </main>
  )
}
