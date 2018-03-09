import * as acoTypes from "../constants/aco";
import * as acoApi from "../api/aco";

export const GettingAcoRoute = () => (dispatch, getState) => {
  dispatch({
    type: acoTypes.ACO_GETTING_ROUTE,
  })
};

export const GetAcoRoute = (dataJson) => (dispatch, getState) => {
  acoApi.GetAcoRoute(dataJson, resp => {
    dispatch({
      type : acoTypes.ACO_GET_ROUTE_SUCCESS,
      data : resp.data
    })
  }, error =>{
    dispatch({
      type  : acoTypes.ACO_GET_ROUTE_FAIL,
      error : "No de logro obtener la ruta optimizada"
    })
  })
};