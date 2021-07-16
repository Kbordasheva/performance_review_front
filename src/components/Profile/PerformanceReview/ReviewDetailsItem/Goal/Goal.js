import React from "react";
import { Form, getFormElement, SubmitButton } from "../../../../Shared/Form/FormElements";
import Criteria from "./Criteria";

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
    // {
    //   fieldName: "criteria",
    //   type: "TimeField",
    //   label: "Criteria",
    // },
];



const Goal = (props) => {

  const { goal } = props;

  const onSubmit = (values, {setSubmitting, resetForm, setStatus}) => {
    console.log("Submit")
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
