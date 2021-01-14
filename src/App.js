import React, { useState } from "react";
import "./App.css";
import Login from "./components/Login";
import PolicyPage from "./components/PolicyPage";

function App() {
  const [accessToken, setAccessToken] = useState("");

  return (
    <div className="App">
      <header className="App-header"></header>
      {accessToken ? (
        <PolicyPage accessToken={accessToken} />
      ) : (
        <Login setAccessToken={setAccessToken} />
      )}
    </div>
  );
}

export default App;
