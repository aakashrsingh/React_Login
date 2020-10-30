import React, { useState } from "react";
import {gql} from "apollo-boost";
import {graphql} from "react-apollo";

const getUsersQuery = gql`{
  users{
    email
    password
  }
}`


function Input(props) {
//state variables

  const data=props.data;
  console.log(props);
  const [newUser, setUser] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    confirmpassword: ""
  });
  const [existingUser, setExistingUser] = useState({
    email: "",
    password: "",
  });
  const [isRegistered, setRegister] = useState(true);

  //changeHandler functions

  function handler(event){
    var {name, value} = event.target;
    setExistingUser((prevValue)=>{
      return{
        ...prevValue,
        [name]: value
      };
    });
  }

  function changeHandler(event) {
    var { name, value } = event.target;
    setUser((prevValue) => {
      return {
        ...prevValue,
        [name]: value
      };
    });
  }
//result page handler function
  function login(event){
    if(data.loading)
    return(<div><h1> Loading...</h1></div>);
      else{
        const user=data.users.findOne({email:existingUser.email});
      if((user!==null)&&(user.password===existingUser.password)){
        return <h1>Congrats!</h1>;
      }
        else{
          setRegister(false);
        }
      }
      event.preventDefault();
      }

  function register(event) {
    setRegister(false);
    event.preventDefault();
  }

  return (
    <form>
      {isRegistered ? (
        <div>
          <input onChange={handler} name="email" type="email" placeholder="Email" value={existingUser.email}/>
          <input onChange={handler} name="password" type="password" placeholder="Password" value={existingUser.password}/>
          <button onClick={login}>Login</button>
          <button onClick={register}>Register</button>
        </div>
      ) : (
        <div>
          <input
            onChange={changeHandler}
            name="fname"
            type="text"
            placeholder="First Name"
            value={newUser.fname}
          />
          <input
            onChange={changeHandler}
            name="lname"
            type="text"
            placeholder="Last Name"
            value={newUser.lname}
          />
          <input
            onChange={changeHandler}
            name="email"
            type="email"
            placeholder="Email"
            value={newUser.email}
          />
          <input
            onChange={changeHandler}
            name="password"
            type="password"
            placeholder="Password"
            value={newUser.password}
          />
          <input
            onChange={changeHandler}
            name="confirmpassword"
            type="password"
            placeholder="Confirm Password"
            value={newUser.confirmpassword}
          />
          <button
            onClick={(event) => {
              props.register(newUser);
              event.preventDefault();
            }}
          >
            Register
          </button>
        </div>
      )}
    </form>
  );
}

export default graphql(getUsersQuery)(Input);
