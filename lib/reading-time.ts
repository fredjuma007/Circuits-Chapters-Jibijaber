export function calculateReadingTime(content: any[]): number {
  if (!content || !Array.isArray(content)) return 1

  // Extract text from Portable Text content
  const extractText = (blocks: any[]): string => {
    return blocks
      .map((block) => {
        if (block._type === "block" && block.children) {
          return block.children.map((child: any) => child.text || "").join("")
        }
        return ""
      })
      .join(" ")
  }

  const text = extractText(content)
  const wordsPerMinute = 200 // Average reading speed
  const wordCount = text.split(/\s+/).filter((word) => word.length > 0).length
  const readingTime = Math.ceil(wordCount / wordsPerMinute)

  return Math.max(1, readingTime) // Minimum 1 minute
}
