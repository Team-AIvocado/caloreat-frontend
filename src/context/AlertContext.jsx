import { createContext, useContext, useState } from "react";
import { AlertModal } from "../components/Modal/AlertModal";

const AlertContext = createContext(null);

export function AlertProvider({ children }) {
  const [alert, setAlert] = useState(null);

  const showAlert = ({ msg, footer }) => {
    setAlert({ msg, footer });
  };

  const closeAlert = () => {
    if (alert && alert.onClose) {
      alert.onClose();
    }
    setAlert(null);
  };

  return (
    <AlertContext.Provider value={{ showAlert, closeAlert }}>
      {children}
      {alert && (
        <AlertModal open={alert} msg={alert.msg} footer={alert.footer} />
      )}
    </AlertContext.Provider>
  );
}

export const useAlert = () => useContext(AlertContext);
