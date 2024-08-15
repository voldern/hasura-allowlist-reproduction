import { gql } from "../generated";

export const BookDataFragment = gql(`
fragment BookData on Book {
  name
  author {
    ...AuthorData
  }
}
`);
