import { Form, getFormElement, SubmitButton } from "../../../../Shared/Form/FormElements";

const employeeInitialValues = {
  firstName: "",
  lastName: "",
  email: "",
  gender: "1",
  unitId: "1",
  employmentDate: ""
};

const AddEmployeeForm = (props) => {
  const { onSubmit } = props;

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
            label: "Email"
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
            options: [
            {text: "U1", value: "1"},
            {text: "U2", value: "2"},
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