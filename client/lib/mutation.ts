import { gql } from "@apollo/client";

export const SIGN_UP = gql`
  mutation Mutation(
    $firstName: String
    $lastName: String
    $email: String
    $password: String
    $picturePath: String
    $location: String
    $occupation: String
  ) {
    register(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
      picturePath: $picturePath
      location: $location
      occupation: $occupation
    ) {
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
