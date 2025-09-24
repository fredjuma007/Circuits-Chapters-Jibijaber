import TechPostPageClient from "./TechPostPageClient"
import { client } from "@/lib/sanity"

export const revalidate = 60

async function getPostSlugs(): Promise<{ slug: { current: string } }[]> {
  try {
    const query = `
      *[_type == "post" && category->type == "tech"] {
        slug
      }
    `

    const posts = await client.fetch(query)
    return posts || []
  } catch (error) {
    console.error("Error fetching post slugs:", error)
    return []
  }
}

export async function generateStaticParams() {
  const posts = await getPostSlugs()
  return posts.map((post) => ({
    slug: post.slug.current,
  }))
}

export default function TechPostPage({ params }: { params: { slug: string } }) {
  return <TechPostPageClient slug={params.slug} />
}
