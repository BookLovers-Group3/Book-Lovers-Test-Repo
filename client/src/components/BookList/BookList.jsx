import { Container, Col, Card, Row, Button } from "react-bootstrap";
import { useMutation } from "@apollo/client";
import { REMOVE_FAVBOOK, REMOVE_LENDING_BOOK } from "../../utils/mutations";
import { useState } from "react";
import ModalConfirmation from "../Modal-Confirmation/ModalConfirmation";

export default function BookList({ books, type }) {
  // define functions for the modal
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // get mutation for remove favorite book
  const [
    removeFavBook,
    { loading: favLoading, data: favData, error: favError },
  ] = useMutation(REMOVE_FAVBOOK, {
    refetchQueries: ["me"],
  });
  // get mutation for remove lending book
  const [
    removeLendingBook,
    { loading: lendingLoading, data: lendingData, error: lendingError },
  ] = useMutation(REMOVE_LENDING_BOOK, {
    refetchQueries: ["me"],
  });

  // define function for remove favorite book
  const handleRemoveFavBook = async (book) => {
    console.log("book info: ", book);

    try {
      const response = await removeFavBook({
        variables: { bookId: book._id },
      });
      console.log("response: ", response);
    } catch (e) {
      console.log(e);
    }
  };

  // define function for remove lending book
  const handleRemoveLendingBook = async (book) => {
    console.log("book info: ", book);

    try {
      const response = await removeLendingBook({
        variables: { bookId: book._id },
      });
      console.log("response: ", response);
    } catch (e) {
      console.log(e);
    }
  };

  // define function for choose which type of book to remove
  const handleRemoveBook = (book) => {
    if (type === "favorite") {
      return handleRemoveFavBook(book);
    }
    if (type === "lending") {
      return handleRemoveLendingBook(book);
    }
  };

  return (
    <Container>
      <h2 className="pt-5">
        {books?.length
          ? `Viewing ${books?.length} ${type} books:`
          : `No ${type} books yet`}
      </h2>
      <Row>
        {books?.map((book) => {
          return (
            <Col md="4" key={book._id}>
              <Card key={book._id} className="custom-card" border="dark">
                <Card.Title>{book.title}</Card.Title>
                {book.image ? (
                  <Card.Img
                    src={book.image || "No image available"}
                    alt={`The cover for ${book.title}`}
                    variant="top"
                    style={{
                      maxWidth: "150px",
                      objectFit: "cover",
                      margin: "auto",
                    }}
                  />
                ) : null}

                <Card.Body>
                  <p className="small">
                    Authors: {book.authors || "No authors listed"}
                  </p>
                </Card.Body>
                {type === "borrowed" ? (
                  <div className="return-book-button">
                    <ModalConfirmation
                      show={show}
                      handleClose={handleClose}
                      handleShow={handleShow}
                      book={book}
                      type={"Return"}
                    />
                  </div>
                ) : (
                  <Button onClick={() => handleRemoveBook(book)}>Remove</Button>
                )}
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}
