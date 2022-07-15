import React, { useContext } from "react";
import Card from "./Card.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main(props) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <button
          className="profile__avatar-button"
          aria-label="Редактировать аватар."
          onClick={props.onEditAvatar}
        >
          <img
            className="profile__avatar"
            src={currentUser.avatar}
            alt="Ваш аватар."
          />
        </button>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <p className="profile__occupation">{currentUser.about}</p>
          <button
            className="profile__edit-button"
            aria-label="Редактировать данные профиля."
            type="button"
            onClick={props.onEditProfile}
          ></button>
        </div>
        <button
          className="profile__add-button"
          aria-label="Добавить картинку."
          type="button"
          onClick={props.onAddPlace}
        ></button>
      </section>

      <section className="elements">
        <ul className="cards">
          {props.cards.map((element) => (
            <Card
              card={element}
              key={element._id}
              onCardClick={props.onCardClick}
              onCardLike={props.onCardLike}
              onCardDelete={props.onCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
