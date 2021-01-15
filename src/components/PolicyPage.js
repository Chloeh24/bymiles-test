import React, { useState, useEffect } from "react";

export default function PolicyPage({
  accessToken,
  setAccessToken,
  setErrorMessage,
}) {
  const [policyData, setPolicyData] = useState("");

  useEffect(() => {
    return fetch("https://api.bybits.co.uk/policys/details", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        Environment: "mock",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Could not get user details");
        }
      })
      .then(setPolicyData)
      .catch((err) => {
        setErrorMessage("Error: Could not find your policy details");
        console.log(err);
      });
  }, [accessToken, setErrorMessage]);

  const handleLogout = () => {
    setAccessToken("");
  };

  if (!policyData) return <h1>Please wait...</h1>;

  return (
    <>
      <h1 className="heading">My Policy</h1>
      <h3>Policy Reference:</h3>
      <p>{policyData.policy.policy_ref}</p>
      <h3>Cover Type:</h3>
      <p>{policyData.policy.cover}</p>
      <h3>Car:</h3>
      <p>
        {policyData.vehicle.make} {policyData.vehicle.model}{" "}
        {policyData.vehicle.colour}-{policyData.vehicle.reg}
      </p>

      <h3>Address:</h3>
      <p>
        {" "}
        {policyData.policy.address.line_1}, {policyData.policy.address.line_2},{" "}
        {policyData.policy.address.line_3} {policyData.policy.address.postcode}
      </p>
      <button onClick={handleLogout}>Logout</button>
    </>
  );
}
