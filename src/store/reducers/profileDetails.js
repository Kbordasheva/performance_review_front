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
    }
    default:
        return {
            ...state,
          };
  }
}

export default profileDetailsReducer;