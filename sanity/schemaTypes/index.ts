import { category } from "./category"
import { post } from "./post"

export const schemaTypes = [category, post]

export const schema = {
  types: schemaTypes,
}
