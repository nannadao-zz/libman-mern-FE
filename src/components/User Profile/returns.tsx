import React from "react";

import { UserProps } from "../../types";
import "../../style/UserProfile.css";

const ReturnSection: React.FC<UserProps> = ({ userInfo }) => {
  return (
    <>
      <h4> Returns </h4>
      <div className="RightSide-Content">
        <div className="RightSide-ReturnTableHead">
          <div style={{ fontWeight: "bolder" }}> </div>
          <div style={{ fontWeight: "bolder" }}> Title </div>
          <div style={{ fontWeight: "bolder" }}> Due Date </div>
          <div style={{ fontWeight: "bolder" }}> Return Date </div>
          <div style={{ fontWeight: "bolder" }}> </div>
        </div>

        <div className="RightSide-ReturnList">
          {userInfo.returns?.map((returnedBook) => (
            returnedBook.returnDate ? (
              <div className="Returns-Individual" key={returnedBook._id}>
                <div className="Returns-Image">
                  <img
                    alt="preview of uploaded book"
                    src={returnedBook.book.imageUrl}
                    style={{ width: "100px", height: "auto" }}
                  />
                </div>
                <p> {returnedBook.book.title} </p>
                <p>
                  {new Date(returnedBook.dueDate).toLocaleDateString("en-gb")}
                </p>
                <p>
                  {new Date(returnedBook.returnDate).toLocaleDateString(
                    "en-gb"
                  )}
                </p>
                <div>
                  {returnedBook.returnDate - returnedBook.dueDate < 0
                    ? "Overdue"
                    : null}
                </div>
              </div>
            ) : null
          ))}
        </div>
      </div>
    </>
  );
};

export default ReturnSection;
