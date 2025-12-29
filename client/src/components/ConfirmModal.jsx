import Button from "./Button";

export default function ConfirmModal({ 
  message, 
  onConfirm, 
  onCancel, 
  isOpen 
}) {
  if (!isOpen) return null;

  return (
    <div className="confirm-modal__overlay">
      <div className="confirm-modal__content">
        <p className="confirm-modal__message">{message}</p>
        <div className="confirm-modal__buttons">
          <Button text="Yes" onClick={onConfirm} />
          <Button text="No" onClick={onCancel} />
        </div>
      </div>
    </div>
  );
}
