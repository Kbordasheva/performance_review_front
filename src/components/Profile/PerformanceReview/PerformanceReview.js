import React, { useState } from "react";
import ReviewDetailsItem from "./ReviewDetailsItem/ReviewDetailsItem";
import AddReviewForm from "../PerformanceReview/AddReviewModal/AddReviewModal";
import "./PerformanceReview.scss"
import { useSelector } from "react-redux";


const PerformanceReview = ({reviews, employeeId}) => {
  const [isReviewFormVisible, setIsReviewFormVisible] = useState(false);
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="review">
      {isReviewFormVisible && (
        <AddReviewForm
          setModalVisible={setIsReviewFormVisible}
          isModalVisible={isReviewFormVisible}
          employeeId={employeeId}
        />
      )
      }
      <div className="review-title-wrapper">
        <h3 className="underlined">Review information</h3>
        {(user?.isManager || user?.isAdmin) &&
        <button
          type="button"
          className="button btn-form main-btn add-review"
          onClick={() => setIsReviewFormVisible(true)}
        >
          Add new Review
        </button>
        }
      </div>
        { reviews?.map((review) => {
          return <ReviewDetailsItem review={review} review_id={review.id} key={review.id} employeeId={employeeId}/>;
        })

      }
    </div>
  );
};

export default PerformanceReview;
