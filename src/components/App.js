import "../index.css";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ConfirmationPopup from "./ConfirmationPopup";
import EditProfilePopup from "./EditProfilePopup";
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from "./ImagePopup";
import React, { useState, useEffect } from "react";
import api from "../utils/api.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditAvatarPopup from "./EditAvatarPopup";

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);

  const [deleteCardWithConfirm, setDeleteCardWithConfirm] = useState({
    isOpen: false,
    card: {},
  });
  const [selectedCard, setIsSelectedCard] = useState({});
  const [currentUser, setIsCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  const [showSavingText, setIsShowSavingText] = useState("Сохранить");
  const [showCreatingText, setIsShowCreatingText] = useState("Создать");
  const [showDeletingText, setIsShowDeletingText] = useState("Да");

  const handleEditAvatarClick = () => setIsEditAvatarPopupOpen(true);
  const handleEditProfileClick = () => setIsEditProfilePopupOpen(true);
  const handleAddPlaceClick = () => setIsAddPlacePopupOpen(true);

  const handleDeleteCardClick = (card) =>
    setDeleteCardWithConfirm({
      ...deleteCardWithConfirm,
      isOpen: true,
      card: card,
    });

  const handleCardClick = (card) => {
    setIsSelectedCard(card);
    setIsImagePopupOpen(true);
  };

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false) ||
      setIsEditProfilePopupOpen(false) ||
      setIsAddPlacePopupOpen(false) ||
      setIsImagePopupOpen(false) ||
      setDeleteCardWithConfirm({ ...deleteCardWithConfirm, isOpen: false });
  };

  function handleUpdateUser(data) {
    setIsShowSavingText("Сохранение...");
    api
      .editUserInfo(data)
      .then((userData) => {
        setIsCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) =>
        console.log(`Ошибка при редактировании данных пользователя: ${err}`)
      )
      .finally(() => setIsShowSavingText("Сохранить"));
  }

  function handleAddPlaceSubmit(data) {
    setIsShowCreatingText("Создаём...");
    api
      .addNewCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) =>
        console.log(`Ошибка при добавлении новой карточки: ${err}`)
      )
      .finally(() => setIsShowCreatingText("Создать"));
  }

  function handleUpdateAvatar(data) {
    setIsShowSavingText("Сохранение...");
    api
      .editUserAvatar(data)
      .then((userData) => {
        setIsCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) =>
        console.log(`Ошибка при редактировании данных аватара: ${err}`)
      )
      .finally(() => setIsShowSavingText("Сохранить"));
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api.changeCardLikeStatus(card._id, !isLiked).then((newCard) => {
      setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
    })
    .catch((err) =>
    console.log(`Ошибка при редактировании данных лайка: ${err}`)
  )
  }

  function handleCardDelete(card) {
    setIsShowDeletingText("Удаляем...");
    api
      .deleteCard(card._id)
      .then((delCard) => {
        setCards((state) =>
          state.filter((c) => (c._id === card._id ? !delCard : c))
        );
        closeAllPopups();
      })
      .catch((err) => console.log(`Ошибка при удалении карточки: ${err}`))
      .finally(() => setIsShowDeletingText("Да"));
  }

  useEffect(() => {
    api
      .getInitialCardsData()
      .then((cardsArr) => {
        setCards(cardsArr);
      })
      .catch((err) =>
        console.log(
          `Ошибка при получении первоначальных данных карточек с сервера: ${err}`
        )
      );
  },[]);

  useEffect(() => {
    api
      .getInitialUserData()
      .then((userData) => {
        setIsCurrentUser(userData);
      })
      .catch((err) =>
        console.log(
          `Ошибка при получении первоначальных данных пользователя с сервера: ${err}`
        )
      );
  },[]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleDeleteCardClick}
        />
        <Footer />
        <ImagePopup
          card={selectedCard}
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          textOnSaveBtn={showSavingText}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          textOnSaveBtn={showSavingText}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          textOnCreateBtn={showCreatingText}
        />

        <ConfirmationPopup
          deleteCardInfo={deleteCardWithConfirm}
          onClose={closeAllPopups}
          onDelete={handleCardDelete}
          textOnDeleteBtn={showDeletingText}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
