import { updateEmployeeDataChanges } from '../api/updateEmployeeApi';
import * as types from './actionTypes'


export const putEmployeeDataStart=()=>{
    return{
        type:types.UPDATE_EMPLOYEE_DATA_START
    }   
};

export const putEmployeeDataSuccess=(data)=>{
    console.log("this is putdatasuccessaction---->",data)
    return{
        type:types.UPDATE_EMPLOYEE_DATA_SUCCESS,
        payload:data
    }
};

export const putEmployeeDataError=(error)=>{
    console.log("this is putdataerrorsaction---->")
    return{
        type:types.UPDATE_EMPLOYEE_DATA_ERROR,
        payload:error
    }
}
export const putEmployeeDataActionInitiate = (employeedata, id) => {
  return async function (dispatch) {
    dispatch(putEmployeeDataStart());

    try {
      const res = await updateEmployeeDataChanges(employeedata, id);
      dispatch(putEmployeeDataSuccess(res.data));
      return res;
    } catch (error) {
      console.error("putEmployeeDataError error", error);
      dispatch(putEmployeeDataError(error.message));
      throw error;
    }
  };
};