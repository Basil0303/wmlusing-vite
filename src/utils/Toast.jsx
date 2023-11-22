import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

export const ShowToast = (message, type) => {
    if (type) {
      toast.success(message, {
        position: "top-right",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",

      });
    } else {
      toast.error(message, {
        position: "top-right",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",

      });
    }
  };