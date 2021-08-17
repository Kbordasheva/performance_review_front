import axios from "../../axios";
import actionCreators from "./actionCreators";

export const addEmployee = (data) => async dispatch => {
  try {
    const response = await axios.post(`/api/v1/employees/`, data);
    dispatch(actionCreators.EmployeeAdd(response.data))
    return response.data;
  } catch (error) {
    console.error(error);
  }
};