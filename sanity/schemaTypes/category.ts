import { defineField, defineType } from "sanity"

export const category = defineType({
  name: "category",
  title: "Category",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "type",
      title: "Type",
      type: "string",
      options: {
        list: [
          { title: "Tech", value: "tech" },
          { title: "Books", value: "books" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "subcategory",
      title: "Subcategory",
      type: "string",
      options: {
        list: [
          // Tech subcategories
          { title: "Gadgets & Devices", value: "gadgets-devices" },
          { title: "Apps & Tools", value: "apps-tools" },
          { title: "Coding/Developer Resources", value: "coding-resources" },
          { title: "Industry Trends", value: "industry-trends" },
          // Books subcategories
          { title: "Reviews", value: "reviews" },
          { title: "Recommendations & Lists", value: "recommendations-lists" },
          { title: "Author Spotlights", value: "author-spotlights" },
          { title: "Book vs. Screen", value: "book-vs-screen" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
})
