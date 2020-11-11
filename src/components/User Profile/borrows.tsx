import React from "react";
import { Button } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";

import { returnBook } from '../../redux/actions/bookActions'
import { updateUser } from '../../redux/actions/userActions'
import { UserProps, AppState } from "../../types";
import "../../style/UserProfile.css";

const BorrowSection: React.FC<UserProps> = ({ userInfo }) => {
  const dispatch = useDispatch()
  const { user } = useSelector((state: AppState) => state.user)

  const handleReturn = (bookId: string) => async (e: React.MouseEvent<HTMLButtonElement>) =>  {
    let userId = user._id
    await dispatch(returnBook(bookId))
    await dispatch(updateUser(userId)) 
  }

  return (
    <>
      <h2> Borrows ({userInfo.borrows?.length}) </h2>
      <div className="RightSide-Content" style={{display: userInfo.borrows?.length ? 'block' : 'none'}}>
        <div className="RightSide-BorrowTableHead">
          <div style={{ fontWeight: "bolder" }}> </div>
          <div style={{ fontWeight: "bolder" }}> Title </div>
          <div style={{ fontWeight: "bolder" }}> Borrow Date </div>
          <div style={{ fontWeight: "bolder" }}> Due Date </div>
          <div style={{ fontWeight: "bolder" }}> </div>
        </div>

        <div className="RightSide-BorrowList">
          {userInfo.borrows?.map((borrowedBook) => (
            <div className="Borrows-Individual" key={borrowedBook._id}>
              <img
                alt="preview of uploaded book"
                src={borrowedBook.book.imageUrl}
                style={{ width: "100px", height: "auto" }}
              />
              <p> {borrowedBook.book.title} </p>
              <p>
                {new Date(borrowedBook.borrowDate).toLocaleDateString("en-gb")}
              </p>
              <p>
                {new Date(borrowedBook.dueDate).toLocaleDateString("en-gb")}
              </p>
              <div>
                <Button 
                  variant="contained" 
                  size="small" 
                  disableElevation 
                  onClick={handleReturn(borrowedBook.book._id)}
                >
                  Return
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default BorrowSection;
