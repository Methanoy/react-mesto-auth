import { React } from 'react';
import useEscKeydown from '../utils/hooks';
import allowed from '../images/auth__allowed.svg';
import denied from '../images/auth__denied.svg';

function InfoTooltip({ onClose, infoTooltip }) {
  useEscKeydown(onClose);

  function handleOutsideClickClose(evt) {
    if (evt.target === evt.currentTarget && infoTooltip.isOpen) {
      onClose();
    }
  }

  return (
    <section className={`popup ${infoTooltip.isOpen && 'popup_opened'}`} onMouseDown={handleOutsideClickClose}>
      <div className="popup__container">
        <button
          className="popup__close-button"
          aria-label="Закрыть"
          type="button"
          onClick={onClose}
        ></button>
        <div className="popup__content">
          <img
            className="popup__auth-image"
            src={infoTooltip.status ? allowed : denied}
            alt="Сообщение о результате авторизации"
          ></img>
          <h3 className="popup__title popup__title_auth">
            {infoTooltip.status
              ? 'Вы успешно зарегистрировались!'
              : 'Что-то пошло не так! Попробуйте еще раз.'}
          </h3>
        </div>
      </div>
    </section>
  );
}

export default InfoTooltip;
