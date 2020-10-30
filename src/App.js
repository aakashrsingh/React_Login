import React, { useState } from "react";
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from "react-apollo";
import Login from "./Login";
import Register from "./Register";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql"
});


export default function App() {
  const [isRegistered, setRegister] = useState(true);
  return (
    <ApolloProvider client={client}>
    <div className="container">
      <h1>Hello!</h1>
      <form>
       {isRegistered?<Login setRegister={setRegister}/>:<Register setRegister={setRegister}/>}
      </form>
    </div>
    </ApolloProvider>
  );
}
