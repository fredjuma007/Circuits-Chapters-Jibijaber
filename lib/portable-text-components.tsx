import Image from "next/image"
import { urlFor } from "@/lib/sanity"
import { ExternalLink } from "lucide-react"

export const techPortableTextComponents = {
  types: {
    image: ({ value }: any) => {
      if (!value?.asset?._ref) {
        return null
      }
      return (
        <div className="my-8 not-prose">
          <div className="relative aspect-video overflow-hidden rounded-xl border border-blue-500/20 shadow-2xl">
            <Image
              src={urlFor(value).width(800).height(450).url() || "/placeholder.svg"}
              alt={value.alt || "Article image"}
              fill
              className="object-cover"
            />
          </div>
          {value.caption && <p className="text-center text-sm text-muted-foreground mt-3 italic">{value.caption}</p>}
        </div>
      )
    },
  },
  marks: {
    link: ({ children, value }: any) => {
      const rel = !value.href.startsWith("/") ? "noopener noreferrer" : undefined
      const target = !value.href.startsWith("/") ? "_blank" : undefined

      return (
        <a
          href={value.href}
          target={target}
          rel={rel}
          className="text-blue-400 no-underline font-medium border-b border-blue-400/30 hover:text-blue-300 hover:border-blue-300/50 transition-all duration-200 inline-flex items-center gap-1"
        >
          {children}
          {target === "_blank" && <ExternalLink className="w-3 h-3" />}
        </a>
      )
    },
  },
}

export const booksPortableTextComponents = {
  types: {
    image: ({ value }: any) => {
      if (!value?.asset?._ref) {
        return null
      }
      return (
        <div className="my-8 not-prose">
          <div className="relative aspect-video overflow-hidden rounded-xl border border-amber-500/20 shadow-2xl">
            <Image
              src={urlFor(value).width(800).height(450).url() || "/placeholder.svg"}
              alt={value.alt || "Article image"}
              fill
              className="object-cover"
            />
          </div>
          {value.caption && (
            <p className="text-center text-sm text-muted-foreground mt-3 italic font-serif">{value.caption}</p>
          )}
        </div>
      )
    },
  },
  marks: {
    link: ({ children, value }: any) => {
      const rel = !value.href.startsWith("/") ? "noopener noreferrer" : undefined
      const target = !value.href.startsWith("/") ? "_blank" : undefined

      return (
        <a
          href={value.href}
          target={target}
          rel={rel}
          className="text-amber-400 no-underline font-medium border-b border-amber-400/30 hover:text-amber-300 hover:border-amber-300/50 transition-all duration-200 inline-flex items-center gap-1"
        >
          {children}
          {target === "_blank" && <ExternalLink className="w-3 h-3" />}
        </a>
      )
    },
  },
}
