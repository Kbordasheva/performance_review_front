import React from "react";
import { Form, getFormElement, SubmitButton } from "../../../../Shared/Form/FormElements";
import Criteria from "./Criteria";
import { useDispatch } from "react-redux";
import { editGoal } from "../../../../../store/actions/profileDetails";

export const formSchema = [
    {
      fieldName: "text",
      type: "TextInput",
      label: "Goal",
    },
    {
      fieldName: "isDone",
      type: "Checkbox",
      label: "Done",
    },
    {
      fieldName: "comments",
      type: "NoteField",
      label: "Comments",
    },
];



const Goal = (props) => {
  const dispatch = useDispatch();

  const { goal, review_id } = props;

  const onSubmit = (values, {setSubmitting, resetForm, setStatus}) => {
    dispatch(editGoal(review_id, goal.id, values));
    setSubmitting(false);
  }

  return (
    <div className="goal">
            <Form
                enableReinitialize
                initialValues={goal}
                onSubmit={onSubmit}
            >
                {formSchema.map(field => (
                    <div key={field.fieldName}>
                        {getFormElement(field.type, field)}
                    </div>
                ))}
                <SubmitButton title="Submit"/>
            </Form>
            { goal.criteria.length ? (
              goal.criteria.map(criteria => {
                  return <Criteria key={criteria.id} criteria={criteria}/>
          }))
        : <h4>Criteria are not set</h4>
      }
    </div>
  )
}

export default Goal;
