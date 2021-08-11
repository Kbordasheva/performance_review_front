import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import deleteImg from "../../../assets/img/bin.svg";
import moment from 'moment';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import classNames from "classnames";
import "./FormElements.scss";

import {
  Formik,
  Form as FormikForm,
  useFormikContext,
  Field,
  ErrorMessage,
  useField,
  FieldArray,
} from "formik";
import CheckboxHelp from "../CheckboxHelp/CheckBoxHelp";
import { deleteGoal } from "../../../store/actions/profileDetails";

export const Form = (props) => {
    return (
        <Formik {...props}>
            <FormikForm className="form-horizontal needs-validation">
                {props.children}
            </FormikForm>
        </Formik>)
};

export const SubmitButton = (props) => {
    const {title, formikProps, ...rest} = props;

    const {isSubmitting} = useFormikContext();
    const disabled = formikProps? !(formikProps.isValid && formikProps.dirty) : isSubmitting

    return (
        <button
			type="submit"
			className={classNames(
				'button btn-form main-btn',
				disabled ? 'btn-disabled' : ''
			)}
			{...rest}
			disabled={disabled}
		>
			{title}
		</button>

    )
};

export const ResetButton = (props) => {
    const {title, formikProps, ...rest} = props;

    return (
        <button type="reset" className="button btn-form main-btn btn-back" {...rest}>{title}</button>
    )
};

const TextField = (props) => {
    const {name, label, placeholder,formIndex, nameFieldArray, formikProps, ...rest} = props;
    const fieldName = formIndex >= 0 ?  `${nameFieldArray}.${formIndex}.${name}`: `${name}`
    return (
        <div className="form-group">
            {label && <label className="control-label col-md-2" htmlFor={fieldName}>{label}:</label>}
            <Field
                className={classNames(
                    "form-control",
                    name === "text"
                      ? "col-md-7"
                      : "col-md-3"
                  )}
                type="text"
                name={fieldName}
                id={fieldName}
                placeholder={placeholder || ""}
                {...rest}
            />
            <ErrorMessage name={fieldName} render={msg => <div style={{color: "red"}}>{msg}</div>}/>
        </div>
    )
};

const DateField = (props) => {
    const {name, label, placeholder, notify, formIndex, nameFieldArray, formikProps, ...rest} = props;
    const fieldName = formIndex >= 0 ?  `${nameFieldArray}.${formIndex}.${name}`: `${name}`
    const [field, , {setValue}] = useField(fieldName);
    const initDate = field.value ? new Date(field.value) : null;

    return (
        <div className="form-group">
            {label && <label className={classNames(
                                  "control-label",
                                  name === "birthDate" || name === "employmentDate"
                                    ? "col-md-2"
                                    : ""
                                )}
                             htmlFor={fieldName}>{label}:</label>}
            <DatePicker
                selected={initDate}
                onChange={date => setValue(moment(date).format('MM/DD/YYYY'))}
                showYearDropdown
                showMonthDropdown
                dropdownMode="select"
                autoComplete="off"
                className="form-control"
                type="text"
                name={fieldName}
                id={fieldName}
                {...rest}
            />
            {notify && <span className="notify-icon"></span>}
            <ErrorMessage name={fieldName} render={msg => <div style={{color: "red"}}>{msg}</div>}/>
        </div>
    )
};

const SelectField = (props) => {
    const {name, label, options, formIndex, nameFieldArray} = props;
    const fieldName = formIndex >= 0 ?  `${nameFieldArray}.${formIndex}.${name}`: `${name}`
    return (
        <div className="form-group">
            {label && <label className="control-label col-md-2" htmlFor={fieldName}>{label}:</label>}

            <Field
                className="form-control col-sm-3"
                as="select"
                id={fieldName}
                name={fieldName}
            >
                {options.map((opt, index) =>
                    <option value={opt.value} key={opt.key || index} label={opt.text || opt.value}/>)}
            </Field>
            <ErrorMessage name={fieldName} render={msg => <div style={{color: "red"}}>{msg}</div>}/>
        </div>
    )
};

