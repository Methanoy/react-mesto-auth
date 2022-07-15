const handleResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(
    `Okay, Houston, we've had a problem here: ${res.status}`
  );
};

class Api {
  constructor(options) {
    this.cardsUrl = options.cardsUrl;
    this.userUrl = options.userUrl;
    this.avatarUrl = options.avatarUrl;
    this.headers = options.headers;
  }

  getInitialCardsData() {
    return fetch(this.cardsUrl, {
      headers: this.headers,
    }).then(handleResponse);
  }

  getInitialUserData() {
    return fetch(this.userUrl, {
      headers: this.headers,
    }).then(handleResponse);
  }

  editUserInfo(data) {
    return fetch(this.userUrl, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then(handleResponse);
  }

  editUserAvatar(data) {
    return fetch(this.avatarUrl, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then(handleResponse);
  }

  addNewCard(data) {
    return fetch(this.cardsUrl, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then(handleResponse);
  }

  deleteCard(id) {
    return fetch(`${this.cardsUrl}/${id}`, {
      method: "DELETE",
      headers: this.headers,
    }).then(handleResponse);
  }

  changeCardLikeStatus(id, flag) {
    if (flag) {
      return this._likeCard(id);
    } else {
      return this._unLikeCard(id);
    }
  }

  _likeCard(id) {
    return fetch(`${this.cardsUrl}/${id}/likes`, {
      method: "PUT",
      headers: this.headers,
    }).then(handleResponse);
  }

  _unLikeCard(id) {
    return fetch(`${this.cardsUrl}/${id}/likes`, {
      method: "DELETE",
      headers: this.headers,
    }).then(handleResponse);
  }
}

const api = new Api({
  cardsUrl: "https://mesto.nomoreparties.co/v1/cohort-42/cards",
  userUrl: "https://nomoreparties.co/v1/cohort-42/users/me",
  avatarUrl: "https://mesto.nomoreparties.co/v1/cohort-42/users/me/avatar",
  headers: {
    authorization: "a1aad93d-4f3c-4558-841a-f9fb04c02ec2",
    "Content-Type": "application/json",
  },
});

export default api;
