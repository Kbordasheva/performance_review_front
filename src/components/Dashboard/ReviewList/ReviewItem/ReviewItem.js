import "./ReviewItem.scss"
import { Link } from "react-router-dom";
import DoughnutChart from "../../../DonutChart/DonutChart";

const ReviewItem = ({employee}) => {

  return (
    <article className="ReviewItem">
      {/*<div className="info-name">*/}

      {/*  <div>Progress</div>*/}
      {/*</div>*/}
      <div className="left-info">
        <p className="ReviewItem__name">
          <Link to={'/profile/' + employee.id}>{employee.fullName}</Link>
        </p>
        <p><strong>Unit:</strong> {employee.unit?.name}</p>
        <p><strong>Position:</strong> {employee.position}</p>
        <p><strong>Seniority:</strong> {employee.seniority}</p>
        <p>
          <strong>Skills: </strong>
          {employee.skills &&
              employee.skills.map((skill, i) => (
                <span key={i}>{`${i ? ", " : " "} ${skill.name}`}</span>
              ))}
        </p>
        <p><strong>Email:</strong> {employee.email}</p>
      </div>
      <div className="right-info">
        {employee.goalsCount ?
          <div className="progress-chart">
            <div><strong>Progress</strong></div>
            <DoughnutChart goalsDoneCount={employee.goalsDoneCount} goalsCount={employee.goalsCount}/>
          </div> :
          <div>Goals are not set</div>
        }
      </div>
    </article>
  );
}

export default ReviewItem;