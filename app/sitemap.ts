import type { MetadataRoute } from "next"
import { client } from "@/lib/sanity"

interface SitemapPost {
  slug: {
    current: string
  }
  category: {
    type: "tech" | "books"
  }
  _updatedAt: string
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://circuits-chapters.vercel.app"

  // Fetch all posts from Sanity
  const postsQuery = `
    *[_type == "post"] {
      slug,
      category->{
        type
      },
      _updatedAt
    }
  `

  let posts: SitemapPost[] = []
  try {
    posts = await client.fetch(postsQuery)
  } catch (error) {
    console.error("Error fetching posts for sitemap:", error)
  }

  const postUrls = posts.map((post) => ({
    url: `${baseUrl}/${post.category.type}/${post.slug.current}`,
    lastModified: new Date(post._updatedAt),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }))

  // Static pages
  const staticUrls: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/tech`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/books`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ]

  return [...staticUrls, ...postUrls]
}
