import {useContext} from "react";
import UserContext from "./UserContext";
 const UserProfile = () => {
   const user = useContext(UserContext)
    return (
      <div>
        <h2 style={{color: "#3be", fontSize: "40px"}}>Details about the author:</h2>
        <h3>Name: <span style={{color: "#3be"}}>{user.name}</span></h3>
        <p>Year: {user.year}</p>
        <p>Bio: {user.bio}</p>
      </div>
    );
  };

  export default UserProfile;