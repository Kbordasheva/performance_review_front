import React from "react";
import Goal from "./Goal/Goal";

const ReviewDetailsItem = (props) => {

  const { review, review_id } = props;

  return (
    <div>
      <h3>{review.year}</h3>
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
