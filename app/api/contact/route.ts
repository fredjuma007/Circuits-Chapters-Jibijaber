import { type NextRequest, NextResponse } from "next/server"
import { client } from "@/lib/sanity"

export async function POST(request: NextRequest) {
  try {
    console.log("[v0] Contact API route called")

    console.log("[v0] Sanity config debug:")
    console.log("- Project ID:", process.env.NEXT_PUBLIC_SANITY_PROJECT_ID)
    console.log("- Dataset:", process.env.NEXT_PUBLIC_SANITY_DATASET)
    console.log("- Token exists:", !!process.env.SANITY_API_TOKEN)
    console.log("- Token length:", process.env.SANITY_API_TOKEN?.length || 0)
    console.log("- Token starts with:", process.env.SANITY_API_TOKEN?.substring(0, 10) + "...")

    const body = await request.json()
    console.log("[v0] Request body:", body)

    const { name, email, subject, message } = body

    // Validate required fields
    if (!name || !email || !subject || !message) {
      console.log("[v0] Validation failed - missing fields")
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    console.log("[v0] Creating document in Sanity...")

    // Create contact submission in Sanity
    const result = await client.create({
      _type: "contact",
      name,
      email,
      subject,
      message,
      submittedAt: new Date().toISOString(),
      status: "new",
    })

    console.log("[v0] Document created successfully:", result._id)

    return NextResponse.json({ message: "Contact form submitted successfully", id: result._id }, { status: 200 })
  } catch (error) {
    console.error("[v0] Error submitting contact form:", error)

    if (error instanceof Error) {
      console.log("[v0] Error message:", error.message)
      console.log("[v0] Error stack:", error.stack)
    }

    console.log("[v0] Full error object:", JSON.stringify(error, null, 2))

    if (error instanceof Error) {
      // Check for Sanity permission errors
      if (error.message.includes("Insufficient permissions") || error.message.includes("permission")) {
        return NextResponse.json(
          {
            error: "Configuration error: Please check your Sanity API token has write permissions",
            details: "Make sure your API token has 'Editor' or 'Admin' permissions in your Sanity dashboard",
          },
          { status: 500 },
        )
      }

      // Check for Sanity connection errors
      if (error.message.includes("ENOTFOUND") || error.message.includes("network")) {
        return NextResponse.json(
          {
            error: "Connection error: Please check your Sanity configuration",
          },
          { status: 500 },
        )
      }
    }

    return NextResponse.json({ error: "Failed to submit contact form. Please try again." }, { status: 500 })
  }
}
