import React from "react";
import { FAV_BOOK } from "../../utils/mutations";
import { useMutation } from "@apollo/client";
import { Button } from "react-bootstrap";

const RandomBooks = ({ randomBook }) => {

  // sets up mutation to add book to favorites list
  const [
    addBook,
    { loading: favBookLoading, data: favBookData, error: favBookError },
  ] = useMutation(FAV_BOOK, {
    refetchQueries: ["me"],
  });

  // on button press, takes in book data and creates book in database then adds to user's favorite list
  const handleFavBook = async (randomBook) => {
    const bookToFavorite = {
      googleBookId: randomBook.id,
      authors: randomBook.volumeInfo.authors,
      description: randomBook.volumeInfo.description,
      image: randomBook.volumeInfo.imageLinks.thumbnail,
      title: randomBook.volumeInfo.title
    }
    console.log("booktofavorite: ", bookToFavorite);

    try {
      const response = await addBook({
        variables: { book: bookToFavorite },
      });
      console.log("response: ", response)
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      {randomBook ? (
        <section className="random-book-container">
          <div>
            <img
              src={
                randomBook.volumeInfo.imageLinks?.thumbnail ||
                "No image available"
              }
              alt={`book cover for ${randomBook.volumeInfo.title}`}
            />
            <h3> {randomBook.volumeInfo.title}</h3>
            <p>
              {randomBook.volumeInfo.authors?.join(", ") || "author unknown"}
            </p>
          </div>
          <div>
            <p>
              {randomBook.volumeInfo.description || "No description available"}{" "}
            </p>
            {randomBook.saleInfo.isEbook ? (
              <a href={randomBook.saleInfo.buyLink} target="_blank">
                Buy it as an eBook!
              </a>
            ) : null}
          </div>
          <div>
            <Button
              className="btn-block btn-info"
              onClick={() => handleFavBook(randomBook)}
            >
              Favorite
            </Button>
          </div>
        </section>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default RandomBooks;
