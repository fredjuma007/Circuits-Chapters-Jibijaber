import type { Metadata } from "next"
import TechPostPageClient from "./TechPostPageClient"
import { client, urlFor } from "@/lib/sanity"

export const dynamic = "force-dynamic"

interface TechPostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: TechPostPageProps): Promise<Metadata> {
  const { slug } = await params

  try {
    const query = `
      *[_type == "post" && category->type == "tech" && slug.current == $slug][0] {
        title,
        excerpt,
        featuredImage,
        _createdAt
      }
    `

    const post = await client.fetch(query, { slug })

    if (!post) {
      return {
        title: "Post not found",
        description: "This post could not be found.",
      }
    }

    const imageUrl = post.featuredImage
      ? urlFor(post.featuredImage).width(1200).height(630).url()
      : `${process.env.NEXT_PUBLIC_SITE_URL || "https://example.com"}/Circuits & Chapters logo.`

    return {
      title: post.title,
      description: post.excerpt || "Read this tech article on Circuits & Chapters",
      openGraph: {
        title: post.title,
        description: post.excerpt || "Read this tech article",
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: post.title,
            type: "image/jpeg",
          },
        ],
        type: "article",
        publishedTime: new Date(post._createdAt).toISOString(),
        authors: ["Circuits & Chapters"],
      },
      twitter: {
        card: "summary_large_image",
        title: post.title,
        description: post.excerpt || "Read this article",
        images: [imageUrl],
      },
    }
  } catch (error) {
    console.error("Error generating metadata:", error)
    return {
      title: "Tech Article",
      description: "Read this tech article on Circuits & Chapters",
    }
  }
}

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

export default async function TechPostPage({ params }: TechPostPageProps) {
  const { slug } = await params
  return <TechPostPageClient slug={slug} />
}