const ReactSelect = (props) => {
    const {name, label, options} = props;


    return (
        <div className="form-group">
            {label && <label className="control-label col-md-2" htmlFor={name}>{label}:</label>}
            <Field
                className="form-control col-sm-3"
                as="select"
                id={name}
                name={name}
            >
                {options.map((opt, index) =>
                    <option value={opt.id || opt.value} key={opt.id || index} label={opt.name || opt.label || opt.text}
                            hidden={opt.hidden}/>)}
            </Field>

            <ErrorMessage name={name} render={msg => <div style={{color: "red"}}>{msg}</div>}/>
        </div>
    )
};

const Textarea = (props) => {
    const {name, label, placeholder,formIndex, nameFieldArray, formikProps, reviewid, goalid, ...rest} = props;
    const fieldName = formIndex >= 0 ?  `${nameFieldArray}.${formIndex}.${name}`: `${name}`
    const dispatch = useDispatch();

    return (
        <div className="form-group textarea-group column">
            <div>
            {label && <label className="control-label" htmlFor={fieldName}>{label}:</label>}
            <ErrorMessage name={fieldName} render={msg => <span className="error-textarea" style={{color: "red"}}>{msg}</span>}/>
            </div>
            <div className="form-error-container">
                <Field
                className="form-control col-md-6"
                as="textarea"
                name={fieldName}
                id={fieldName}
                placeholder={placeholder || ""}
                {...rest}
                />
                <button type="button" className="tooltip-button" data-tip="Delete goal">
                  <img className="delete-img" data-tooltip="Delete goal" src={deleteImg} alt={"delete goal"}
                       onClick={() => dispatch(deleteGoal(reviewid, goalid))}
                  />
                </button>
            </div>

        </div>
    )
};

const Checkbox = (props) => {
    const {name, label, updateselectvalueroot, formikProps, formIndex, nameFieldArray} = props;
    const fieldName = formIndex >= 0 ?  `${nameFieldArray}.${formIndex}.${name}`: `${name}`
    const handleChange = (e) => {
        const value = e.target.checked ? true : false
        formikProps.setFieldValue(fieldName, value)
        if (updateselectvalueroot) {
            updateselectvalueroot(value, formIndex, formikProps)
        }
    }
    return (
        <div className="form-group">
        <label className="control-label"
               htmlFor={fieldName}>{label}</label>
        <div className="custom-control custom-checkbox option-inline">
             <Field
                name={fieldName}
                className="custom-control-input"
                type="checkbox"
                id={fieldName}
                {...(updateselectvalueroot ? {onChange:handleChange} : {})}
            />
            <label className="custom-checkbox__label"
                   htmlFor={fieldName}><span></span></label>
        </div>
        <ErrorMessage
            name={fieldName}
            className="field-error"
            render={msg => <div style={{color: "red"}}>{msg}</div>}
        />
    </div>
    )
};

const CommentField = (props) => {
    const {name, placeholder,formikProps, formIndex, nameFieldArray} = props;
    const fieldName = formIndex >= 0 ? `${nameFieldArray}.${formIndex}.${name}` : `${name}`;
    const [field] = useField(fieldName);

    const user = useSelector((state) => state.auth.user);
    const [isFormVisible, setIsFormVisible] = useState(false)

    const toggle = () => {
      setIsFormVisible(!isFormVisible)
}
    return (
        <div className="form-group textarea-group column">

            <CheckboxHelp setIsFormVisible={toggle} title="Comments"/>
          {isFormVisible &&
          <FieldArray name={fieldName}>
            {({insert, remove, push}) => (
              <div className="comments-container">
              <>
                <>

                  {field.value.length > 0 &&
                  field.value.map((value, index) => {
                      const createdAt = value?.createdAt?.slice(0, 16);
                      const updatedAt = value?.updatedAt?.slice(0, 16);
                      const createdDate = new Date(createdAt);
                      const updatedDate = new Date(updatedAt)
                      const labelComment = (createdAt === updatedAt) ?
                        `${(moment(createdDate).format('L') + ' ' + value?.author + ' ' + 'wrote:')}` :
                        `${(moment(updatedDate).format('L') + ' ' + value?.author + '(edited) ' + 'wrote:')}`
                      return (
                        <div className="comment" key={index}>
                          {value?.author && <p> {labelComment}</p>}
                          <Field
                            className="form-control col-md-6"
                            as="textarea"
                            name={`${fieldName}.${index}.text`}
                            id={`${fieldName}.${index}.text`}
                            placeholder={placeholder || ''}
                            disabled={!(user?.id === value?.authorId) && !isNaN(value?.id)}
                          />
                        </div>)
                    }
                  )}
                </>

                <div className="comments">
                  {field.value.length > 0 && (formikProps.dirty) &&
                  <div className="comments-buttons">
                    <SubmitButton title="Save comment"/>
                    <button
                      type="button"
                      className="button btn-form main-btn red"
                      onClick={(event) => {
                        event.preventDefault();
                        formikProps?.handleReset();
                      }}
                    >
                      Canсel
                    </button>
                  </div>
                  }
                  <button
                    type="button"
                    className="button btn-form main-btn add-comment"
                    onClick={() => push("")}
                  >
                    Add comment
                  </button>
                </div>
              </>
              </div>
            )}
          </FieldArray>
          }
        </div>
    );
};

