import { useEscKeydown } from "../utils/hooks";

const PopupWithForm = (props) => {
  useEscKeydown(props.onClose);

  function handleOutsideClickClose(evt) {
    if (evt.target === evt.currentTarget && props.isOpen) {
      props.onClose();
    }
  }

  return (
    <div
      className={`popup popup_${props.name} ${props.isOpen && "popup_opened"}`} onMouseDown={handleOutsideClickClose}
    >
      <div className="popup__container">
        <button
          className="popup__close-button"
          aria-label="Закрыть"
          type="button"
          onClick={props.onClose}
        ></button>
        <div className="popup__content">
          <h3 className={`popup__title popup__title_${props.name}`}>
            {props.titleText}
          </h3>
          <form
            className="popup__form"
            name={props.name}
            onSubmit={props.onSubmit}
          >
            {props.children}
            <button
              className="popup__save-button"
              type="submit"
              aria-label={props.buttonText}
            >
              {props.buttonText}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PopupWithForm;
