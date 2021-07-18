import React from "react";
import Goal from "./Goal/Goal";
import "./ReviewDetailsItem.scss"

const ReviewDetailsItem = (props) => {

  const { review, review_id } = props;

  return (
    <div className="review-year">
      <h4>{review.year}</h4>
                 <div key="all-goals">
                    <Goal
                        reviewId={review_id}
                        goalsInfo={review.goals}
                    />
                </div>
    </div>
  );
};

export default ReviewDetailsItem;
