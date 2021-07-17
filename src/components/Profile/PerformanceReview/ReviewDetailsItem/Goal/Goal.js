import React from "react";
import { SubmitButton } from "../../../../Shared/Form/FormElements";
import { Formik, Form, FieldArray } from "formik";
import { useDispatch } from "react-redux";
import { getValuesToUpdate } from "../../../../../helpers";
import GoalsField from "./GoalsField";
import { editAllGoals } from "../../../../../store/actions/profileDetails";

const goalInitialValues = {
  text: "",
  isDone: false,
  criteria: [],
  comments: [],

};

const comparisonFields = [
  "text",
  "isDone",
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
        // dispatch(addAllAccommodationDetails(valuesToAdd, reviewId))
      }
    }
    finally {
      setSubmitting(false);
    }

    // dispatch(editGoal(review_id, goal.id, values));
    // setSubmitting(false);
  }

  return (
    <div className="accommodation-details">
            <Formik
              enableReinitialize
              initialValues={initialValues}
              onSubmit={onSubmit}
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
                                  <GoalsField
                                  formikProps={formikProps}
                                  formIndex={formIndex}
                                />
                                )
                              )}
                          </div>
                          <div className="button-wrapper">
                            <SubmitButton title="Submit" />

                            <button
                              type="button"
                              className="button btn-form main-btn red"
                              onClick={() =>
                                push(goalInitialValues)
                              }
                            >
                              Add goal
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
