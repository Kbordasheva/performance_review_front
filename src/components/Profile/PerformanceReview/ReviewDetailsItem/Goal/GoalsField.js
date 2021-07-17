import { getFormElement } from "../../../../Shared/Form/FormElements";

const formSchema = [
    {
      fieldName: "isDone",
      type: "Checkbox",
      label: "Done",
    },
    {
      fieldName: "text",
      type: "TextInput",
      label: "Goal",
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
        <div className={field.type} key={index}>
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
