import { modalSty } from "../../utils/styles";

export const ConfirmModal = ({
  open,
  msg,
  onConfirm,
  onCancel,
  confirmText = "확인",
  cancelText = "취소",
  hasNavbar = false,
}) => {
  if (!open) return null;

  return (
    <div className={hasNavbar ? modalSty[1] : modalSty[0]}>
      <div className="bg-white/90 p-6 border-2 border-secondary_text rounded-lg w-80 mx-auto">
        <div className="flex justify-center text-secondary_text mb-6 text-center">
          {msg}
        </div>
        <div className="flex justify-center gap-3">
          <button
            onClick={onCancel}
            className="bg-sub_background rounded-lg text-sm px-6 py-2 text-primary_text cursor-pointer"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className="bg-error_color rounded-lg text-sm px-6 py-2 border-none text-white cursor-pointer"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};
