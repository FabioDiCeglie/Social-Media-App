import { gql } from "@apollo/client";

export const LIKE_POST = gql`
  mutation Mutation($likePostId: String!, $userId: String!) {
    likePost(id: $likePostId, userId: $userId) {
      description
      firstName
      id
      lastName
      likes {
        userId
      }
      location
      picturePath
      userId
      userPicturePath
      comments
    }
  }
`;
