import gql from "graphql-tag";
import type { DocumentNode } from "graphql/language/ast";

export const typeDefs: DocumentNode = gql`
  type Friend {
    id: String!
    firstName: String!
    lastName: String!
    occupation: String
    location: String
    picturePath: String
  }

  type User {
    id: String!
    firstName: String!
    lastName: String!
    email: String!
    password: String
    picturePath: String
    friends: [Friend]
    location: String
    occupation: String
    viewedProfile: String
    token: String
    impressions: Int
  }

  type Query {
    user(id: String): User
    login(email: String, password: String): User
  }

  type Mutation {
    addRemoveFriend(id: String, friendId: String): [Friend]
  }
`;
