import { useState } from 'react';
import Modal from '../../../Shared/Modal/Modal'
import { addReview } from "../../../../store/actions/profileDetails";
import AddReviewForm from "./AddReviewForm/AddReviewForm";
import { useDispatch } from "react-redux";
import "./AddReviewModal.scss"

const AddReviewModal = (props) => {
	const dispatch = useDispatch();
	const { setModalVisible, isModalVisible, employeeId } = props;

	const [formSubmitState, setFormSubmitState] = useState('filling');

	const onSubmit = (
		values,
		{ setSubmitting, resetForm, setStatus, status }
	) => {
		dispatch(addReview({...values, employeeId: employeeId}))
			.then((response) => {
				setFormSubmitState('success');
			})
			.catch(() => {
				setFormSubmitState('error');
			})
			.finally(() => setSubmitting(false));
	};

	return (
		<Modal isVisible={isModalVisible} setIsVisible={setModalVisible} size="xs">
			{formSubmitState === 'filling' && (
				<div className="modal-review-container">
					<div>
						<h3 className="modal-title"> Add new review:</h3>
					</div>

					<AddReviewForm onSubmit={onSubmit} />
				</div>
			)}
			{formSubmitState === 'success' && (
				<div className="response-container">
					<h3 className="h3 title">
						New review successfully created!
					</h3>
				</div>
			)}
			{formSubmitState === 'error' && (
				<div className="response-container">
					<h3 className="h3 title">
						Something went wrong, please fill all required fields and try again.
					</h3>
				</div>
			)}
		</Modal>
	);
};

export default AddReviewModal;
