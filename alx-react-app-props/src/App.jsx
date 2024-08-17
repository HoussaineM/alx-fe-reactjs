import React from "react";
import ProfilePage from './components/ProfilePage';
import UserContext from "./components/UserContext";
import UserProfile from "./components/UserProfile";

function App() {
  const date = new Date().getFullYear();
  const userData = { name: "Jane Doe", email: "jane.doe@example.com", year: `${date}`, bio: "Professional Dev." };

  return (
    <UserContext.Provider value={userData}>
      <ProfilePage />
      <UserProfile/>
    </UserContext.Provider>
  );
}

export default App;