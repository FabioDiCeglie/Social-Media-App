import gql from "graphql-tag";
import type { DocumentNode } from "graphql/language/ast";

export const typeDefs: DocumentNode = gql`
  type Like {
    userId: Boolean
  }

  type Post {
    id: String!
    userId: String!
    firstName: String!
    lastName: String!
    location: String
    description: String
    picturePath: String
    userPicturePath: String
    likes: [Like]
    comments: [String]
  }

  type Query {
    feedPosts: [Post]
    userPosts(userId: String!): [Post]
  }

  type Mutation {
    likePost(id: String!, userId: String!): Post
  }
`;
