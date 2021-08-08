import { getFormElement } from "../../../../Shared/Form/FormElements";
import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";
import { editGoalIsDone } from "../../../../../store/actions/profileDetails";

const formSchema = [
    {
      fieldName: "text",
      type: "TextArea",
      label: "Goal",
    },
    {
      fieldName: "criteria",
      type: "CriteriaField",
      label: "Criteria",
    },
    {
      fieldName: "comments",
      type: "CommentField",
      label: "Comments",
    },
];

const GoalsField = (props) => {
  const { formikProps, formIndex, reviewId, goalId, isGoalDoneInfo, employeeId } = props;
  const [isGoalDone, setIsGoalDone] = useState(isGoalDoneInfo);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const goalIsDoneFieldName = `goalsInfo.${formIndex}.isDone`

  const onGoalDone = (e) => {
      dispatch(editGoalIsDone(reviewId, goalId, employeeId, {isDone: e.target.checked}));
      setIsGoalDone(e.target.checked)
  };

  return (
    <div className="goals-container" key={formIndex}>
              { (user?.isManager || user?.isAdmin) && goalId && (
                <div className="is-done-checkbox-wrapper">
                  <div className="form-group">
                    <label className="control-label" htmlFor={goalIsDoneFieldName}>Done</label>
                    <div className="custom-control custom-checkbox option-inline">
                      <input type="checkbox"
                         id={goalIsDoneFieldName}
                         className="custom-control-input"
                         name={goalIsDoneFieldName}
                         checked={isGoalDone}
                         onChange={(e) => {onGoalDone(e)}}/>
                      <label className="custom-checkbox__label"
                        htmlFor={goalIsDoneFieldName}><span></span></label>
                    </div>
                  </div>
                </div>
              )}
              <div>
      {formSchema.map((field, index) => (
        <div className={field.type} key={index}>
          {getFormElement(
            field.type,
            {
              nameFieldArray: "goalsInfo",
              reviewId,
              goalId,
              formIndex,
              ...field,
            },
            formikProps,
          )}
        </div>
      ))}
      </div>
    </div>
  );
};

export default GoalsField;
