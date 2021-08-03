import {types} from "../actions/types";

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
    default:
        return {
            ...state,
          };
  }
}

export default profileDetailsReducer;