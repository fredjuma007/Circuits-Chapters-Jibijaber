import { createClient } from "@sanity/client"
import imageUrlBuilder from "@sanity/image-url"

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "placeholder-project-id",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  useCdn: true,
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN
})

const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}

export interface Category {
  _id: string
  name: string
  type: "tech" | "books"
  subcategory: string
  slug: {
    current: string
  }
}

export interface Post {
  _id: string
  title: string
  slug: {
    current: string
  }
  category: Category
  featuredImage: any
  excerpt: string
  content: any
  createdAt: string
  _createdAt: string
}
