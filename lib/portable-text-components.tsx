"use client"

import type { PortableTextComponents, PortableTextMarkComponentProps } from "@portabletext/react"
import Image from "next/image"
import Link from "next/link"
import { urlFor } from "@/lib/sanity"

interface ImageBlock {
  _type: "imageBlock"
  image: { asset: any }
  alt?: string
  size?: "small" | "medium" | "large" | "full"
  caption?: string
}

interface YouTubeBlock {
  _type: "youtubeEmbed"
  url: string
}

interface GalleryImage {
  image: { asset: any }
  alt?: string
  caption?: string
}

interface GalleryBlock {
  _type: "imageGallery"
  images: GalleryImage[]
  columns?: number
}

interface CalloutBlock {
  _type: "callout"
  text: string
  type: "info" | "warning" | "success"
}

interface LinkMark {
  _type: "link"
  href: string
  blank?: boolean
}

interface BlockNode {
  textColor?: string
  alignment?: "left" | "center" | "right"
}

const getYouTubeId = (url: string): string | null => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
  const match = url.match(regExp)
  return match && match[2].length === 11 ? match[2] : null
}

const getColorClass = (color?: string): string => {
  const colorMap: Record<string, string> = {
    blue: "text-blue-600 dark:text-blue-400",
    amber: "text-amber-600 dark:text-amber-400",
    gray: "text-gray-600 dark:text-gray-400",
    red: "text-red-600 dark:text-red-400",
    green: "text-green-600 dark:text-green-400",
    purple: "text-purple-600 dark:text-purple-400",
    default: "",
  }
  return colorMap[color || "default"]
}

const getAlignmentClass = (alignment?: string): string => {
  const alignmentMap: Record<string, string> = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  }
  return alignmentMap[alignment || "left"]
}

