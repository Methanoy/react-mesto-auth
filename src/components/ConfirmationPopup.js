import { React } from "react";
import PopupWithForm from "./PopupWithForm";

function ConfirmationPopup({
  deleteCardInfo: { isOpen, card },
  onClose,
  onDelete,
  textOnDeleteBtn,
}) {
  function handleSubmit(evt) {
    evt.preventDefault();
    onDelete(card);
  }

  return (
    <PopupWithForm
      name="confirmation"
      buttonText={textOnDeleteBtn}
      titleText="Вы уверены?"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    ></PopupWithForm>
  );
}

export default ConfirmationPopup;
