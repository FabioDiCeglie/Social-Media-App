import { gql } from "@apollo/client";

export const LIKE_POST = gql`
  mutation Mutation($postId: String!, $userId: String!) {
    likePost(id: $postId, userId: $userId) {
      description
      firstName
      id
      lastName
      likes {
        id
        status
      }
      location
      picturePath
      userId
      userPicturePath
      comments
    }
  }
`;

export const ADD_REMOVE_FRIEND = gql`
  mutation AddRemoveFriend($friendId: String, $userId: String) {
    addRemoveFriend(friendId: $friendId, id: $userId) {
      firstName
      id
      lastName
      occupation
      location
      picturePath
    }
  }
`;
