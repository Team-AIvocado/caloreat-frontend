import { modalSty } from "../../utils/styles";

// AlertModal.jsx
export const AlertModal = ({ open, msg, footer, hasNavbar = false }) => {
  if (!open) return null;

  return (
    <div className={hasNavbar ? modalSty[1] : modalSty[0]}>
      <div className="bg-white/90 p-6 border-2 border-secondary_text rounded-lg w-80 mx-auto">
        <div className="flex justify-center text-secondary_text mb-4">
          {msg}
        </div>
        <div className="flex justify-center mt-7">{footer}</div>
      </div>
    </div>
  );
};
