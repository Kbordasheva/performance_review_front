import { getFormElement } from "../../../../Shared/Form/FormElements";

const formSchema = [
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
      fieldName: "criteria",
      type: "CriteriaField",
      label: "Criteria",
    },
    {
      fieldName: "comments",
      type: "NoteField",
      label: "Comments",
    },
];

const GoalsField = (props) => {
  const { formikProps, formIndex } = props;

  return (
    <div className="goals-container" key={formIndex}>
      {formSchema.map((field, index) => (
        <div key={index}>
          {getFormElement(
            field.type,
            {
              nameFieldArray: "goalsInfo",
              formIndex,
              ...field,
            },
            formikProps
          )}
        </div>
      ))}
    </div>
  );
};

export default GoalsField;
