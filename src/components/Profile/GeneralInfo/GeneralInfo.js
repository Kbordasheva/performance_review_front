import { useDispatch } from "react-redux";
import Select from "react-select";
import { Form, getFormElement, SubmitButton } from "../../Shared/Form/FormElements";
import { editGeneralInfo, getSkills, setEmployeeSkill } from "../../../store/actions/profileDetails";
import { useEffect, useState } from "react";
import * as Yup from 'yup';
import "./GeneralInfo.scss"

const phoneRegExp = /^\+375(\s+)?\(?(17|29|33|44)\)?(\s+)?[0-9]{3}-?[0-9]{2}-?[0-9]{2}$/

const validationSchema = Yup.object().shape({
			fullName: Yup.string().required('This field is required'),
			email: Yup.string().email('Invalid email format').required('This field is required'),
			seniority: Yup.string().required('This field is required'),
      phone: Yup.string().matches(phoneRegExp, 'Phone number is not valid')
		})

const GeneralInfo = (generalInfo) => {
    const dispatch = useDispatch();
    const [skills, setSkills] = useState([]);

    const [selectedSkills, setSelectedSkills] = useState(
        generalInfo.skills.map((skill) => {
          return { value: skill.id, label: skill.name };
        })
      );
    useEffect(() => {
        dispatch(getSkills()).then((skillsList) =>
          setSkills(
            skillsList?.map((skill) => {
                return {
                    value: skill.id,
                    label: skill.name,
                };
            })
          )
        );
    }, [dispatch]);

    const onSkillsSelectChange = (option) => {
        setSelectedSkills([...selectedSkills, option]);
        let skills = [];
        option.forEach((skill) => skills.push(skill.value))
        setEmployeeSkill(generalInfo.employeeId, {
          skills: skills
        });
      };

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
            type: "Dropdown",
            label: "Gender",
            options: [
            {text: "Male", value: "1"},
            {text: "Female", value: "2"},
        ],
        }, {
            fieldName: "email",
            type: "TextInput",
            label: "Email",
            placeholder: "example@email.com"
        }, {
            fieldName: "birthDate",
            type: "DatePicker",
            label: "Birth date"
        }, {
            fieldName: "phone",
            type: "TextInput",
            label: "Phone",
            placeholder: "+375XXXXXXXXX"
        }, {
            fieldName: "position",
            type: "TextInput",
            label: "Position"
        },{
            fieldName: "seniority",
            type: "Dropdown",
            label: "Seniority",
            options: [
            {text: 'Select...', value: "", hidden: true},
            {text: "Beginner", value: "beginner"},
            {text: "Junior", value: "junior"},
            {text: "Middle", value: "middle"},
            {text: "Senior", value: "senior"},
        ],
        },{
            fieldName: "unit_id",
            type: "Dropdown",
            label: "Unit",
            options: [
            {text: "U1", value: "1"},
            {text: "U2", value: "2"},
        ],
        },
    ];

    const onSubmit = (values, {setSubmitting, resetForm, setStatus}) => {
        dispatch(editGeneralInfo(generalInfo.employeeId, {
            ...values,
            firstName: values.fullName?.split(' ')[0],
            lastName: values.fullName?.split(' ')[1],
            firstNameRu: values.fullNameRu?.split(' ')[0],
            middleNameRu: values.fullNameRu?.split(' ')[1],
            lastNameRu: values.fullNameRu?.split(' ')[2]
        }));
        setSubmitting(false);
    };

    return (
        <div className="GeneralInfo">
            <div className="left-info">
                <h3 className="underlined">Employee information</h3>
                <Form
                    enableReinitialize
                    initialValues={generalInfo}
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
            <div className="right-info">
                Skills:
              <Select
                defaultValue={selectedSkills}
                isMulti
                isSearchable
                name="skills"
                options={skills}
                onChange={onSkillsSelectChange}
              />
            </div>
        </div>
    );
};

export default GeneralInfo;
