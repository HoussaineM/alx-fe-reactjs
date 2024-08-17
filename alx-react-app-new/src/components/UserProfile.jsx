import React from "react";

const UserProfile = (props) => {
  console.log(props);
  return (
    <div style={{ border: "2px solid blue", padding: "5px", margin: "10px", backgroundColor: "rgba(220,220,220,1" }}>
      <h2 style={{ color: "#5f3bab", fontWeight: "bold", fontSize: "30px", margin: "4px" }}>{props.name}</h2>
      <p>Age: <span style={{ color: "#003bae", fontSize: "20px", margin: "4px" }}>{props.age}</span></p>
      <p >Bio: <span style={{ color: "#bb3bfb", fontSize: "20px", margin: "4px" }}>{props.bio}</span></p>
    </div>
  );
};

export default UserProfile;