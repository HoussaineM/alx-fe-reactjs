import React from "react";
import UserContext from "./UserContext";

function UserDetails() {
    const user = React.useContext(UserContext);
    return (
      <div>
        <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>
      </div>
    );
  }
  
  export default UserDetails;