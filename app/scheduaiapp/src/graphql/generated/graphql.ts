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
  /** The built-in `Decimal` scalar type. */
  Decimal: { input: any; output: any; }
};

export type CreateScheduaiTaskInput = {
  description: Scalars['String']['input'];
  dueTime: Scalars['Decimal']['input'];
  estimatedTimeInHours: Scalars['Int']['input'];
  priority: Priority;
  startTime: Scalars['Decimal']['input'];
  title: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};

export type CreateScheduaiTaskPayload = {
  __typename?: 'CreateScheduaiTaskPayload';
  scheduaiTask?: Maybe<ScheduaiTask>;
};

export type CreateUserInput = {
  email: Scalars['String']['input'];
  id: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type KeyValuePairOfPriorityAndInt32 = {
  __typename?: 'KeyValuePairOfPriorityAndInt32';
  key: Priority;
  value: Scalars['Int']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createScheduaiTask: CreateScheduaiTaskPayload;
  test: TestPayload;
};


export type MutationCreateScheduaiTaskArgs = {
  input: CreateScheduaiTaskInput;
};


export type MutationTestArgs = {
  input: TestInput;
};

export enum Priority {
  High = 'HIGH',
  Low = 'LOW',
  Medium = 'MEDIUM',
  Urgent = 'URGENT'
}

export type Query = {
  __typename?: 'Query';
  priorities: Array<KeyValuePairOfPriorityAndInt32>;
  scheduaiTasksById: Array<ScheduaiTask>;
  test: Scalars['String']['output'];
  userById: User;
};


export type QueryScheduaiTasksByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryUserByIdArgs = {
  input: CreateUserInput;
};

export type ScheduaiTask = {
  __typename?: 'ScheduaiTask';
  aiRecommendation?: Maybe<Scalars['String']['output']>;
  createDate: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  dueTime?: Maybe<Scalars['Decimal']['output']>;
  endTime?: Maybe<Scalars['Decimal']['output']>;
  estimatedTimeInHours: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  isComplete: Scalars['Boolean']['output'];
  priority: Priority;
  startTime?: Maybe<Scalars['Decimal']['output']>;
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

export type GetPrioritiesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPrioritiesQuery = { __typename?: 'Query', priorities: Array<{ __typename?: 'KeyValuePairOfPriorityAndInt32', key: Priority, value: number }> };

export type CreateScheduaiTaskMutationVariables = Exact<{
  input: CreateScheduaiTaskInput;
}>;


export type CreateScheduaiTaskMutation = { __typename?: 'Mutation', createScheduaiTask: { __typename?: 'CreateScheduaiTaskPayload', scheduaiTask?: { __typename?: 'ScheduaiTask', id: number, title: string, description: string, dueTime?: any | null, priority: Priority } | null } };

export type ScheduaiTasksByIdQueryVariables = Exact<{
  input: Scalars['String']['input'];
}>;


export type ScheduaiTasksByIdQuery = { __typename?: 'Query', scheduaiTasksById: Array<{ __typename?: 'ScheduaiTask', id: number, title: string, description: string, priority: Priority, estimatedTimeInHours: number, dueTime?: any | null, startTime?: any | null, endTime?: any | null, aiRecommendation?: string | null }> };

export type TestQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type TestQueryQuery = { __typename?: 'Query', test: string };

export type GetUserByIdQueryVariables = Exact<{
  input: CreateUserInput;
}>;


export type GetUserByIdQuery = { __typename?: 'Query', userById: { __typename?: 'User', id: string, username: string, email: string } };


export const GetPrioritiesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPriorities"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"priorities"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}}]} as unknown as DocumentNode<GetPrioritiesQuery, GetPrioritiesQueryVariables>;
export const CreateScheduaiTaskDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateScheduaiTask"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateScheduaiTaskInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createScheduaiTask"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"scheduaiTask"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"dueTime"}},{"kind":"Field","name":{"kind":"Name","value":"priority"}}]}}]}}]}}]} as unknown as DocumentNode<CreateScheduaiTaskMutation, CreateScheduaiTaskMutationVariables>;
export const ScheduaiTasksByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ScheduaiTasksById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"scheduaiTasksById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"priority"}},{"kind":"Field","name":{"kind":"Name","value":"estimatedTimeInHours"}},{"kind":"Field","name":{"kind":"Name","value":"dueTime"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"endTime"}},{"kind":"Field","name":{"kind":"Name","value":"aiRecommendation"}}]}}]}}]} as unknown as DocumentNode<ScheduaiTasksByIdQuery, ScheduaiTasksByIdQueryVariables>;
export const TestQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"TestQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"test"}}]}}]} as unknown as DocumentNode<TestQueryQuery, TestQueryQueryVariables>;
export const GetUserByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUserById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]} as unknown as DocumentNode<GetUserByIdQuery, GetUserByIdQueryVariables>;