import "../index.css";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ConfirmationPopup from "./ConfirmationPopup";
import EditProfilePopup from "./EditProfilePopup";
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from "./ImagePopup";
import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";
import React, { useState, useEffect } from "react";
import api from "../utils/api.js";
import * as auth from "../utils/auth";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditAvatarPopup from "./EditAvatarPopup";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  const history = useHistory();
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");

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
  const handleCardClick = (card) => {
    setIsSelectedCard(card);
    setIsImagePopupOpen(true);
  };
  const handleSetIsLogOut = () => setIsLoggedIn(false);

  const handleDeleteCardClick = (card) =>
    setDeleteCardWithConfirm({
      ...deleteCardWithConfirm,
      isOpen: true,
      card: card,
    });

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setDeleteCardWithConfirm({ ...deleteCardWithConfirm, isOpen: false });
    setIsInfoTooltipOpen(false);
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

    api
      .changeCardLikeStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) =>
        console.log(`Ошибка при редактировании данных лайка: ${err}`)
      );
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

  function onRegister(password, email) {
    auth
      .register(password, email)
      .then((res) => {
        if (res) {
          setIsRegister(true);
          history.push("/signin");
        }
      })
      .catch((err) =>
        console.log(`Ошибка при регистрации пользователя: ${err}`)
      )
      .finally(() => setIsInfoTooltipOpen(true), setIsRegister(false));
  }

  function onLogin(password, email) {
    auth
      .login(password, email)
      .then((res) => {
        if (res.token) {
          setEmail(email);
          localStorage.setItem("jwt", res.token);
          setIsLoggedIn(true);
          history.push("/main");
        }
      })
      .catch((err) => console.log(`Ошибка при логине пользователя: ${err}`))
      .finally(() => setIsInfoTooltipOpen(true));
  }

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      auth
        .checkToken(token)
        .then((res) => {
          if (res) {
            setIsLoggedIn(true);
            setEmail(res.data.email);
            history.push("/main");
          }
        })
        .catch((err) =>
          console.log(`Ошибка при авторизации пользователя: ${err}`)
        );
    }
  }, [history]);

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
  }, []);

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
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header email={email} setLogOut={handleSetIsLogOut} />

        <Switch>
          <ProtectedRoute
            exact
            path="/"
            isLoggedIn={isLoggedIn}
            component={Main}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleDeleteCardClick}
          />

          <Route path="/signin">
            <Login onLogin={onLogin} />
          </Route>

          <Route path="/signup">
            <Register onRegister={onRegister} />
          </Route>

          <Route path="/">
            {isLoggedIn ? <Redirect to="/" /> : <Redirect to="/signin" />}
          </Route>
        </Switch>

        <Footer isLoggedIn={isLoggedIn} />

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

        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          isLoggedIn={isLoggedIn}
          isRegister={isRegister}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
