import { Form, getFormElement, SubmitButton } from "../../../../Shared/Form/FormElements";
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
	firstName: Yup.string().required('This field is required'),
	lastName: Yup.string().required('This field is required'),
  email: Yup.string().email('Invalid email format').required('This field is required'),
  employmentDate: Yup.date().required('This field is required'),
});

const AddEmployeeForm = (props) => {
  const { onSubmit, user } = props;

  const employeeInitialValues = {
  firstName: "",
  lastName: "",
  email: "",
  gender: "1",
  unitId: user.unit === 'U1' ? "1" : "2",
  employmentDate: ""
};

  const formSchema = [
        {
            fieldName: "firstName",
            type: "TextInput",
            label: "First Name(Eng)"
        }, {
            fieldName: "lastName",
            type: "TextInput",
            label: "Last Name(Eng)",
        }, {
            fieldName: "email",
            type: "TextInput",
            label: "Email",
            placeholder: "example@email.com"
        }, {
            fieldName: "gender",
            type: "Dropdown",
            label: "Gender",
            options: [
            {text: "Male", value: "1"},
            {text: "Female", value: "2"},
            ],
        }, {
            fieldName: "unit_id",
            type: "Dropdown",
            label: "Unit",
            options: user.unit === 'U1' ? [
            {text: "U1", value: "1"},
            {text: "U2", value: "2"},
        ] : [
          {text: "U2", value: "2"},
          {text: "U1", value: "1"},
            ],
        }, {
            fieldName: "employmentDate",
            type: "DatePicker",
            label: "Employment Date"
        },
    ];


  return (
    <div>
      <Form
          enableReinitialize
          initialValues={employeeInitialValues}
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
  )
};

export default AddEmployeeForm;