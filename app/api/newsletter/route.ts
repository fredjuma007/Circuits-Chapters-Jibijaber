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
        // Removed updateEnabled to get proper duplicate errors
      }),
    })

    if (!brevoResponse.ok) {
      let errorData
      try {
        const responseText = await brevoResponse.text()
        errorData = responseText ? JSON.parse(responseText) : {}
      } catch (parseError) {
        console.error("Failed to parse Brevo error response:", parseError)
        errorData = { message: "Unknown error" }
      }

      console.error("Brevo API error:", errorData)

      // Handle specific Brevo errors for existing contacts
      if (
        errorData.code === "duplicate_parameter" ||
        errorData.code === "contact_already_exist" ||
        errorData.code === "duplicate_contact" ||
        (errorData.message && errorData.message.toLowerCase().includes("already exists")) ||
        (errorData.message && errorData.message.toLowerCase().includes("duplicate")) ||
        (brevoResponse.status === 400 && errorData.message && errorData.message.toLowerCase().includes("contact"))
      ) {
        return NextResponse.json({ message: "You are already subscribed to our newsletter!" }, { status: 200 })
      }

      return NextResponse.json({ error: "Failed to subscribe to newsletter" }, { status: 500 })
    }

    let result
    try {
      const responseText = await brevoResponse.text()
      result = responseText ? JSON.parse(responseText) : { success: true }
    } catch (parseError) {
      console.log("Brevo response was not JSON, but request was successful")
      result = { success: true }
    }

    console.log("Successfully added contact to Brevo:", result)

    return NextResponse.json({ message: "Successfully subscribed to newsletter!" }, { status: 200 })
  } catch (error) {
    console.error("Newsletter signup error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
