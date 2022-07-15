function ImagePopup(props) {
  return (
    <div className={`popup popup_zoom ${props.isOpen && "popup_opened"}`}>
      <div className="popup__container popup__container_zoom">
        <img
          className="popup__zoom-image"
          src={props.card.link}
          alt={props.card.name}
        />
        <h3 className="popup__title popup__title_zoom">{props.card.name}</h3>
        <button
          className="popup__close-button"
          aria-label="Закрыть"
          type="button"
          onClick={props.onClose}
        ></button>
      </div>
    </div>
  );
}

export default ImagePopup;
