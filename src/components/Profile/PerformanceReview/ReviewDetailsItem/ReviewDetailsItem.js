import React from "react";
import Goal from "./Goal/Goal";

const ReviewDetailsItem = (props) => {

  const { review, review_id } = props;

  return (
    <div>
      <h3>{review.year}</h3>
      { review.goals.length ? (
        review.goals.map(goal => {
            return <Goal key={goal.id} goal={goal}/>
          }))
        : <h4>Goals are not set</h4>
      }
    </div>
  );
};

export default ReviewDetailsItem;
