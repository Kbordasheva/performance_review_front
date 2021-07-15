import React from "react";
import ReviewDetailsItem from "./ReviewDetailsItem/ReviewDetailsItem";


const PerformanceReview = ({reviews}) => {
  return (
    <div className="review">
      <h3 className="underlined">Review information</h3>

        { reviews?.map((review) => {
          return <ReviewDetailsItem review={review} review_id={review.id} key={review.id}/>;
        })

      }
    </div>
  );
};

export default PerformanceReview;
