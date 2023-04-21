import {  gql } from '@apollo/client';

export const LOGIN = gql`
    query Login($email: String!, $password: String!) {
        login(email: $email, password: $password)  {
            id
            firstName
            lastName
            email
            password
            picturePath
            friends{
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