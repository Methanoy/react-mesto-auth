import { React, useEffect, useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const avatarRef = useRef(null);

  function handleSubmit(evt) {
    evt.preventDefault();

    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  useEffect(() => {
    avatarRef.current.value = "";
  }, [props.isOpen]);

  return (
    <PopupWithForm
      name="avatar"
      buttonText={props.textOnSaveBtn}
      titleText="Обновить аватар"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        id="avatar-input"
        className="popup__input popup__input_avatar"
        type="url"
        name="avatar"
        placeholder="Ссылка на аватар"
        autoComplete="off"
        ref={avatarRef || ""}
        required
      />
      <span className="avatar-input-error popup__input-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
