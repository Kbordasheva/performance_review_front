import React, { useState } from "react";
import Goal from "./Goal/Goal";
import "./ReviewDetailsItem.scss"
import CheckboxHelp from "../../../Shared/CheckboxHelp/CheckBoxHelp";

const ReviewDetailsItem = (props) => {
  const [isFormVisible, setIsFormVisible] = useState(false)

  const toggle = () => {
        setIsFormVisible(!isFormVisible)
    }

  const { review, review_id } = props;

  return (
    <div className="review-year">
      <CheckboxHelp setIsFormVisible={toggle} title={review.year}/>
      {isFormVisible &&
      <div key="all-goals">
        <Goal
          reviewId={review_id}
          goalsInfo={review.goals}
        />
      </div>
      }
    </div>
  );
};

export default ReviewDetailsItem;
