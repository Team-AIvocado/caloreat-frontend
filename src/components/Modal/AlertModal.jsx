// AlertModal.jsx
export const AlertModal = ({ open, msg, footer }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/30 z-50 flex justify-center items-center">
      <div className="bg-white/90 p-6 border-2 border-secondary_text rounded-xl w-80">
        <div className="flex justify-center text-secondary_text mb-4">
          {msg}
        </div>
        <div className="flex justify-around mt-7">{footer}</div>
      </div>
    </div>
  );
};
