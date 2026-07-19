import axios from "axios";

const Account = ({ userFavorites, user, setUserFavorites }) => {
  const removeFav = async (favId) => {
    const localToken = window.localStorage.getItem("token");
    favId = favId * 1;
    try {
      await axios.delete(
        `https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/reservations/${favId}`,
        {
          headers: {
            Authorization: `Bearer ${localToken}`,
          },
        },
      );

      setUserFavorites(
        userFavorites.filter((favorite) => {
          return favorite.id !== favId;
        }),
      );
    } catch (e) {
      console.error(e);
      window.alert(e);
    }
  };
  console.log(userFavorites);
  return (
    <div>
      <h4>{user.firstname}'s Profile</h4>
      <p>User ID: {user.id}</p>
      <p>Username: {user.email}</p>
      <hr />
      <h5>Borrowed Books:</h5>
      {userFavorites.length > 0 ? (
        <div>
          {userFavorites.map((favorite) => {
            return (
              <div key={favorite.id}>
                <p>{favorite.title}</p>
                <p>By: {favorite.author}</p>
                <img src={favorite.coverimage}></img>
                <p>Description:</p>
                <p>{favorite.description}</p>
                <button
                  onClick={() => {
                    removeFav(favorite.id);
                  }}
                >
                  Return This Book
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        <p>Nothing currently Borrowed</p>
      )}
    </div>
  );
};

export default Account;
