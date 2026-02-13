import { saveEmployeeData } from '../api/addEmployeeApi';
import * as types from './actionTypes'


export const postEmployeeDataStart=()=>{
    return{
        type:types.CREATE_EMPLOYEE_DATA_START
    }   
};

export const postEmployeeDataSuccess=(data)=>{
    console.log("this is postdatasuccessaction---->",data)
    return{
        type:types.CREATE_EMPLOYEE_DATA_SUCCESS,
        payload:data
    }
};

export const postEmployeeDataError=(error)=>{
    console.log("this is postdataerrorsaction---->")
    return{
        type:types.CREATE_EMPLOYEE_DATA_ERROR,
        payload:error
    }
}
export const postEmployeeDataActionInitiate = (formData) => {
  return async function (dispatch) {
    dispatch(postEmployeeDataStart());
   
 
    try {
      const res = await saveEmployeeData(formData);
     
      dispatch(postEmployeeDataSuccess(res.data.data));
    } catch (error) {
      console.error("postEmployeeDataError error", error);
      dispatch(postEmployeeDataError(error.message));
    }
  };
};