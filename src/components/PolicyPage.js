import React, { useState, useEffect } from "react";

export default function PolicyPage(props) {
  const [policyData, setPolicyData] = useState("");

  useEffect(() => {
    fetch("https://api.bybits.co.uk/policys/details", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${props.accessToken}`,
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
      .then((result) => setPolicyData(result))
      .catch((err) => console.error(err));
  }, [props.accessToken]);

  //   const handleLogout = (event) => {
  //     event.preventDefault();
  //     props.setAccessToken("");
  //   };

  console.log(policyData);
  return (
    <>
      <h1>Your Policy Details</h1>
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
      {/* <button onClick={handleLogout}>Logout</button> */}
    </>
  );
}
