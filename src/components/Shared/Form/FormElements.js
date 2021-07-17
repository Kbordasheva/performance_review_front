import React from "react";
import {useSelector} from "react-redux";
import ReactTooltip from "react-tooltip";
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

    return (
        <button type="submit" className="button btn-form main-btn" {...rest} disabled={isSubmitting}>{title}</button>
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
                    name === "additionalDocuments"
                      ? "col-md-7"
                      : name === "address"
                      ? "col-md-5"
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
            {label && <label className="control-label col-md-2" htmlFor={fieldName}>{label}:</label>}
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
const TimeField = (props) => {
    const {name, label, formIndex, nameFieldArray} = props;
    const fieldName = formIndex >= 0 ?  `${nameFieldArray}.${formIndex}.${name}`: `${name}`

    return (
        <div className="form-group">
            {label && <label className="control-label col-md-2" htmlFor={fieldName}>{label}:</label>}

            <Field
                className="form-control time-input"
                as="input"
                id={fieldName}
                name={fieldName}
                type="time"
            />
            {/* {notify && <span className="notify-icon"></span>} */}
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
                {/*<option value="">Please select...</option>*/}
                {options.map((opt, index) =>
                    <option value={opt.value} key={opt.key || index} label={opt.text || opt.value}/>)}
            </Field>
            <ErrorMessage name={fieldName} render={msg => <div style={{color: "red"}}>{msg}</div>}/>
        </div>
    )
};
const CustomSelect = (props) => {
    const {name, label, options, updateselectvalueroot, formikProps,formIndex, nameFieldArray, ...rest} = props;
    const onChange = (e) => {
        const options = e.target.options
        formikProps.setFieldValue(name, e.target.value)
        if(updateselectvalueroot){
            if(name === 'cityId') {
                updateselectvalueroot(options[options.selectedIndex].label)
            }
            else {
                updateselectvalueroot(e.target.value)
            }
        }
    };

    return (
        <div className="form-group">
            {label && <label className="control-label col-md-2" htmlFor={name}>{label}:</label>}
            <Field
                className="form-control col-sm-3"
                as="select"
                id={name}
                name={name}
                onChange={onChange}
                {...rest}
            >
                {options.map((opt, index) =>
                    <option value={opt.id || opt.value} key={opt.id || index} label={opt.name || opt.label || opt.text}
                            hidden={opt.hidden}/>)}
            </Field>

            <ErrorMessage name={name} render={msg => <div style={{color: "red"}}>{msg}</div>}/>
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
                {/*<option value="">Please select...</option>*/}
                {options.map((opt, index) =>
                    <option value={opt.id || opt.value} key={opt.id || index} label={opt.name || opt.label || opt.text}
                            hidden={opt.hidden}/>)}
            </Field>

            <ErrorMessage name={name} render={msg => <div style={{color: "red"}}>{msg}</div>}/>
        </div>
    )
};

const Textarea = (props) => {
    const {name, label, placeholder,formIndex, nameFieldArray, formikProps, ...rest} = props;
    const fieldName = formIndex >= 0 ?  `${nameFieldArray}.${formIndex}.${name}`: `${name}`
    return (
        <div className="form-group textarea-group column">
            {label && <label className="control-label col-md-2" htmlFor={fieldName}>{label}:</label>}
            <Field
                className="form-control col-md-6"
                as="textarea"
                name={fieldName}
                id={fieldName}
                placeholder={placeholder || ""}
                {...rest}

            />
            <ErrorMessage name={fieldName} render={msg => <div style={{color: "red"}}>{msg}</div>}/>
        </div>
    )
};

const Radios = (props) => {
    const { name, label, formIndex, nameFieldArray, options } = props;
    const fieldName =
      formIndex >= 0 ? `${nameFieldArray}.${formIndex}.${name}` : `${name}`;

    return (
      <div className="custom-radio">
        <h4 className="relocation-type" id="my-radio-group">
          {label}
        </h4>

        {options.map((option, index) => (
          <div
            className="relocation-group"
            role="group"
            aria-labelledby="my-radio-group"
            key={index}
          >
            <div className="relocation-group-radio">
              <div className="relocation-type-input">
                <Field
                  type="radio"
                  name={fieldName}
                  value={option.value}
                  className="custom-control-input"
                  id={option.key}
                />
                <label className="custom-radio__label" htmlFor={option.key}>
                  <span></span>
                </label>
              </div>

              <label>
                {option.label}

                {option.tooltip && (
                  <span>
                    <button className="tooltip-button" type="button" data-tip={option.tooltip} data-for={option.label}>
                      {/*<img src={QuestionIcon} alt="question" />*/}
                    </button>
                    <ReactTooltip
                      id={option.label}
                      place="top"
                      type="dark"
                      effect="solid"
                      html={true}
                    />
                  </span>
                )}
              </label>
            </div>
          </div>
        ))}
      </div>
    );
  };


const Checkboxes = (props) => {
    const {name, label, options, formIndex, nameFieldArray} = props;
    const fieldName = formIndex >= 0 ?  `${nameFieldArray}.${formIndex}.${name}`: `${name}`
        return (
        <div className="form-group">
            {label && <label className="control-label col-md-2" htmlFor={name}>{label}</label>}
            {options.map((opt) => {
                const checkboxKey = opt.key
                return(
                <div key={opt.key} className="custom-control custom-checkbox option-inline">
                    <Field
                        className="custom-control-input"
                        type="checkbox"
                        id={checkboxKey}
                        name={fieldName}
                        value={opt.value}
                    />
                    <label
                        className="custom-checkbox__label"
                        htmlFor={checkboxKey}
                    >
                        <span></span>{opt.text}
                    </label>
                </div>
            )}
            )}
            <ErrorMessage name={fieldName} render={msg => <div style={{color: "red"}}>{msg}</div>}/>
        </div>
    )
};
const Checkbox = (props) => {
    const {name, label,updateselectvalueroot, formikProps, formIndex, nameFieldArray} = props;
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
        <label className="control-label col-md-4"
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
const Currency = (props) => {
    const {name, label, options, formIndex, nameFieldArray} = props;
    const fieldName = formIndex >= 0 ?  `${nameFieldArray}.${formIndex}.${name}`: `${name}`
    return (
        <div className="form-group">
            {label && <label className="control-label col-md-2" htmlFor={fieldName}>{label}:</label>}
            <Field
                className="form-control col-md-1"
                as="select"
                id={fieldName}
                name={fieldName}
            >
                {options.map((opt, index) =>
                    <option value={opt.value} key={index} label={opt.text}/>)}
            </Field>
            <Field
                className="form-control col-md-2"
                type="text"
                id={fieldName + "-amount"}
                name={formIndex >= 0 ? `${nameFieldArray}.${formIndex}.ticketCost` : "salaryAfterRelocation"}
            />
            <ErrorMessage name={fieldName} render={msg => <div style={{color: "red"}}>{msg}</div>}/>
        </div>
    )
};

const NoteField = (props) => {
    const {name, label, placeholder,formikProps, formIndex, nameFieldArray} = props;
    const fieldName = formIndex >= 0 ? `${nameFieldArray}.${formIndex}.${name}` : `${name}`;
    const [field] = useField(fieldName);

    const user = useSelector((state) => state.auth.user);

    return (
        <div className="form-group textarea-group column">
            {field.value.length > 0 && (
                <label className="control-label col-md-2" htmlFor={`${fieldName}`}>
                    {label}:
                </label>
            )}
            <FieldArray name={fieldName}>
                {({insert, remove, push}) => (
                    <>
                        <>
                            {field.value.length > 0 &&
                                field.value.map((value, index) => {
                                    const createdAt = value?.createdAt?.slice(0, 16);
                                    const updatedAt = value?.updatedAt?.slice(0, 16);
                                    const createdDate = new Date(createdAt);
                                    const updatedDate = new Date(updatedAt)
                                    const labelNote =  (createdAt === updatedAt) ?
                                        `${(moment(createdDate).format('L') + ' ' + value?.author + ' ' + 'wrote:')}` :
                                        `${(moment(updatedDate).format('L') + ' ' + value?.author + '(edit) ' + 'wrote:')}`
                                    return (
                                        <div className="note" key={index}>
                                            {value?.author && <p> {labelNote}</p>}
                                            <Field
                                                className="form-control col-md-6"
                                                as="textarea"
                                                name={`${fieldName}.${index}.text`}
                                                id={`${fieldName}.${index}.text`}
                                                placeholder={placeholder || ''}
                                                disabled={!(user?.internalId === value?.authorId) && !isNaN(value?.id)}
                                            />
                                        </div>)
                                }
                                )}
                        </>

                        <div className="notes">
                            {field.value.length > 0 &&
                                <div className="notes-buttons">
                                    <SubmitButton title="Save notes" />
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
                            <div></div>
                            <button type="button" className="tooltip-button" data-tip="Add notes">
                            </button>
                            <ReactTooltip place="top" type="dark" effect="solid"/>
                        </div>
                    </>
                )}
            </FieldArray>
        </div>
    );
};

const PhoneField = (props) => {
    const {name, label} = props;
    const [field] = useField(props);
    return (
        <div className="form-group">
            <label className="control-label col-sm-2" htmlFor={name}>{label}:</label>
            <FieldArray name={name}>
                {({insert, remove, push}) => (
                    <div className="field-array col-sm-5">
                        {field.value.length > 0 &&
                        field.value.map((phone, index) => (
                            <div key={index}>
                                <Field
                                    name={`${name}.${index}`}
                                    className="form-control"
                                    placeholder="+XXX XX XXXXXXX"
                                    type="text"
                                />
                                <button
                                    type="button"
                                    className="btn btn-control"
                                    onClick={() => insert(index + 1, "")}
                                    title="Add phone number"
                                >
                                    +
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-control"
                                    onClick={() => remove(index)}
                                    title="Remove phone number"
                                >
                                    -
                                </button>
                                <ErrorMessage
                                    name={`${name}.${index}`}
                                    className="field-error"
                                    render={msg => <div style={{color: "red"}}>{msg}</div>}
                                />
                            </div>
                        ))}
                    </div>
                )}
            </FieldArray>
        </div>
    )
};

const CriteriaField = (props) => {
    const {name, label, formIndex, nameFieldArray} = props;
    const fieldName = formIndex >= 0 ? `${nameFieldArray}.${formIndex}.${name}` : `${name}`;
    const [field] = useField(fieldName);


    const handleClick = (push) => {
        push({text: '', isDone: false, startDate: '', deadline: '', finishDate: ''});

    }

    return (
        <FieldArray name={fieldName}>
            {({insert, remove, push}) => (
                <div className="">
                    {field.value.map((value, index) => (
                        <div className="" key={index}>
                            <div className="form-group">
                                <label className="control-label col-md-2"
                                       htmlFor={`${fieldName}.${index}.text`}>{label}:</label>
                                <Field
                                    name={`${fieldName}.${index}.text`}
                                    className="form-control col-md-5"
                                    type="text"
                                />
                                <ErrorMessage
                                    name={`${fieldName}.${index}.text`}
                                    className="field-error"
                                    render={msg => <div style={{color: "red"}}>{msg}</div>}
                                />
                            </div>
                            <Checkbox
                                name={`${fieldName}.${index}.isDone`}
                                label={"Done"}
                            />
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
        notify: field.notify,
        notify_days: field.notifyDaysBefore,
        placeholder: field?.placeholder,
        formikProps: formikProps,
        formIndex: field?.formIndex,
        nameFieldArray: field?.nameFieldArray
    };

    switch (type) {
        case "TextInput":
        case "NumberInput":
           return <TextField {...props} />
        case "DatePicker":
            return <DateField {...props} />
        case "TimeField":
            return <TimeField {...props} />
        case "Dropdown":
            return <SelectField {...props} />
        case "Checkboxes":
            return <Checkboxes {...props} />
        case "Radios":
            return <Radios {...props} />
        case "Checkbox":
            return <Checkbox {...props} />
        case "TextArea":
            return <Textarea {...props} />
        case "Currency":
            return <Currency {...props} />
        case "PhoneField":
            return <PhoneField {...props} />
        case "CriteriaField":
            return <CriteriaField {...props} />
        case "ReactSelect":
            return <ReactSelect {...props} />
        case "CustomSelect":
            return <CustomSelect {...props} />
        case "NoteField":
            return <NoteField {...props}/>
        default:
            return false;
    }
};
