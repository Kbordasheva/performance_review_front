import React, {useState, useEffect,} from "react";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import { getReviewsList } from "../../../store/actions/reviewsList";
import ReviewItem from "./ReviewItem/ReviewItem";
import "./ReviewList.scss"

const ReviewList = () => {
  const dispatch = useDispatch();

  const reviews = useSelector((state) => state.reviewList.reviewList);
  const next = useSelector((state) => state.reviewList.next);

  useEffect(() => {
    dispatch(getReviewsList());

  }, [dispatch]);

  const getNext = () => {
    if (next) {dispatch(getReviewsList(next))}
  }

  return (
    <section>
      { reviews ?
        <>
          <h3 className="panel-top-row">Performance review</h3>

          <InfiniteScroll
            dataLength={reviews.length}
            next={getNext}
            hasMore={!!next}
            scrollThreshold={0.9}
            loader={<h4>Loading...</h4>}
            className="ReviewList"
          >
            {
              reviews.map((employee) => {
                return <ReviewItem employee={employee} key={employee.id} />;
              })
            }
          </InfiniteScroll>
          </>
          :
          <h1 className="no-data">No employees available</h1>
        }
    </section>
  );
};

export default ReviewList;
