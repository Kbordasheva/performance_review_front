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
    case types.GOAL_ADD:
      return {
       profile: {
         ...state.profile,
         review: state.profile.review.map((item) => {
               if (+item.id === +action.payload.reviewId) {
            item.goals = [...item.goals, action.payload.goal]
        }
        return item
           }
         )
       }
      };
    case types.GOAL_UPDATE:
      return {
       profile: {
         ...state.profile,
         review: state.profile.review.map((item) => {
                    if(+item.id === +action.payload.reviewId) {
                        item.goals.forEach((goal, index) => {
                            if (goal.id === +action.payload.goalId) {
                                goal.text = action.payload.goal.text;
                            }
                        })
                    }
                    return item
                  })
       }
      };
    case types.GOAL_IS_DONE:
      return {
       profile: {
         ...state.profile,
         review: state.profile.review.map((item) => {
                    if(+item.id === +action.payload.reviewId) {
                        item.goals.forEach((goal, index) => {
                            if (goal.id === +action.payload.goalId) {
                                goal.isDone = action.payload.data.isDone
                            }
                        })
                    }
                    return item
                  })
       }
      };
    case types.CRITERIA_ADD:
      return {
       profile: {
         ...state.profile,
         review: state.profile.review.map(
           review => review.id === action.payload.reviewId ?
             { ...review,
               goals: review.goals.map(
                 goal => goal.id === action.payload.goalId ? {
                   ...goal, criteria: [...goal.criteria, action.payload.criteria]
                 } : goal
               ) }
             : review,
         )
       }
      };
    case types.COMMENT_ADD:
      return {
       profile: {
         ...state.profile,
         review: state.profile.review.map(
           review => review.id === action.payload.reviewId ?
             { ...review,
               goals: review.goals.map(
                 goal => goal.id === action.payload.goalId ? {
                   ...goal, comments: [...goal.comments, action.payload.comment]
                 } : goal
               ) }
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