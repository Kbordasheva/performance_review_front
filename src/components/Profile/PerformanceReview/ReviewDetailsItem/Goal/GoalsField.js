import { getFormElement } from "../../../../Shared/Form/FormElements";

const formSchema = [
    {
      fieldName: "isDone",
      type: "Checkbox",
      label: "Done",
    },
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
  const { formikProps, formIndex, reviewId, goalId } = props;

  return (
    <div className="goals-container" key={formIndex}>
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
  );
};

export default GoalsField;
