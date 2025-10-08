import React, { createContext, useState } from "react";

export const MyContext = createContext();

function MyProvider({ children }) {
  const [user, setUser] = useState("Viku Developer");

  return (
    <MyContext.Provider value={{ user, setUser }}>
      {children}
    </MyContext.Provider>
  );
}

export default MyProvider;
