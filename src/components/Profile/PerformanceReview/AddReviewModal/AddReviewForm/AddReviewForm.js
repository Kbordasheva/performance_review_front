import { Form, getFormElement, SubmitButton } from "../../../../Shared/Form/FormElements";

const reviewInitialValues = {
  year: ""
};

const AddReviewForm = (props) => {
	const { onSubmit } = props;

	const formSchema = [
        {
            fieldName: "year",
            type: "TextInput",
            label: "Year"
        }
      ];

	return (
		<div className="add-review-form">
			<Form
          enableReinitialize
          initialValues={reviewInitialValues}
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
	);
};

export default AddReviewForm;
