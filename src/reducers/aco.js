import * as acoTypes from "../constants/aco";

const initialState = {
  get : {
    isLoading: false,
    error    : "",
    data     : [],
  },
};

export default function aco(state = initialState, action) {
  switch (action.type) {


    case acoTypes.ACO_GET_ROUTE_SUCCESS:
      return {
        ...state,
        get : {
          isLoading: false,
          error    : "",
          data     : action.data,
        }
      };
    case acoTypes.ACO_GET_ROUTE_FAIL:
      return {
        ...state,
        get : {
          isLoading: false,
          error    : action.error,
          data     : [],
        }
      };
    case acoTypes.ACO_GETTING_ROUTE:
      return {
        ...state,
        get : {
          isLoading: true,
          error    : action.error,
          data     : [],
        }
      };

    default:
      return state
  }
}