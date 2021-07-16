import React from "react";
import { Form, getFormElement, SubmitButton } from "../../../../Shared/Form/FormElements";

export const formSchema = [
    {
      fieldName: "text",
      type: "TextInput",
      label: "Criteria",
    },
    {
      fieldName: "isDone",
      type: "Checkbox",
      label: "Done",
    },
    {
      fieldName: "startDate",
      type: "DatePicker",
      label: "Start Date",
    },
    {
      fieldName: "deadline",
      type: "DatePicker",
      label: "Deadline",
    },
    {
      fieldName: "finishDate",
      type: "DatePicker",
      label: "Finish Date",
    },
];

const Criteria = (props) => {

  const { criteria } = props;

  const onSubmit = (values, {setSubmitting, resetForm, setStatus}) => {
    console.log("Submit")
  }

  return (
    <div className="criteria">
            <Form
                enableReinitialize
                initialValues={criteria}
                onSubmit={onSubmit}
            >
                {formSchema.map(field => (
                    <div key={field.fieldName}>
                        {getFormElement(field.type, field)}
                    </div>
                ))}
                <SubmitButton title="Submit"/>
            </Form>
    </div>
  )
}

export default Criteria;
