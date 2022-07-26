import { React } from "react";
import { useEscKeydown, useOutsideClick } from "../utils/hooks";
import allowed from "../images/auth__allowed.svg";
import denied from "../images/auth__denied.svg";

function InfoTooltip(props) {
  useEscKeydown(props.onClose);
  useOutsideClick(props.onClose);

  return (
    <section className={`popup ${props.isOpen && "popup_opened"}`}>
      <div className="popup__container">
        <button
          className="popup__close-button"
          aria-label="Закрыть"
          type="button"
          onClick={props.onClose}
        ></button>
        <div className="popup__content">
          <img
            className="popup__auth-image"
            src={props.isLoggedIn || props.isRegister ? allowed : denied}
          alt="Сообщение об результате авторизации"></img>
          <h3 className="popup__title popup__title_auth">
            {props.isLoggedIn || props.isRegister
              ? "Вы успешно зарегистрировались!"
              : "Что-то пошло не так! Попробуйте еще раз."}
          </h3>
        </div>
      </div>
    </section>
  );
}

export default InfoTooltip;
