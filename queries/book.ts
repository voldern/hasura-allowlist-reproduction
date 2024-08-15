import { gql } from "../generated";

export const BookQuery = gql(`
query GetBook {
  book {
    ...BookData
  }
}
`);
