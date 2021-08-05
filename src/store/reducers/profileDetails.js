import {types} from "../actions/types";
import { act } from "@testing-library/react";

const initialState = {
    profile: null,
};

const profileDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.PROFILE_DETAILS_LOADED:
        return {
            profile: action.payload.profile,
        };
    case types.PROFILE_DETAILS_UPDATED:
        return {
            ...state,
            profile: action.payload.profile
        };
    case types.PROFILE_DETAILS_ERROR:
        return {
            profile: action.payload.profile,
        };
    case types.GENERAL_INFO_UPDATED:
        return {
            profile: { ...state.profile,
                generalInfo: { ...state.profile.employee,
                }}
        };
    case types.REVIEW_ADD:
      return {
            profile:
              { ...state.profile,
                review: [
                  action.payload.review,
                  ...state.profile.review,
                ],
              },
      };
    case types.GOAL_REMOVE:
      return {
       profile: {
         ...state.profile,
         review: state.profile.review.map(
           review => review.id === action.payload.reviewId ?
             { ...review, goals: review.goals.filter(goal => goal.id !== action.payload.goalId) }
             : review,
         )
       }

      };
    default:
        return {
            ...state,
          };
  }
}

export default profileDetailsReducer;