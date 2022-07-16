import PopupWithForm from "./PopupWithForm";
import { React, useEffect, useRef } from "react";

function Login(props) {
  return (
    <PopupWithForm
      name="cards"
      buttonText={props.textOnCreateBtn}
      titleText="Регистрация"
      //onSubmit={handleSubmit}
    >
      <input
        id="login-input"
        className="popup__input popup__input_cardname"
        type="text"
        name="caption"
        placeholder="Email"
        minLength="2"
        maxLength="30"
        autoComplete="off"
        //ref={captionRef || ""}
        required
      />
      <span className="cardname-input-error popup__input-error"></span>
      <input
        id="password-input"
        className="popup__input popup__input_link"
        type="url"
        name="link"
        placeholder="Пароль"
        autoComplete="off"
        //ref={linkRef || ""}
        required
      />
    </PopupWithForm>
  );
}

export default Login;
