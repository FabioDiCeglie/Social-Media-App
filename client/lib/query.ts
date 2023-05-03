import { gql } from "@apollo/client";

export const LOGIN = gql`
  query Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      firstName
      lastName
      email
      picturePath
      friends {
        id
        firstName
        lastName
        occupation
        location
        picturePath
      }
      location
      occupation
      viewedProfile
      token
      impressions
    }
  }
`;

export const GET_USER = gql`
  query User($userId: String) {
    user(id: $userId) {
      email
      firstName
      id
      impressions
      lastName
      location
      occupation
      password
      picturePath
      token
      viewedProfile
      friends {
        picturePath
        occupation
        location
        lastName
        id
        firstName
      }
    }
  }
`;
