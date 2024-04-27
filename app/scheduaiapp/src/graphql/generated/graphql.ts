/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** The `DateTime` scalar represents an ISO-8601 compliant date time type. */
  DateTime: { input: any; output: any; }
};

export type CreateUserInput = {
  email: Scalars['String']['input'];
  id: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  test: TestPayload;
};


export type MutationTestArgs = {
  input: TestInput;
};

export type Query = {
  __typename?: 'Query';
  test: Scalars['String']['output'];
  userById: User;
};


export type QueryUserByIdArgs = {
  input: CreateUserInput;
};

export type ScheduaiTask = {
  __typename?: 'ScheduaiTask';
  aiRecommendation?: Maybe<Scalars['String']['output']>;
  description: Scalars['String']['output'];
  dueDate?: Maybe<Scalars['DateTime']['output']>;
  endDate?: Maybe<Scalars['DateTime']['output']>;
  estimatedTimeInHours: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  isComplete: Scalars['Boolean']['output'];
  priority: Scalars['Int']['output'];
  startDate?: Maybe<Scalars['DateTime']['output']>;
  title: Scalars['String']['output'];
  user: User;
  userId: Scalars['String']['output'];
};

export type TestInput = {
  input: Scalars['String']['input'];
};

export type TestPayload = {
  __typename?: 'TestPayload';
  string?: Maybe<Scalars['String']['output']>;
};

export type User = {
  __typename?: 'User';
  email: Scalars['String']['output'];
  id: Scalars['String']['output'];
  tasks: Array<ScheduaiTask>;
  username: Scalars['String']['output'];
};

export type TestQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type TestQueryQuery = { __typename?: 'Query', test: string };

export type GetUserByIdQueryVariables = Exact<{
  input: CreateUserInput;
}>;


export type GetUserByIdQuery = { __typename?: 'Query', userById: { __typename?: 'User', id: string, username: string, email: string } };


export const TestQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"TestQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"test"}}]}}]} as unknown as DocumentNode<TestQueryQuery, TestQueryQueryVariables>;
export const GetUserByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUserById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]} as unknown as DocumentNode<GetUserByIdQuery, GetUserByIdQueryVariables>;