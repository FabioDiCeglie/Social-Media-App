import gql from "graphql-tag";

export const typeDefs = gql`
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
    password: String!
    picturePath: String
    friends: [Friend]
    location: String
    occupation: String
    viewedProfile: String
    token: String
    impressions: Int
  }

  type Query {
    user(id: String): [User]
    userFriends(id: String): [Friend]
    login(email: String, password: String): User
  }

  type Mutation {
    addRemoveFriend(id: String, friendId: String): [Friend]
  }
`;
