// 1. To import React Hooks use for example: React.useState() or React.useEffect()
import { React, useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
// 2. To add Fragments use: <React.Fragment></React.Fragment>
// 3. You can use bootstrap 5 and CSS
const {
  // you can add others functions of react-router-dom here:
  // if you want use history.push you should use "withRouter"
  HashRouter,
} = ReactRouterDOM;

// You can add other components here

const RegisterForm = () => {


  const userSuccessRegister = (e) => {
    e.preventDefault();
    var formData = new FormData(document.querySelector("form")); //use formData to get values from inputs
    const email = formData.get("email");
    const password = formData.get("password");
    // write your code here
    if (email === "example@email.com" && password === "password") {
      window.location.href = "/SecondPage";
    }
  };

  return (
    <div>
      <form onSubmit={userSuccessRegister}>
        <div>
          <label htmlFor="email">Email address</label>
          <input type="email" name="email"></input>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" name="password"></input>
        </div>
        <button id="submit-btn" onSubmit={userSuccessRegister}>
          Submit
        </button>
      </form>
    </div>
  );
};


const SecondPage = () => {
  return <h1>Logeado</h1>;
};

const App = () => {
  return (
    <Router>
      <div>
        <nav class="nav">
          <div>My App</div>
          <ul>
            <li>
              <a href="/"></a>
            </li>
            <li>
              <a href="/SecondPage"></a>
            </li>
          </ul>
        </nav>
        <Route path="/SecondPage" component={SecondPage} />
        <Route exact path="/" component={RegisterForm} />
        <footer></footer>
      </div>
    </Router>
  );
};

export default App;