import axios from "axios";
import { NavLink } from "react-router";
import { useParams } from "react-router";

const Book = ({ books, user, setUserFavorites, userFavorites }) => {
  const { id } = useParams();
  console.log(id);
  const thisBook = books.find((book) => {
    return book.id === id * 1;
  });
  if (!thisBook) {
    return <h3>Please wait... </h3>;
  }
  console.log(thisBook);

  const addSingleToFav = async (book) => {
    const localToken = window.localStorage.getItem("token");
    try {
      const { data } = await axios.post(
        "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/reservations",
        {
          bookId: thisBook.id,
        },
        {
          headers: {
            Authorization: `Bearer ${localToken}`,
          },
        },
      );
      console.log(data);
      setUserFavorites([...userFavorites, thisBook]); //set data to thisBook
    } catch (error) {
      console.error(error);
    }
  };

  const checkSingleFav = (bookId) => {
    return userFavorites.find((fav) => {
      return fav.id === bookId;
    });
  };

  return (
    <div>
      <h2>{thisBook.title}</h2>
      <p>{thisBook.id}</p>
      <p>{thisBook.author}</p>
      <img src={thisBook.coverimage} />
      <p>{thisBook.description}</p>
      <p>{thisBook.available}</p>

      {user.id ? (
        <div>
          {checkSingleFav(thisBook.id) ? (
            <button disabled={true}>Favorited</button>
          ) : (
            <button
              onClick={() => {
                addSingleToFav(thisBook);
              }}
            >
              Borrow This Book
            </button>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default Book;
