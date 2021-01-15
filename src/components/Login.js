import React, { useState } from "react";

export default function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();

    fetch("https://api.bybits.co.uk/auth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Environment: "mock",
        mode: "no-cors",
      },
      body: JSON.stringify({
        username: username,
        password: password,
        type: "USER_PASSWORD_AUTH",
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Could not login");
        }
      })
      .then((result) => props.setAccessToken(result.access_token))
      .catch((err) => {
        props.setErrorMessage("Error: Could not log you in");
        console.log(err);
      });
  };

  return (
    <>
      <h1 className="heading">Login to your account</h1>
      <form onSubmit={handleLogin} className="login-form">
        <label htmlFor="username">Username:</label>
        <input
          required
          type="text"
          id="username"
          name="username"
          onChange={(event) => setUsername(event.target.value)}
        ></input>
        <label htmlFor="password">Password:</label>
        <input
          required
          type="password"
          id="password"
          name="password"
          onChange={(event) => setPassword(event.target.value)}
        ></input>
        <button className="submit" type="submit">
          Login
        </button>
      </form>
    </>
  );
}
