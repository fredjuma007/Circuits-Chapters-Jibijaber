import BooksPostPageClient from "./BooksPostPageClient"
import { client } from "@/lib/sanity"

export const revalidate = 60

interface BooksPostPageProps {
  params: { slug: string }
}

export default async function BooksPostPage({ params }: BooksPostPageProps) {
  const { slug } = params

  return <BooksPostPageClient slug={slug} />
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