const sharedComponents = {
  types: {
    imageBlock: ({ value }: { value: ImageBlock }) => {
      if (!value?.image?.asset) return null

      const sizeMap = {
        small: 300,
        medium: 600,
        large: 800,
        full: 1200,
      }

      const width = sizeMap[value.size || "large"]

      return (
        <figure className="my-8">
          <div className="relative overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800 shadow-lg">
            <Image
              src={urlFor(value.image.asset).width(width).url() || "/placeholder.svg"}
              alt={value.alt || "Blog image"}
              width={width}
              height={Math.round((width * 9) / 16)}
              className="w-full h-auto"
            />
          </div>
          {value.caption && (
            <figcaption className="mt-3 text-center text-sm text-gray-600 dark:text-gray-400 italic">
              {value.caption}
            </figcaption>
          )}
        </figure>
      )
    },

    youtubeEmbed: ({ value }: { value: YouTubeBlock }) => {
      if (!value?.url) return null
      const videoId = getYouTubeId(value.url)
      if (!videoId) return null

      return (
        <div className="my-8 aspect-video w-full overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800 shadow-lg">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}`}
            title="YouTube video"
            className="w-full h-full"
            allowFullScreen
            loading="lazy"
          />
        </div>
      )
    },

    imageGallery: ({ value }: { value: GalleryBlock }) => {
      if (!value?.images || value.images.length === 0) return null

      const columns = value.columns || 3
      const gridStyle = {
        display: "grid",
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
        gap: "1rem",
      }

      return (
        <div style={gridStyle} className="my-8">
          {value.images.map((image, idx) => (
            <div key={idx} className="relative overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800">
              <Image
                src={image.image?.asset ? urlFor(image.image.asset).width(400).url() : "/placeholder.svg"}
                alt={image.alt || `Gallery image ${idx + 1}`}
                width={400}
                height={300}
                className="w-full h-auto object-cover"
              />
            </div>
          ))}
        </div>
      )
    },

    callout: ({ value }: { value: CalloutBlock }) => {
      const styles = {
        info: "bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800 text-blue-900 dark:text-blue-100",
        warning:
          "bg-yellow-50 dark:bg-yellow-950 border-yellow-200 dark:border-yellow-800 text-yellow-900 dark:text-yellow-100",
        success:
          "bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800 text-green-900 dark:text-green-100",
      }

      const icons = {
        info: "ℹ️",
        warning: "⚠️",
        success: "✓",
      }

      return (
        <div className={`my-6 rounded-lg border-l-4 p-4 ${styles[value.type]}`}>
          <div className="flex gap-3">
            <span className="text-xl">{icons[value.type]}</span>
            <p className="m-0">{value.text}</p>
          </div>
        </div>
      )
    },
  },

  marks: {
    link: ({ children, value }: PortableTextMarkComponentProps<LinkMark>) => {
      const href = value?.href || "#"
      const target = value?.blank ? "_blank" : undefined
      const rel = value?.blank ? "noopener noreferrer" : undefined

      return (
        <Link href={href} target={target} rel={rel} className="underline hover:opacity-80">
          {children}
        </Link>
      )
    },

    code: ({ children }: PortableTextMarkComponentProps<any>) => (
      <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded font-mono text-sm border border-gray-200 dark:border-gray-800">
        {children}
      </code>
    ),

    textColor: ({ children, value }: PortableTextMarkComponentProps<any>) => {
      const color = value?.color || "default"
      const colorClass = getColorClass(color)
      return <span className={colorClass}>{children}</span>
    },

    textAlign: ({ children, value }: PortableTextMarkComponentProps<any>) => {
      const alignment = value?.align || "left"
      const alignmentClass = getAlignmentClass(alignment)
      return <span className={alignmentClass}>{children}</span>
    },
  },

  block: {
    h2: ({ children }: any) => {
      return <h2 className="text-2xl font-bold mt-8 mb-4">{children}</h2>
    },
    h3: ({ children }: any) => {
      return <h3 className="text-xl font-bold mt-6 mb-3">{children}</h3>
    },
    h4: ({ children }: any) => {
      return <h4 className="text-lg font-bold mt-4 mb-2">{children}</h4>
    },
    h5: ({ children }: any) => {
      return <h5 className="text-base font-bold mt-3 mb-2">{children}</h5>
    },
    highlight: ({ children }: any) => <mark className="bg-yellow-200 dark:bg-yellow-800 px-1 rounded">{children}</mark>,
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 pl-4 italic my-6 text-gray-600 dark:text-gray-400">{children}</blockquote>
    ),
    normal: ({ children }: any) => <p className="mb-4 leading-relaxed">{children}</p>,
  },
}

export const techPortableTextComponents: PortableTextComponents = {
  ...sharedComponents,
  types: {
    ...sharedComponents.types,
    callout: ({ value }: { value: CalloutBlock }) => {
      const styles = {
        info: "bg-blue-50 dark:bg-blue-950 border-blue-300 dark:border-blue-700 text-blue-900 dark:text-blue-100",
        warning:
          "bg-amber-50 dark:bg-amber-950 border-amber-300 dark:border-amber-700 text-amber-900 dark:text-amber-100",
        success:
          "bg-emerald-50 dark:bg-emerald-950 border-emerald-300 dark:border-emerald-700 text-emerald-900 dark:text-emerald-100",
      }

      const icons = {
        info: "ℹ️",
        warning: "⚠️",
        success: "✓",
      }

      return (
        <div className={`my-6 rounded-lg border-l-4 p-4 ${styles[value.type]}`}>
          <div className="flex gap-3">
            <span className="text-xl">{icons[value.type]}</span>
            <p className="m-0">{value.text}</p>
          </div>
        </div>
      )
    },
  },
  marks: {
    ...sharedComponents.marks,
    link: ({ children, value }: PortableTextMarkComponentProps<LinkMark>) => {
      const href = value?.href || "#"
      const target = value?.blank ? "_blank" : undefined
      const rel = value?.blank ? "noopener noreferrer" : undefined

      return (
        <Link
          href={href}
          target={target}
          rel={rel}
          className="text-blue-500 dark:text-blue-400 underline hover:text-blue-600 dark:hover:text-blue-300"
        >
          {children}
        </Link>
      )
    },
  },
  block: {
    ...sharedComponents.block,
    h2: ({ children }: any) => {
      return <h2 className="text-2xl font-bold mt-8 mb-4">{children}</h2>
    },
    h3: ({ children }: any) => {
      return <h3 className="text-xl font-bold mt-6 mb-3">{children}</h3>
    },
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-950 pl-4 py-2 italic my-6 text-blue-900 dark:text-blue-100">
        {children}
      </blockquote>
    ),
  },
}

export const booksPortableTextComponents: PortableTextComponents = {
  ...sharedComponents,
  types: {
    ...sharedComponents.types,
    callout: ({ value }: { value: CalloutBlock }) => {
      const styles = {
        info: "bg-amber-50 dark:bg-amber-950 border-amber-300 dark:border-amber-700 text-amber-900 dark:text-amber-100",
        warning:
          "bg-orange-50 dark:bg-orange-950 border-orange-300 dark:border-orange-700 text-orange-900 dark:text-orange-100",
        success:
          "bg-yellow-50 dark:bg-yellow-950 border-yellow-300 dark:border-yellow-700 text-yellow-900 dark:text-yellow-100",
      }

      const icons = {
        info: "ℹ️",
        warning: "⚠️",
        success: "✓",
      }

      return (
        <div className={`my-6 rounded-lg border-l-4 p-4 ${styles[value.type]}`}>
          <div className="flex gap-3">
            <span className="text-xl">{icons[value.type]}</span>
            <p className="m-0">{value.text}</p>
          </div>
        </div>
      )
    },
  },
  marks: {
    ...sharedComponents.marks,
    link: ({ children, value }: PortableTextMarkComponentProps<LinkMark>) => {
      const href = value?.href || "#"
      const target = value?.blank ? "_blank" : undefined
      const rel = value?.blank ? "noopener noreferrer" : undefined

      return (
        <Link
          href={href}
          target={target}
          rel={rel}
          className="text-amber-600 dark:text-amber-400 underline hover:text-amber-700 dark:hover:text-amber-300"
        >
          {children}
        </Link>
      )
    },
  },
  block: {
    ...sharedComponents.block,
    h2: ({ children }: any) => {
      return <h2 className="text-2xl font-bold mt-8 mb-4">{children}</h2>
    },
    h3: ({ children }: any) => {
      return <h3 className="text-xl font-bold mt-6 mb-3">{children}</h3>
    },
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-amber-600 bg-amber-50 dark:bg-amber-950 pl-4 py-2 italic my-6 text-amber-900 dark:text-amber-100">
        {children}
      </blockquote>
    ),
  },
}
