import { defineField, defineType } from "sanity"

export const post = defineType({
  name: "post",
  title: "Post",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "category" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "featuredImage",
      title: "Featured Image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "array",
      of: [
        // Enhanced block type with headings, quotes, highlights, color, and alignment options
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "Heading 2", value: "h2" },
            { title: "Heading 3", value: "h3" },
            { title: "Heading 4", value: "h4" },
            { title: "Heading 5", value: "h5" },
            { title: "Quote", value: "blockquote" },
            { title: "Highlight", value: "highlight" },
          ],
          marks: {
            decorators: [
              { title: "Bold", value: "strong" },
              { title: "Italic", value: "em" },
              { title: "Underline", value: "underline" },
              { title: "Code", value: "code" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [
                  {
                    name: "href",
                    type: "url",
                    title: "URL",
                    validation: (Rule) =>
                      Rule.required().uri({
                        scheme: ["http", "https", "mailto", "tel"],
                      }),
                  },
                  {
                    name: "blank",
                    type: "boolean",
                    title: "Open in new tab",
                    initialValue: false,
                  },
                ],
              },
              {
                name: "textColor",
                type: "object",
                title: "Text Color",
                fields: [
                  {
                    name: "color",
                    type: "string",
                    title: "Color",
                    options: {
                      list: [
                        { title: "Default", value: "default" },
                        { title: "Blue", value: "blue" },
                        { title: "Amber", value: "amber" },
                        { title: "Red", value: "red" },
                        { title: "Green", value: "green" },
                        { title: "Purple", value: "purple" },
                      ],
                    },
                  },
                ],
              },
              {
                name: "textAlign",
                type: "object",
                title: "Alignment",
                fields: [
                  {
                    name: "align",
                    type: "string",
                    title: "Align",
                    options: {
                      list: [
                        { title: "Left", value: "left" },
                        { title: "Center", value: "center" },
                        { title: "Right", value: "right" },
                      ],
                    },
                  },
                ],
              },
            ],
          },
        },
        // Image block with size selector
        {
          type: "object",
          name: "imageBlock",
          title: "Image",
          fields: [
            {
              name: "image",
              type: "image",
              title: "Image",
              options: {
                hotspot: true,
              },
              validation: (Rule) => Rule.required(),
            },
            {
              name: "alt",
              type: "string",
              title: "Alt Text",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "size",
              type: "string",
              title: "Size",
              options: {
                list: [
                  { title: "Small", value: "small" },
                  { title: "Medium", value: "medium" },
                  { title: "Large", value: "large" },
                  { title: "Full Width", value: "full" },
                ],
              },
              initialValue: "large",
            },
            {
              name: "caption",
              type: "string",
              title: "Caption",
            },
          ],
          preview: {
            select: {
              image: "image",
              alt: "alt",
            },
            prepare(selection) {
              return {
                title: selection.alt || "Image",
                media: selection.image,
              }
            },
          },
        },
        // YouTube embed block
        {
          type: "object",
          name: "youtubeEmbed",
          title: "YouTube Embed",
          fields: [
            {
              name: "url",
              type: "string",
              title: "YouTube URL",
              validation: (Rule) =>
                Rule.required().custom((url: string | undefined) => {
                  if (!url) return true
                  const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube|youtu|youtube-nocookie)\.(com|be)\//
                  return youtubeRegex.test(url) ? true : "Please enter a valid YouTube URL"
                }),
            },
            {
              name: "title",
              type: "string",
              title: "Video Title",
            },
          ],
          preview: {
            select: {
              title: "title",
              url: "url",
            },
            prepare(selection) {
              return {
                title: selection.title || "YouTube Video",
                subtitle: selection.url,
              }
            },
          },
        },
        // Image gallery block
        {
          type: "object",
          name: "imageGallery",
          title: "Image Gallery",
          fields: [
            {
              name: "images",
              type: "array",
              title: "Images",
              of: [
                {
                  type: "object",
                  fields: [
                    {
                      name: "image",
                      type: "image",
                      title: "Image",
                      options: {
                        hotspot: true,
                      },
                      validation: (Rule) => Rule.required(),
                    },
                    {
                      name: "alt",
                      type: "string",
                      title: "Alt Text",
                      validation: (Rule) => Rule.required(),
                    },
                    {
                      name: "caption",
                      type: "string",
                      title: "Caption",
                    },
                  ],
                  preview: {
                    select: {
                      image: "image",
                      alt: "alt",
                    },
                    prepare(selection) {
                      return {
                        title: selection.alt || "Gallery Image",
                        media: selection.image,
                      }
                    },
                  },
                },
              ],
              validation: (Rule) => Rule.required().min(1),
            },
            {
              name: "columns",
              type: "number",
              title: "Columns",
              options: {
                list: [1, 2, 3, 4],
              },
              initialValue: 3,
            },
          ],
          preview: {
            select: {
              images: "images",
            },
            prepare(selection) {
              return {
                title: `Gallery (${selection.images?.length || 0} images)`,
              }
            },
          },
        },
        // Callout box block
        {
          type: "object",
          name: "callout",
          title: "Callout Box",
          fields: [
            {
              name: "type",
              type: "string",
              title: "Type",
              options: {
                list: [
                  { title: "Info", value: "info" },
                  { title: "Warning", value: "warning" },
                  { title: "Success", value: "success" },
                ],
              },
              initialValue: "info",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "text",
              type: "text",
              title: "Text",
              rows: 3,
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: {
              type: "type",
              text: "text",
            },
            prepare(selection) {
              return {
                title: `${selection.type?.charAt(0).toUpperCase()}${selection.type?.slice(1)} Callout`,
                subtitle: selection.text?.substring(0, 50),
              }
            },
          },
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: "title",
      category: "category.name",
      media: "featuredImage",
    },
    prepare(selection) {
      const { title, category, media } = selection
      return {
        title,
        subtitle: category ? `Category: ${category}` : "No category",
        media,
      }
    },
  },
})
