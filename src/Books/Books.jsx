import axios from "axios";
import { NavLink } from "react-router";

const Books = ({ books, user, setUserFavorites, userFavorites }) => {
  const addToFav = async (book) => {
    const localToken = window.localStorage.getItem("token");
    try {
      const { data } = await axios.post(
        "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/reservations",
        {
          bookId: book.id,
        },
        {
          headers: {
            Authorization: `Bearer ${localToken}`,
          },
        },
      );
      console.log(data);
      setUserFavorites([...userFavorites, data]);
    } catch (error) {
      console.error(error);
    }
  };
  const checkFav = (bookId) => {
    return userFavorites.find((fav) => {
      return fav.id === bookId;
    });
  };
  return (
    /*Add CSS to placeholder*/
    <div>
      <h3>There are currently {books.length} Books in inventory</h3>
      <div className="placeholder">
        {books.map((book) => {
          return (
            <div key={book.id} className="placeholder">
              <h2>
                <NavLink to={`/books/${book.id}`}>{book.name}</NavLink>
              </h2>
              <img src={book.coverimage} className="placeholder" />
              {user.id ? (
                <div>
                  {checkFav(book.id) ? (
                    <button disabled={true}>Favorited</button>
                  ) : (
                    <button
                      onClick={() => {
                        addToFav(book);
                      }}
                    >
                      Borrow This Book
                    </button>
                  )}
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Books;
