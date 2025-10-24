"use server"

import { client, type Post } from "@/lib/sanity"

export async function getPost(slug: string): Promise<Post | null> {
  try {
    const query = `
      *[_type == "post" && slug.current == $slug][0] {
        _id,
        title,
        slug,
        category->{
          _id,
          name,
          type,
          subcategory,
          slug
        },
        featuredImage,
        excerpt,
        content,
        _createdAt
      }
    `

    const result = await client.fetch(query, { slug })
    return result
  } catch (error) {
    console.error("Error fetching post:", error)
    return null
  }
}

export async function getPostsByCategory(categoryType: "tech" | "books", slug: string): Promise<Post | null> {
  try {
    const query = `
      *[_type == "post" && slug.current == $slug && category->type == $categoryType][0] {
        _id,
        title,
        slug,
        category->{
          _id,
          name,
          type,
          subcategory,
          slug
        },
        featuredImage,
        excerpt,
        content,
        _createdAt
      }
    `

    const result = await client.fetch(query, { slug, categoryType })
    return result
  } catch (error) {
    console.error("Error fetching post by category:", error)
    return null
  }
}

export async function getRelatedPosts(categoryId: string, currentPostId: string): Promise<Post[]> {
  try {
    const query = `
      *[_type == "post" && category._ref == $categoryId && _id != $currentPostId] | order(_createdAt desc) [0...3] {
        _id,
        title,
        slug,
        category->{
          _id,
          name,
          type,
          subcategory,
          slug
        },
        featuredImage,
        excerpt,
        _createdAt
      }
    `

    const posts = await client.fetch(query, { categoryId, currentPostId })
    return posts || []
  } catch (error) {
    console.error("Error fetching related posts:", error)
    return []
  }
}
