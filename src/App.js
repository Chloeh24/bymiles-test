import React, { useState } from "react";
import "./App.css";
import Login from "./components/Login";
import PolicyPage from "./components/PolicyPage";

function App() {
  const [accessToken, setAccessToken] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  return (
    <div className="App">
      <header className="App-header"></header>
      {accessToken ? (
        <PolicyPage
          accessToken={accessToken}
          setAccessToken={setAccessToken}
          setErrorMessage={setErrorMessage}
        />
      ) : (
        <Login
          setErrorMessage={setErrorMessage}
          setAccessToken={setAccessToken}
        />
      )}
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
}

export default App;
