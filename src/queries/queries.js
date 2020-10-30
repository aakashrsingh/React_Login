import {gql} from "apollo-boost";

const getUsersQuery = gql`{
  users{
    email
    password
  }
}`

const addUserMutation = gql`
  mutation($fname:String!,$lname:String!,$email:String!,$password:String!){
    addUser(fname:$fname, lname:$lname, email:$email, password:$password){
      email
      password
    }
  }`

  const getUserQuery = gql`
    query($email:String){
      user(email:$email){
        email
        password
      }
    }`
export {getUsersQuery, addUserMutation, getUserQuery};
