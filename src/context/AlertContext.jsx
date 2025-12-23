import { createContext, useContext, useState } from "react";
import { AlertModal } from "../components/Modal/AlertModal";

const AlertContext = createContext(null);

export function AlertProvider({ children }) {
  const [alert, setAlert] = useState(null);

  const showAlert = ({ msg, footer, hasNavbar, input }) => {
    setAlert({ msg, footer, hasNavbar, input });
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
        <AlertModal
          open={alert}
          msg={alert.msg}
          footer={
            alert.footer || (
              <button
                onClick={closeAlert}
                className="bg-main_color text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition-all font-medium"
              >
                확인
              </button>
            )
          }
          hasNavbar={alert.hasNavbar}
          input={alert.input}
        />
      )}
    </AlertContext.Provider>
  );
}

export const useAlert = () => useContext(AlertContext);
