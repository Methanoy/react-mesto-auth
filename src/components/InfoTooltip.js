import { React } from "react";

function InfoTooltip(props) {
  return (
    <section
      className={`popup popup_${props.name} ${props.isOpen && "popup_opened"}`}
    >
      <div className="popup__container">
        <button
          className="popup__close-button"
          aria-label="Закрыть"
          type="button"
          onClick={props.onClose}
        ></button>
        <div className="popup__content">
          <img></img>
          <h3 className={`popup__title popup__title_${props.name}`}>
            Вы успешно зарегистрировались!
          </h3>
        </div>
      </div>
    </section>
  );
}

export default InfoTooltip;
