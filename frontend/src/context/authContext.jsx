import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = async (data) => {
    try {
      const res = await axios.post("http://localhost:5000/login", data);
      setCurrentUser(res.data);
      return res;
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("user", JSON.stringify(currentUser));
    }
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
