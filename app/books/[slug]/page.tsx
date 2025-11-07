import type { Metadata } from "next"
import BooksPostPageClient from "./BooksPostPageClient"
import { client, urlFor } from "@/lib/sanity"

export const revalidate = 60

interface BooksPostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: BooksPostPageProps): Promise<Metadata> {
  const { slug } = await params

  try {
    const query = `
      *[_type == "post" && category->type == "books" && slug.current == $slug][0] {
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
      : `${process.env.NEXT_PUBLIC_SITE_URL || "https://example.com"}/og-image-default.jpg`

    return {
      title: post.title,
      description: post.excerpt || "Read this book review on Circuits & Chapters",
      openGraph: {
        title: post.title,
        description: post.excerpt || "Read this book review",
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
      title: "Book Review",
      description: "Read this book review on Circuits & Chapters",
    }
  }
}

export async function generateStaticParams() {
  try {
    const query = `
      *[_type == "post" && category->type == "books"] {
        slug
      }
    `

    const posts = await client.fetch(query)
    return (
      posts?.map((post: { slug: { current: string } }) => ({
        slug: post.slug.current,
      })) || []
    )
  } catch (error) {
    console.error("Error generating static params:", error)
    return []
  }
}

export default async function BooksPostPage({ params }: BooksPostPageProps) {
  const { slug } = await params

  return <BooksPostPageClient slug={slug} />
}
