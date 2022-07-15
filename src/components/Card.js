import {React, useContext, useEffect } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = props.card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = `card__del ${
    isOwn ? "card__del_visible" : "card__del_hidden"
  }`;
  const isLiked = props.card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `card__like ${
    isLiked && "card__like_active"
  }`;

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  useEffect(() => {
    function handleEscClose(evt) {
      if (evt.key === "Escape") {
        props.onClose();
      }
    }
    document.addEventListener("keydown", handleEscClose);
    return () => document.removeEventListener("keydown", handleEscClose);
  });

  useEffect(() => {
    function handleOutsideClickClose(evt) {
      if (evt.target.classList.contains("popup_opened")) {
        props.onClose();
      }
    }
    document.addEventListener("mousedown", handleOutsideClickClose);
    return () =>
      document.removeEventListener("mousedown", handleOutsideClickClose);
  });

  return (
    <li className="cards__element">
      <div className="card">
        <img
          className="card__photo"
          src={props.card.link}
          alt={props.card.name}
          onClick={handleClick}
        />
        <button
          className={cardDeleteButtonClassName}
          aria-label="Удалить карточку."
          type="button"
          onClick={handleDeleteClick}
        ></button>
        <div className="card__caption-zone">
          <h2 className="card__caption">{props.card.name}</h2>
          <div className="card__like-zone">
            <button
              className={cardLikeButtonClassName}
              aria-label="Поставить лайк."
              type="button"
              onClick={handleLikeClick}
            ></button>
            <span className="card__like-counter">
              {props.card.likes.length}
            </span>
          </div>
        </div>
      </div>
    </li>
  );
}

export default Card;
