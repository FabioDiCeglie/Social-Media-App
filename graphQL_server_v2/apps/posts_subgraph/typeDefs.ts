import gql from "graphql-tag";

export const typeDefs = gql`
  type Like {
    userId: Boolean
  }

  type Comment {
    id: String!
    firstName: String!
    lastName: String!
    occupation: String
    location: String
    picturePath: String
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
    likes: Like
    comments: [Comment]
  }

  type Query {
    feedPosts: [Post]
    userPost(userId: String!): [Post]
  }

  type Mutation {
    likePost(id: String!, userId: String!): [Post]
  }
`;
