import { gql } from "apollo-boost"
// Posts Queries
export const GET_POST = gql `
    query {
        getPosts{
            _id
            title
            imageUrl
            description
            likes
        }
    }
`

// User queries
export const SIGNIN_USER = gql `
    mutation($username:String!,$password:String!){
        signinUser(username:$username,password:$password){
            token
        }
    }
`

export const SIGNUP_USER = gql `
    mutation($username:String!,$email:String!,$password:String!){
        signupUser(username:$username,email:$email,password:$password){
            token
        }
    }
`

export const GET_CURRENT_USER = gql `
    query{
        getCurrentUser{
            _id
            username
            email
            password
            avatar
            joinDate
            favorites{
                _id
                title
                imageUrl
            }
        }
    }
`