import jwtDecode from "jwt-decode";
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

 export const ContextDatas = createContext();

export const Context = ({ children }) => {
  const [ user, setUser] = useState(
    localStorage.getItem("token")
      ? jwtDecode(localStorage.getItem("token"))
      : null
  );

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = () => {
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

 
  return (
    <ContextDatas.Provider value={{ user, setUser }}>
      {children}
    </ContextDatas.Provider>
  );
};

export default Context;
