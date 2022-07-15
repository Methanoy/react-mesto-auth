import React, { useState, useEffect, useContext } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
//import { useEscKeydown, useOutsideClick } from "../utils/hooks";

function EditProfilePopup(props) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  function handleChangeName(evt) {
    setName(evt.target.value);
  }

  function handleChangeDescription(evt) {
    setDescription(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    props.onUpdateUser({
      name,
      about: description,
    });
  }

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  return (
    <PopupWithForm
      name="profile"
      buttonText={props.textOnSaveBtn}
      titleText="Редкатировать профиль"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        id="name-input"
        className="popup__input popup__input_name"
        type="text"
        placeholder="ФИО"
        name="name"
        minLength="2"
        maxLength="40"
        autoComplete="off"
        value={name || ""}
        onChange={handleChangeName}
        required
      />
      <span className="name-input-error popup__input-error"></span>

      <input
        id="occupation-input"
        className="popup__input popup__input_occupation"
        type="text"
        placeholder="Профессия"
        name="about"
        minLength="2"
        maxLength="200"
        autoComplete="off"
        value={description || ""}
        onChange={handleChangeDescription}
        required
      />
      <span className="occupation-input-error popup__input-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
