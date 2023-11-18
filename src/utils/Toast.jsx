import { Flip , toast } from "react-toastify";


const options =  {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,    
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    transition : Flip,
};

export const ShowToast = ( message,isSuccess ) => isSuccess ?   toast.success(message,options) : toast.error(message,options);  
