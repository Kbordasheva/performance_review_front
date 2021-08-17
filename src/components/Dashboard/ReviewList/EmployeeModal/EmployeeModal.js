import Modal from "../../../Shared/Modal/Modal";
import { useState } from "react";
import AddEmployeeForm from "./AddEmployeeForm/AddEmployeeForm";
import { addEmployee } from "../../../../store/actions/employee";
import "./EmployeeModal.scss"
import { useDispatch } from "react-redux";

const EmployeeModal = (props) => {
  const dispatch = useDispatch();
  const { setModalVisible, isModalVisible } = props;
  const [formSubmitState, setFormSubmitState] = useState("filling");

  const onSubmit = (values, { setSubmitting, resetForm, setStatus }) => {
    dispatch(addEmployee(values))
      .then((response) => {
        setFormSubmitState("success");
      })
      .catch(() => {
        setFormSubmitState("error");
      })
      .finally(() => setSubmitting(false));
  };


  return (
    <Modal isVisible={isModalVisible} setIsVisible={setModalVisible}>
      {formSubmitState === "filling" && (
        <div className="modal-employee-container">
          <div className="title">
            <h3 className="modal-title">
              Add new employee
            </h3>
          </div>

          <AddEmployeeForm onSubmit={onSubmit}/>
        </div>
      )}
      {formSubmitState === "success" && (
        <div className="response-container">
          <h3 className="h3 title">
            New Employee was created.
          </h3>
        </div>
      )}
      {formSubmitState === "error" && (
        <div className="response-container">
          <h3 className="h3 title">Something went wrong, please try again.</h3>
        </div>
      )}
    </Modal>
  );
};

export default EmployeeModal;
