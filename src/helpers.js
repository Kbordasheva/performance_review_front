export const getValuesToUpdate = (currentValues, initialValues, formFields) => {
  return currentValues
    .filter(({ id }) => !isNaN(id))
    .filter((currentValue) => {
      const initialValue = initialValues.find(
        ({ id }) => id === currentValue.id
      );
      return formFields.some(
        (field) => currentValue[field] !== initialValue[field]
      );
    });
};
