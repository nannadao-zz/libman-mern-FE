import React, { useEffect } from "react";
import { RouteComponentProps } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { Typography } from "@material-ui/core";

import Navbar from "../components/Navbar";
import BookAuthor from "../components/Book Detail/author";
import { fetchIndividualBook } from "../redux/actions/bookActions";
import BookActionBorrow from "../components/Book Detail/borrow";
import BookActionReturn from "../components/Book Detail/return";
import BookAccordion from "../components/Book Detail/accordion";
import { hideMessage } from "../redux/actions/userActions";
import { AppState, EditRouteInfo, UserBorrowBook } from "../types";
import "../style/BookDetail.css";

const BookDetail = ({ match }: RouteComponentProps<EditRouteInfo>) => {
  const bookId = match.params.bookId;
  const dispatch = useDispatch();
  const userResponse = useSelector((state: AppState) => state.user);
  const { singleBook } = useSelector((state: AppState) => state.book);

  useEffect(() => {
    dispatch(fetchIndividualBook(bookId));
  }, [bookId, dispatch]);

  useEffect(() => {
    dispatch(hideMessage());
  }, [dispatch]);

  return (
    <>
      <Navbar />
      {singleBook && singleBook._id === bookId ? (
        <div className="BookDetail-MainContainer">
          <div className="BookDetail-Image">
            <img
              alt="book cover"
              src={singleBook.imageUrl}
              style={{ minWidth: "300px", maxWidth: "320px", height: "auto" }}
            />
          </div>
          <div className="BookDetail-Info">
            <Typography variant="h4" component="h1">
              {singleBook.title}
            </Typography>

            <BookAuthor authorsState={singleBook.authors} />

            <div className="BookDetail-Accordion">
              <BookAccordion
                isbn={singleBook.isbn}
                publisher={singleBook.publisher}
                publishYear={singleBook.publishYear}
                quantity={singleBook.quantity}
                description={singleBook.description}
                categories={singleBook.categories}
              />
            </div>

            <div className="BookDetail-Button">
              {userResponse.user ? (
                userResponse.user.borrows.length >= 1 &&
                userResponse.user.borrows.some(
                  (item: UserBorrowBook) => item.book._id === bookId
                ) ? (
                  <BookActionReturn bookUrl={bookId} />
                ) : (
                  <BookActionBorrow
                    bookUrl={bookId}
                    quantity={singleBook.quantity}
                  />
                )
              ) : (
                <BookActionBorrow
                  bookUrl={bookId}
                  quantity={singleBook.quantity}
                />
              )}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default BookDetail;
