import React, { useState } from "react";
import {graphql} from "react-apollo";
import {flowRight as compose} from 'lodash';
import {getUsersQuery, addUserMutation} from "./queries/queries";

function Register(props){
  console.log(props);
  const [newUser, setUser] = useState({
    fname: "",
    lname: "",
    email: "",
    password: ""
  });
  function changeHandler(event) {
    var { name, value } = event.target;
    setUser((prevValue) => {
      return {
        ...prevValue,
        [name]: value
      };
    });
  }

  return (
    <div>
      <input
        onChange={changeHandler}
        name="fname"
        type="text"
        placeholder="First Name"
        autocomplete="off"
        value={newUser.fname}
      />
      <input
        onChange={changeHandler}
        name="lname"
        type="text"
        placeholder="Last Name"
        autocomplete="off"
        value={newUser.lname}
      />
      <input
        onChange={changeHandler}
        name="email"
        type="email"
        placeholder="Email"
        autocomplete="off"
        value={newUser.email}
      />
      <input
        onChange={changeHandler}
        name="password"
        type="password"
        placeholder="Password"
        value={newUser.password}
      />
      <button
        onClick={(event) => {
          event.preventDefault();
           props.addUserMutation({
             variables:{
               fname: newUser.fname,
               lname: newUser.lname,
               email: newUser.email,
               password:newUser.password
             },
             refetchQueries: [{query:getUsersQuery}]
           });
           props.setRegister(true);
        }}
      >
        Register
      </button>
    </div>
  );
}

export default compose(
  graphql(getUsersQuery, {name:"getUsersQuery"}),
  graphql(addUserMutation, {name:"addUserMutation"}))(Register);
