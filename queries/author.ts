import { gql } from "../generated";

export const BookAuthorFragment = gql(`
fragment AuthorData on Author {
  name
}
`);
