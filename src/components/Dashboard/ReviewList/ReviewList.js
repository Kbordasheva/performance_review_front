import React, {useState, useEffect,} from "react";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import { getReviewsList } from "../../../store/actions/reviewsList";
import ReviewItem from "./ReviewItem/ReviewItem";
import "./ReviewList.scss"
import AddEmployeeForm from "./EmployeeModal/EmployeeModal";

const ReviewList = () => {
  const dispatch = useDispatch();
  const [isEmployeeFormVisible, setIsEmployeeFormVisible] = useState(false);

  const reviews = useSelector((state) => state.reviewList.reviewList);
  const next = useSelector((state) => state.reviewList.next);

  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(getReviewsList());

  }, [dispatch]);

  const getNext = () => {
    if (next) {dispatch(getReviewsList(next))}
  }

  return (
    <section>
            {isEmployeeFormVisible && (
        <AddEmployeeForm
          setModalVisible={setIsEmployeeFormVisible}
          isModalVisible={isEmployeeFormVisible}
        />
      )
      }
      { reviews ?
        <>
          <div className="review-list-top">
            <h3>Performance review</h3>
            {(user?.isManager || user?.isAdmin) &&
              <button
                type="button"
                className="button btn-form main-btn add-employee"
                onClick={() => setIsEmployeeFormVisible(true)}
              >
                Add new Employee
              </button>
              }
          </div>
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
