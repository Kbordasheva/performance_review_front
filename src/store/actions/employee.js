import axios from "../../axios";

export const addEmployee = async (data) => {
  try {
    const response = await axios.post(`/api/v1/employees/`, data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};