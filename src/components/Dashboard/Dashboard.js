import React from "react";
import "./Dashboard.scss";
import ReviewList from "./ReviewList/ReviewList";

const Dashboard = () => {

    return (
    <div className="reviews-container">
      <ReviewList/>
    </div>
  );
};

export default Dashboard;