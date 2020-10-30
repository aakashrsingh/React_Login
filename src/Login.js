import React, { useState } from "react";
import {graphql} from "react-apollo";
import {flowRight as compose} from 'lodash';
import {getUsersQuery, getUserQuery} from "./queries/queries";
import Congrats from "./Congrats";
import Wrong from "./Wrong";

function Login(props)
{
  console.log(props.getUsersQuery);
  const data=props.getUsersQuery;
  const [isSuccessful, setSuccessful] = useState(false);
  const [existingUser, setExistingUser] = useState({
    email: "",
    password: "",
  });

  function handler(event){
    event.preventDefault();
    var {name, value} = event.target;
    setExistingUser((prevValue)=>{
      return{
        ...prevValue,
        [name]: value
      };
    });
  }


function search(a){
    // data.users.find( user => {
    //   return (user.email === a.email);
    // })
    console.log(data.users)
    for(var i=0; i<data.users.length;i++){
        if (data.users[i].email === a.email&& data.users[i].password === a.password) {
          console.log(data.users[i]);
            return true;
        }}
            return false;
        }
    
  function login(event){
      event.preventDefault();
      // refetchQueries: [{query:getUsersQuery}]
      // if(search(existingUser)!==undefined)
        setSuccessful(search(existingUser));
         console.log(search(existingUser));
         
    }
      return (
            <div>
              <input onChange={handler} name="email" type="email" placeholder="Email" value={existingUser.email}/>
              <input onChange={handler} name="password" type="password" placeholder="Password" value={existingUser.password}/>
              <button onClick={login}>Login</button>
              <button onClick={(event)=>{
                props.setRegister(false);
                event.preventDefault();
              }}>Register</button>
              {isSuccessful ? <Congrats /> :<Wrong />}
            </div>
         );
}

export default compose(
graphql(getUsersQuery, {name:"getUsersQuery"}),
graphql(getUserQuery, {name: "getUserQuery"}))(Login);
