import {types} from "../actions/types";

const initialState = {
    reviewList: [],
    next: null,
    previous: null,
};

const reviewListReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.REVIEW_LIST_LOADED:
            return {
                ...state,
                reviewList: action.payload.reviewList,
                next: action.payload.next,
                previous: action.payload.previous,

            };
        case types.REVIEW_LIST_ERROR:
            return {
                ...state,
                reviewList: action.payload.reviewList,
                next: action.payload.next,
                previous: action.payload.previous,
            };
        case types.REVIEW_LIST_UPDATED:
            return {
                ...state,
                reviewList: [...state.reviewList, ...action.payload.reviewList],
                next: action.payload.next,
                previous: action.payload.previous,
            };
        case types.REVIEW_LIST_UPDATE:
            return {
                ...state,
                reviewList: state.reviewList.map((item) => {
                    return item.id === action.payload.reviewId
                      ? { ...item, ...action.payload.reviewList }
                      : item;
                }),
            };
        case types.EMPLOYEE_GOALS_DONE_COUNT:
            return {
                ...state,
                reviewList: state.reviewList.map((item) => {
                    if (item.id === action.payload.employeeId) {
                        if (action.payload.data.isDone) {
                            item.goalsDoneCount += 1
                        } else {
                            item.goalsDoneCount -= 1
                        }
                    }
                    return item;
                }),

            };
        case types.LOG_OUT:
            return {
                reviewList: [],
                next: null,
                previous: null,
            };
        default:
            return {
                ...state,
            };
    }
};

export default reviewListReducer;
