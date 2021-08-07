import { Form, getFormElement, SubmitButton } from "../../../../Shared/Form/FormElements";
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
	year: Yup.string()
	  .required('This field is required'),
});

const reviewInitialValues = {
  year: ""
};

const AddReviewForm = (props) => {
	const { onSubmit } = props;

	const formSchema = [
        {
            fieldName: "year",
            type: "ReactSelect",
            label: "Year",
            options: [
              {text: 'Select...', value: "0", hidden: true},
              {text: '2021', value: "2021"},
              {text: '2022', value: "2022"},
              {text: '2023', value: "2023"},
              {text: '2024', value: "2024"},
              {text: '2025', value: "2025"}
          ]
        }
      ];

	return (
		<div className="add-review-form">
			<Form
          enableReinitialize
          initialValues={reviewInitialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
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