const CriteriaField = (props) => {
    const {name, label, formIndex, nameFieldArray} = props;
    const fieldName = formIndex >= 0 ? `${nameFieldArray}.${formIndex}.${name}` : `${name}`;
    const [field] = useField(fieldName);


    const handleClick = (push) => {
        push({text: '', isDone: false, startDate: null, deadline: null, finishDate: null});

    }
    const [isFormVisible, setIsFormVisible] = useState(false)

    const toggle = () => {
      setIsFormVisible(!isFormVisible)
  }

    return (
      <div>
          <CheckboxHelp setIsFormVisible={toggle} title="Success criteria"/>
        {isFormVisible &&
        <FieldArray name={fieldName}>

          {({insert, remove, push}) => (
            <div className="criteria-container">
              {field.value.map((value, index) => (
                <div className="criteria-info" key={index}>
                  <Checkbox
                    name={`${fieldName}.${index}.isDone`}
                    label={"Done"}
                  />
                  <div className="form-group">
                    <label className="control-label"
                           htmlFor={`${fieldName}.${index}.text`}>{label}:</label>
                    <Field
                      className="form-control criteria-field"
                      name={`${fieldName}.${index}.text`}
                      type="text"
                    />
                    <ErrorMessage
                      name={`${fieldName}.${index}.text`}
                      className="field-error"
                      render={msg => <div style={{color: "red"}}>{msg}</div>}
                    />
                  </div>
                  <DateField
                    name={`${fieldName}.${index}.startDate`}
                    label={"Start Date"}
                  />
                  <DateField
                    name={`${fieldName}.${index}.deadline`}
                    label={"Deadline"}
                  />
                  <DateField
                    name={`${fieldName}.${index}.finishDate`}
                    label={"Finish Date"}
                  />
                </div>
              ))}

              <SubmitButton className="button btn-form main-btn criteria-submit" title="Save"/>
              <button
                type="button"
                className="button btn-form main-btn red"
                onClick={() => {
                  handleClick(push);
                }}
              >
                Add Criteria
              </button>
            </div>
          )}

        </FieldArray>
        }
      </div>

    )
};

export const getFormElement = (type, field, formikProps) => {
    const props = {
        name: field.fieldName,
        label: field.label,
        id: field.id,
        disabled: field.disabled,
        options: field.options,
        updateselectvalueroot: field.updateselectvalueroot,
        placeholder: field?.placeholder,
        formikProps: formikProps,
        formIndex: field?.formIndex,
        nameFieldArray: field?.nameFieldArray,
        reviewid: field?.reviewId,
        goalid: field?.goalId
    };

    switch (type) {
        case "TextInput":
           return <TextField {...props} />
        case "DatePicker":
            return <DateField {...props} />
        case "Dropdown":
            return <SelectField {...props} />
        case "Checkbox":
            return <Checkbox {...props} />
        case "TextArea":
            return <Textarea {...props} />
        case "CriteriaField":
            return <CriteriaField {...props} />
        case "ReactSelect":
            return <ReactSelect {...props} />
        case "CommentField":
            return <CommentField {...props}/>
        default:
            return false;
    }
};
