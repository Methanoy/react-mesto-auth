import '../index.css';
import React, { useState, useEffect } from 'react';
import {
  Redirect, Route, Switch, useHistory,
} from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ConfirmationPopup from './ConfirmationPopup';
import EditProfilePopup from './EditProfilePopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';
import api from '../utils/api';
import * as auth from '../utils/auth';
import CurrentUserContext from '../contexts/CurrentUserContext';
import EditAvatarPopup from './EditAvatarPopup';
import ProtectedRoute from './ProtectedRoute';

function App() {
  const history = useHistory();
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');

  const [deleteCardWithConfirm, setDeleteCardWithConfirm] = useState({
    isOpen: false,
    card: {},
  });
  const [isInfoTooltip, setIsInfoTooltip] = useState({
    isOpen: false,
    status: false,
  });

  const [selectedCard, setIsSelectedCard] = useState({});
  const [currentUser, setIsCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  const [showSavingText, setIsShowSavingText] = useState('Сохранить');
  const [showCreatingText, setIsShowCreatingText] = useState('Создать');
  const [showDeletingText, setIsShowDeletingText] = useState('Да');

  const handleEditAvatarClick = () => setIsEditAvatarPopupOpen(true);
  const handleEditProfileClick = () => setIsEditProfilePopupOpen(true);
  const handleAddPlaceClick = () => setIsAddPlacePopupOpen(true);
  const handleCardClick = (card) => {
    setIsSelectedCard(card);
    setIsImagePopupOpen(true);
  };

  const handleChangeInfoTooltipStatus = (state) => setIsInfoTooltip(
    { isOpen: true, status: state },
  );
  const handleDeleteCardClick = (card) => setDeleteCardWithConfirm({
    ...deleteCardWithConfirm,
    isOpen: true,
    card,
  });

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setDeleteCardWithConfirm({ ...deleteCardWithConfirm, isOpen: false });
    setIsInfoTooltip({ ...isInfoTooltip, isOpen: false });
  };

  function handleUpdateUser(data) {
    setIsShowSavingText('Сохранение...');
    api
      .editUserInfo(data)
      .then((userData) => {
        setIsCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => console.log(`Ошибка при редактировании данных пользователя: ${err}`))
      .finally(() => setIsShowSavingText('Сохранить'));
  }

  function handleAddPlaceSubmit(data) {
    setIsShowCreatingText('Создаём...');
    api
      .addNewCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(`Ошибка при добавлении новой карточки: ${err}`))
      .finally(() => setIsShowCreatingText('Создать'));
  }

  function handleUpdateAvatar(data) {
    setIsShowSavingText('Сохранение...');
    api
      .editUserAvatar(data)
      .then((userData) => {
        setIsCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => console.log(`Ошибка при редактировании данных аватара: ${err}`))
      .finally(() => setIsShowSavingText('Сохранить'));
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id);
    api
      .changeCardLikeStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
      })
      .catch((err) => console.log(`Ошибка при редактировании данных лайка: ${err}`));
  }

  function handleCardDelete(card) {
    setIsShowDeletingText('Удаляем...');
    api
      .deleteCard(card._id)
      .then((delCard) => {
        setCards((state) => state.filter((c) => (c._id === card._id ? !delCard : c)));
        closeAllPopups();
      })
      .catch((err) => console.log(`Ошибка при удалении карточки: ${err}`))
      .finally(() => setIsShowDeletingText('Да'));
  }

  function onRegister(userEmail, password) {
    auth
      .register(userEmail, password)
      .then((res) => {
        if (res) {
          history.push('/signin');
          handleChangeInfoTooltipStatus(true);
        }
      })
      .catch((err) => {
        console.log(`Ошибка при регистрации пользователя: ${err}`);
        handleChangeInfoTooltipStatus(false);
      });
  }

  function onLogin(userEmail, password) {
    auth
      .login(userEmail, password)
      .then((res) => {
        if (res.token) {
          setEmail(userEmail);
          setIsLoggedIn(true);
          localStorage.setItem('login-status', 'logged-in');
          history.push('/');
        }
      })
      .catch((err) => {
        console.log(`Ошибка при логине пользователя: ${err}`);
        handleChangeInfoTooltipStatus(false);
      });
  }

  function onLogout() {
    auth
      .logout()
      .then(() => {
        history.push('/signin');
        setIsLoggedIn(false);
        setEmail('');
        setIsCurrentUser({});
        localStorage.removeItem('login-status');
      })
      .catch((err) => {
        console.log(`Ошибка при прекращении пользователем сеанса: ${err}`);
        handleChangeInfoTooltipStatus(false);
      });
  }

  useEffect(() => {
    const token = localStorage.getItem('login-status');
    if (token) {
      auth
        .checkToken()
        .then((res) => {
          if (res) {
            setIsLoggedIn(true);
            setEmail(res.email);
            history.push('/');
          }
        })
        .catch((err) => console.log(`Ошибка при авторизации пользователя: ${err}`));
    }
  }, [history]);

  useEffect(() => {
    if (isLoggedIn) {
      api
        .getInitialCardsData()
        .then((cardsArr) => {
          setCards(cardsArr.reverse());
        })
        .catch((err) => console.log(
          `Ошибка при получении первоначальных данных карточек с сервера: ${err}`,
        ));
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (isLoggedIn) {
      api
        .getInitialUserData()
        .then((userData) => {
          setIsCurrentUser(userData);
        })
        .catch((err) => console.log(
          `Ошибка при получении первоначальных данных пользователя с сервера: ${err}`,
        ));
    }
  }, [isLoggedIn]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header email={email} setLogOut={onLogout} />

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

        <InfoTooltip infoTooltip={isInfoTooltip} onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
