import type React from "react"
import { COMING_SOON_MODE } from "@/lib/coming-soon-toggle"
import ComingSoon from "./coming-soon"

export default function ComingSoonWrapper({ children }: { children: React.ReactNode }) {
  if (COMING_SOON_MODE) {
    return <ComingSoon />
  }

  return <>{children}</>
}
