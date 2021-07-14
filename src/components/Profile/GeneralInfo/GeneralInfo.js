import { useDispatch } from "react-redux";
import Select from "react-select";
import { Form, getFormElement, SubmitButton } from "../../Shared/Form/FormElements";
import { editGeneralInfo, getSkills, setEmployeeSkill } from "../../../store/actions/profileDetails";
import { useEffect, useState } from "react";
import "./GeneralInfo.scss"

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
        setEmployeeSkill(generalInfo.id, {
          skills: option
            ? option.map((skill) => {
                return { skill_id: skill.value };
              })
            : [],
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
        }, {
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
