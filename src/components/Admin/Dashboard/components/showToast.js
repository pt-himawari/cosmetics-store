// import React from "react";
import { toast } from "react-toastify";
const showToast = (type, message) => {
  if (type === "success") {
    toast.success(message, { autoClose: 2000 });
  } else if (type === "error") {
    toast.error(message, { autoClose: 4000 });
  }
};

export default showToast;
