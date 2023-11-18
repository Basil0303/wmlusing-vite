import axios from "axios";
import { baseUrl } from "./BaseUrl";
import { ShowToast } from "../utils/Toast";

export const apiCall = async (method, url,data, params, isFormdata ) => {
  let token = localStorage.getItem('token')
  var headers = {
    "Content-Type": isFormdata ? "multipart/form-data" : "application/json",
    "Authorization": `Bearer ${token}`,
    
  };

  

  var url = baseUrl + url;
  
  console.log("THE POST DATA IS" , data)
  

  try {
    const res = await axios({
      method,
      url,
      params,
      data,
      headers,
    });
    console.log("THE RESPONSE " , res)
    var response = { status: true, data: res.data.data, message : res.data.message};

    return response;
  } catch (error) {
    ShowToast(error.response ? error.response.data.message : 'Internal Server Error')
    return;
  }
};
