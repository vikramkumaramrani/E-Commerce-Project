// src/context/MyProvider.jsx
import React, { createContext, useState } from "react";

// 👉 Yahan named export hai
export const MyContext = createContext();

function MyProvider({ children }) {
  const [user, setUser] = useState("Viku Developer"); // default value dal di test ke liye

  return (
    <MyContext.Provider value={{ user, setUser }}>
      {children}
    </MyContext.Provider>
  );
}

export default MyProvider; // 👉 default export
