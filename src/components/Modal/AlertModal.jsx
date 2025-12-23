import { modalSty } from "../../utils/styles";

// AlertModal.jsx
export const AlertModal = ({ open, msg, footer, hasNavbar = false }) => {
  if (!open) return null;

  return (
    <div className={hasNavbar ? modalSty[1] : modalSty[0]}>
      <div className="bg-white/90 dark:bg-gray-800 p-6 border-2 border-secondary_text dark:border-white rounded-xl w-80 mx-auto">
        <div className="flex justify-center text-secondary_text dark:text-white mb-4 text-center whitespace-pre-wrap">
          {msg}
        </div>
        <div className="flex justify-center mt-7">{footer}</div>
      </div>
    </div>
  );
};
