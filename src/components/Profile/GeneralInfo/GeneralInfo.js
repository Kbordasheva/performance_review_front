import { useDispatch } from "react-redux";
import { Form, getFormElement, SubmitButton } from "../../Shared/Form/FormElements";

const GeneralInfo = (generalInfo) => {
    const dispatch = useDispatch();

    const formSchema = [
        {
            fieldName: "fullName",
            type: "TextInput",
            label: "Full name (Eng)"
        }, {
            fieldName: "fullNameRu",
            type: "TextInput",
            label: "Full name (Ru)",
            placeholder: "Фамилия Имя Отчество"
        }, {
            fieldName: "gender",
            type: "TextInput",
            label: "Gender"
        }, {
            fieldName: "email",
            type: "TextInput",
            label: "Email"
        }, {
            fieldName: "birthDate",
            type: "DatePicker",
            label: "Birth date"
        }, {
            fieldName: "phone",
            type: "TextInput",
            label: "Phone"
        }, {
            fieldName: "position",
            type: "TextInput",
            label: "Position"
        },
    ];

    const onSubmit = (values, {setSubmitting, resetForm, setStatus}) => {
        // editGeneralInformation(relatedInfo.id, relatedInfo.rel_id, {
        //     ...values,
        //     firstName: values.fullName?.split(' ')[0],
        //     lastName: values.fullName?.split(' ')[1],
        //     firstNameRu: values.fullNameRu?.split(' ')[0],
        //     middleNameRu: values.fullNameRu?.split(' ')[1],
        //     lastNameRu: values.fullNameRu?.split(' ')[2]
        // })
        console.log({            ...values,
            firstName: values.fullName?.split(' ')[0],
            lastName: values.fullName?.split(' ')[1],
            firstNameRu: values.fullNameRu?.split(' ')[0],
            middleNameRu: values.fullNameRu?.split(' ')[1],
            lastNameRu: values.fullNameRu?.split(' ')[2]})
    };

    return (
        <div className="GeneralInfo">
            <h3 className="underlined">Employee information</h3>
            <Form
                enableReinitialize
                initialValues={generalInfo}
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

export default GeneralInfo;
