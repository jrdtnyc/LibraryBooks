import { useState, useEffect } from "react";
import { Routes, Route } from "react-router";
import axios from "axios";
import "./App.css";
import Book from "./Books/Book";
import Books from "./Books/Books";
import Register from "./Auth/Register";
import Login from "./Auth/Login";
import Account from "./Auth/Account";
import Layout from "./Layout/Layout";
import Error404 from "./Layout/Error404";

function App() {
  const [user, setUser] = useState({});
  const [token, setToken] = useState(null);
  const [userFavorites, setUserFavorites] = useState(0);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books",
        );
        setBooks(data);
      } catch (e) {
        console.error(e);
        window.alert(e);
      }
    };

    fetchData();
  }, []);

  const authenticate = async () => {
    try {
      if (!window.localStorage.getItem("token")) {
        throw Error("No token found");
      }
      const localToken = window.localStorage.getItem("token");
      const { data } = await axios.get(
        "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/me",
        {
          headers: {
            Authorization: `Bearer ${localToken}`,
          },
        },
      );
      setUser(data);
      console.log(data);
    } catch (e) {
      console.error(e);
      window.alert(e);
    }
  };

  useEffect(() => {
    const checkToken = () => {
      const loggedInToken = window.localStorage.getItem("token");
      if (loggedInToken) {
        setToken(loggedInToken);
        authenticate();
      }
    };
    checkToken();
  }, [user.id]);

  useEffect(() => {
    const fetchFavorites = async () => {
      const localToken = window.localStorage.getItem("token");
      const { data } = await axios.get(
        "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/reservations",
        {
          headers: {
            Authorization: `Bearer ${localToken}`,
          },
        },
      );
      setUserFavorites(data);
    };
    const loggedInToken = window.localStorage.getItem("token");
    if (loggedInToken) {
      fetchFavorites();
    }
  }, [user.id]);

  return (
    <div>
      <Routes>
        <Route
          element={<Layout user={user} setToken={setToken} setUser={setUser} />}
        >
          <Route
            index
            element={
              <Books
                books={books}
                user={user}
                setUserFavorites={setUserFavorites}
                userFavorites={userFavorites}
              />
            }
          />
          <Route
            path="/books"
            element={
              <Books
                books={books}
                user={user}
                setUserFavorites={setUserFavorites}
                userFavorites={userFavorites}
                authenticate={authenticate}
              />
            }
          />
          <Route
            path="/book/:id"
            element={
              <Book
                books={books}
                user={user}
                setUserFavorites={setUserFavorites}
                userFavorites={userFavorites}
              />
            }
          />
          <Route
            path="/login"
            element={<Login authenticate={authenticate} />}
          />
          <Route path="/register" element={<Register />} />
          <Route
            path="/account"
            element={
              <Account
                userFavorites={userFavorites}
                user={user}
                setUserFavorites={setUserFavorites}
              />
            }
          />
          <Route path="*" element={<Error404 />} />
        </Route>
      </Routes>

      <hr />
    </div>
  );
}

export default App;
