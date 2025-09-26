import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    const brevoApiKey = process.env.BREVO_API_KEY
    if (!brevoApiKey) {
      console.error("BREVO_API_KEY is not configured")
      return NextResponse.json({ error: "Newsletter service not configured" }, { status: 500 })
    }

    // Add contact to Brevo
    const brevoResponse = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "api-key": brevoApiKey,
      },
      body: JSON.stringify({
        email: email,
        listIds: [1], // Default list ID - you can change this in Brevo dashboard
        updateEnabled: true, // Update contact if already exists
        attributes: {
          FNAME: "", 
          LNAME: "", 
        },
      }),
    })

    if (!brevoResponse.ok) {
      const errorData = await brevoResponse.json()
      console.error("Brevo API error:", errorData)

      // Handle specific Brevo errors
      if (errorData.code === "duplicate_parameter") {
        return NextResponse.json({ message: "You are already subscribed to our newsletter!" }, { status: 200 })
      }

      return NextResponse.json({ error: "Failed to subscribe to newsletter" }, { status: 500 })
    }

    const result = await brevoResponse.json()
    console.log("Successfully added contact to Brevo:", result)

    return NextResponse.json({ message: "Successfully subscribed to newsletter!" }, { status: 200 })
  } catch (error) {
    console.error("Newsletter signup error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
