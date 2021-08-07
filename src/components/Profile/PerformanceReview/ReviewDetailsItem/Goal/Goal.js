import React from "react";
import { SubmitButton } from "../../../../Shared/Form/FormElements";
import { Formik, Form, FieldArray } from "formik";
import { useDispatch } from "react-redux";
import { getValuesToUpdate } from "../../../../../helpers";
import GoalsField from "./GoalsField";
import * as Yup from 'yup';
import { addAllGoals, editAllGoals } from "../../../../../store/actions/profileDetails";
import "./Goal.scss"

const validationSchema = Yup.object().shape({
	goalsInfo: Yup.array().of(
		Yup.object().shape({
			text: Yup.string().required('This field is required'),
      criteria: Yup.array().of(
        Yup.object().shape({
          text: Yup.string().required('This field is required'),
          startDate: Yup.date().required('This field is required'),
          deadline: Yup.date().required('This field is required'),
        })
      ),
      comments: Yup.array().of(
        Yup.object().shape({
          text: Yup.string().required('This field is required'),
        })
      ),
		})
	),
});

const goalInitialValues = {
  text: "",
  isDone: false,
  criteria: [],
  comments: [],

};

const comparisonFields = [
  "text",
  "isDone",
  "criteria",
  "comments"
];

const Goal = (props) => {
  const dispatch = useDispatch();

  const { reviewId, goalsInfo } = props;

    const initialValues = {
    goalsInfo: goalsInfo.length
      ? goalsInfo
      : [goalInitialValues],
  };

  const onSubmit = (values, {setSubmitting, resetForm, setStatus}) => {
    const valuesInfo = [...values?.goalsInfo];

    const valuesToUpdate = getValuesToUpdate(
      valuesInfo,
      goalsInfo,
      comparisonFields
    );

    const valuesToAdd = valuesInfo.filter(({ id }) => isNaN(id));

    try {
      if (valuesToUpdate.length) {
        dispatch(editAllGoals(valuesToUpdate, reviewId))
      }
      if (valuesToAdd.length) {
        dispatch(addAllGoals(valuesToAdd, reviewId))
      }
    }
    finally {
      setSubmitting(false);
    }

  }

  return (
    <div className="goals-info">
            <Formik
              enableReinitialize
              initialValues={initialValues}
              onSubmit={onSubmit}
              validationSchema={validationSchema}
              render={(formikProps) => {
                return (
                  <Form>
                    <FieldArray
                      name="goalsInfo"
                      render={({ remove, push }) => (
                        <>
                          <div>
                            {formikProps.values.goalsInfo.length > 0 &&
                              formikProps.values.goalsInfo.map(
                                (goalsInfo, formIndex) => (
                                  <GoalsField key={formIndex}
                                  formikProps={formikProps}
                                  formIndex={formIndex}
                                  reviewId={reviewId}
                                  goalId={goalsInfo.id}
                                />
                                )
                              )}
                          </div>
                          <div className="button-wrapper">
                            <SubmitButton title="Save" />

                            <button
                              type="button"
                              className="button btn-form main-btn"
                              onClick={() =>
                                push(goalInitialValues)
                              }
                            >
                              Add new goal
                            </button>
                          </div>
                        </>
                      )}
                    />
                  </Form>
                );
              }}
            />
    </div>
  );
};

export default Goal;
