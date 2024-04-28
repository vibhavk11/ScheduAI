/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "query GetPriorities {\n  priorities {\n    key\n    value\n  }\n}": types.GetPrioritiesDocument,
    "mutation CreateScheduaiTask($input: CreateScheduaiTaskInput!) {\n  createScheduaiTask(input: $input) {\n    scheduaiTask {\n      id\n      title\n      description\n      dueTime\n      priority\n    }\n  }\n}\n\nmutation MarkTaskAsCompleted($input: MarkTaskAsCompletedInput!) {\n  markTaskAsCompleted(input: $input) {\n    boolean\n  }\n}": types.CreateScheduaiTaskDocument,
    "query ScheduaiTasksById($input: String!) {\n  scheduaiTasksById(id: $input) {\n    id\n    title\n    description\n    priority\n    estimatedTimeInHours\n    dueTime\n    startTime\n    endTime\n    aiRecommendation\n    isComplete\n  }\n}": types.ScheduaiTasksByIdDocument,
    "query TestQuery {\n  test\n}": types.TestQueryDocument,
    "query GetUserById($input: CreateUserInput!) {\n  userById(input: $input) {\n    id\n    username\n    email\n  }\n}": types.GetUserByIdDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetPriorities {\n  priorities {\n    key\n    value\n  }\n}"): (typeof documents)["query GetPriorities {\n  priorities {\n    key\n    value\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CreateScheduaiTask($input: CreateScheduaiTaskInput!) {\n  createScheduaiTask(input: $input) {\n    scheduaiTask {\n      id\n      title\n      description\n      dueTime\n      priority\n    }\n  }\n}\n\nmutation MarkTaskAsCompleted($input: MarkTaskAsCompletedInput!) {\n  markTaskAsCompleted(input: $input) {\n    boolean\n  }\n}"): (typeof documents)["mutation CreateScheduaiTask($input: CreateScheduaiTaskInput!) {\n  createScheduaiTask(input: $input) {\n    scheduaiTask {\n      id\n      title\n      description\n      dueTime\n      priority\n    }\n  }\n}\n\nmutation MarkTaskAsCompleted($input: MarkTaskAsCompletedInput!) {\n  markTaskAsCompleted(input: $input) {\n    boolean\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ScheduaiTasksById($input: String!) {\n  scheduaiTasksById(id: $input) {\n    id\n    title\n    description\n    priority\n    estimatedTimeInHours\n    dueTime\n    startTime\n    endTime\n    aiRecommendation\n    isComplete\n  }\n}"): (typeof documents)["query ScheduaiTasksById($input: String!) {\n  scheduaiTasksById(id: $input) {\n    id\n    title\n    description\n    priority\n    estimatedTimeInHours\n    dueTime\n    startTime\n    endTime\n    aiRecommendation\n    isComplete\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query TestQuery {\n  test\n}"): (typeof documents)["query TestQuery {\n  test\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetUserById($input: CreateUserInput!) {\n  userById(input: $input) {\n    id\n    username\n    email\n  }\n}"): (typeof documents)["query GetUserById($input: CreateUserInput!) {\n  userById(input: $input) {\n    id\n    username\n    email\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;