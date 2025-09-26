import { category } from "./category"
import { post } from "./post"
import { contact } from "./contact"

export const schemaTypes = [category, post, contact]

export const schema = {
  types: schemaTypes,
}
