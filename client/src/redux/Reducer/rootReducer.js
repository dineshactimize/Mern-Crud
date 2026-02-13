import { combineReducers } from "redux";
import { getReducer } from "./getEmployeeReducer";
import { postReducer } from "./addEmployeeReducer";
import { deleteReducer } from "./deleteEmployeeReducer";
import { putReducer } from "./updateEmployeeReducer";

export const rootReducer=combineReducers({
   getemployeedata:getReducer,
   postemployeedata:postReducer,
   deleteemployeedata:deleteReducer,
   updateemployeedata:putReducer
})