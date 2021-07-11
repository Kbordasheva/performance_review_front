import "./ReviewItem.scss"

const ReviewItem = ({review}) => {
  const employee = review.employee;

  return (
    <article className="ReviewItem">
      <div className="info-name">
        <p className="ReviewItem__name">
          <h4>{employee.fullName}</h4>
        </p>
      </div>
      <div className="left-info">
        <p><strong>Unit:</strong> {employee.unit?.name}</p>
        <p><strong>Position:</strong> {employee.position}</p>
        <p><strong>Seniority:</strong> {employee.seniority}</p>
        <p>
          <strong>Skills: </strong>
          {employee.skills &&
            employee.skills
              .map((skill, i) => <span key={i}>{skill.name}</span>)
              .reduce((prev, curr) => [prev, ", ", curr])}
        </p>
        <p><strong>Email:</strong> {employee.email}</p>
      </div>
      <div className="right-info">
        <div className="point">Progress:</div>
        <div>{review.goalsDoneCount} goals done out of {review.goalsCount}</div>
      </div>
    </article>
  );
}

export default ReviewItem;