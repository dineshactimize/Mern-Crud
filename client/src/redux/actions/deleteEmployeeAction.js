import { deleteEmployeedata } from '../api/deleteEmployeeApi'
import * as types from './actionTypes'

export const deleteEmployeeDataStart=()=>{
    return{
        type:types.DELETE_EMPLOYEE_DATA_START
    }
}
export const deleteEmployeeDataSuccess=(data)=>{
    console.log("this is delete employee reducer call---->")
    return{
        type:types.DELETE_EMPLOYEE_DATA_SUCCESS,
        payload:data
    }
}
export const deleteEmployeeDataError=(error)=>{
    return{
        type:types.DELETE_EMPLOYEE_DATA_ERROR,
        payload:error
    }
}
export const deleteEmployeeDataActionInitiate = (id) => {
  return async function (dispatch) {
    dispatch(deleteEmployeeDataStart());
   
    try {
      const res = await deleteEmployeedata(id);
      dispatch(deleteEmployeeDataSuccess(res.data || {}));
      return res;
    } catch (error) {
      console.error("deleteEmployeeDataError error", error);
      dispatch(deleteEmployeeDataError(error.message));
      throw error;
    }
  };
};