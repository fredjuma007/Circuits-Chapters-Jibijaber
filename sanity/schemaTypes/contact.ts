import { defineField, defineType } from "sanity"

export const contact = defineType({
  name: "contact",
  title: "Contact Submission",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: "subject",
      title: "Subject",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "message",
      title: "Message",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "submittedAt",
      title: "Submitted At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      readOnly: true,
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "New", value: "new" },
          { title: "Read", value: "read" },
          { title: "Replied", value: "replied" },
          { title: "Archived", value: "archived" },
        ],
      },
      initialValue: "new",
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "subject",
      email: "email",
      status: "status",
    },
    prepare(selection) {
      const { title, subtitle, email, status } = selection
      return {
        title: `${title} (${email})`,
        subtitle: `${subtitle} - Status: ${status}`,
      }
    },
  },
  orderings: [
    {
      title: "Submitted Date, New",
      name: "submittedAtDesc",
      by: [{ field: "submittedAt", direction: "desc" }],
    },
    {
      title: "Status",
      name: "statusAsc",
      by: [{ field: "status", direction: "asc" }],
    },
  ],
})
