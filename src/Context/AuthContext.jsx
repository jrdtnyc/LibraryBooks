//Hereisjon@jon.com test
//Import required data
import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router";

//Set up context for registration and login
const AuthContext = createContext();
export function AuthProvider({ children }) {
  const navigate = useNavigate();
  //Post data to the server and receive a token in response
  const register = async (regData) => {
    console.log(JSON.stringify(regData));
    try {
      const response = await fetch(
        "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(regData),
        },
      );
      const result = await response.json();
      console.log(result.token);
      window.localStorage.setItem("token", result.token);
      navigate("/login");
    } catch (e) {
      console.error(e);
    }
  };

  //If a token found in local storage and login data found on server
  const login = async (loginData) => {
    console.log(JSON.stringify(loginData));
    const storedToken = window.localStorage.getItem("token");
    try {
      if (!storedToken) throw Error("No token found.");
      const response = await fetch(
        "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${storedToken}`,
          },
          body: JSON.stringify(loginData),
        },
      );
      if (!response.ok) throw Error("Authentication failed.");
      const loginResponse = await response.json();
      window.localStorage.setItem("token", loginResponse.token);
      navigate("/");
    } catch (e) {
      console.error(e);
    }
  };

  const value = {
    register,
    login,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

//Make context available externally
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw Error("useAuth must be used within an AuthProvider");
  return context;
}
