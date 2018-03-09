import axios from 'axios'
const url = "http://localhost:3000";

export const GetAcoRoute = (dataJson, successCB, errorCB) => {
  axios.post(
    url+'/aco',
    dataJson,
  ).then((res)=> {
    successCB(res.data);
  }).catch((err)=> {
    errorCB("Unable to load. Try after sometime..")
  })
};