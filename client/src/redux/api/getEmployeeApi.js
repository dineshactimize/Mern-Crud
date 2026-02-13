import API from "../../API/API";
const api = new API();
const endPoints = "employees";

export const fetchEmployeeData = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log("this is get call in API---->", endPoints);
      const response = await api.get(`${endPoints}`);
      
      console.log("fetched data raw:", response);

     
      if (response && response.data) {
        resolve(response.data); 
        return response.data;
      } else {
        resolve([]); 
      }
    } catch (error) {
      console.error("Error in fetchEmployeeData:", error);
      reject(error);
    }
  });
};