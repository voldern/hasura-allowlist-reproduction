import { GraphQLClient, RequestOptions } from 'graphql-request';
import { GraphQLError, print } from 'graphql'
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
type GraphQLClientRequestHeaders = RequestOptions['requestHeaders'];
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Author = {
  __typename?: 'Author';
  books?: Maybe<Array<Maybe<Book>>>;
  name?: Maybe<Scalars['String']['output']>;
};

export type Book = {
  __typename?: 'Book';
  author?: Maybe<Author>;
  name?: Maybe<Scalars['String']['output']>;
};

export type Query = {
  __typename?: 'Query';
  book?: Maybe<Book>;
};

export type AuthorDataFragment = { __typename?: 'Author', name?: string | null };

export type BookDataFragment = { __typename?: 'Book', name?: string | null, author?: { __typename?: 'Author', name?: string | null } | null };

export type GetBookQueryVariables = Exact<{ [key: string]: never; }>;


export type GetBookQuery = { __typename?: 'Query', book?: { __typename?: 'Book', name?: string | null, author?: { __typename?: 'Author', name?: string | null } | null } | null };

export const AuthorDataFragmentDoc = gql`
    fragment AuthorData on Author {
  name
}
    `;
export const BookDataFragmentDoc = gql`
    fragment BookData on Book {
  name
  author {
    ...AuthorData
  }
}
    ${AuthorDataFragmentDoc}`;
export const GetBookDocument = gql`
    query GetBook {
  book {
    ...BookData
  }
}
    ${BookDataFragmentDoc}`;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string, variables?: any) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType, _variables) => action();
const GetBookDocumentString = print(GetBookDocument);
export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    GetBook(variables?: GetBookQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<{ data: GetBookQuery; errors?: GraphQLError[]; extensions?: any; headers: Headers; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<GetBookQuery>(GetBookDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetBook', 'query', variables);
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;