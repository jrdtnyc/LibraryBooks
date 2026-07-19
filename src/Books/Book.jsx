import { useParams } from "react-router";

const Book = ({ books }) => {
  const { id } = useParams();
  const thisBook = books.find((book) => {
    return book.id === id * 1;
  });
  if (!thisBook) {
    return <h3>Please wait... </h3>;
  }
  return (
    <div>
      <h2>{thisBook.title}</h2>
      <img src={thisBook.author} />
      <p>{thisBook.coverimage}</p>
      <p>${thisBook.description}</p>
      <p>{thisBook.available}</p>
    </div>
  );
};

export default Book;
