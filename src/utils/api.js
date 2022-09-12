export const handleResponse = (res) => {
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
      credentials: "include",
      headers: this.headers,
    }).then(handleResponse);
  }

  getInitialUserData() {
    return fetch(this.userUrl, {
      credentials: "include",
      headers: this.headers,
    }).then(handleResponse);
  }

  editUserInfo(data) {
    return fetch(this.userUrl, {
      method: "PATCH",
      credentials: "include",
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
      credentials: "include",
      headers: this.headers,
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then(handleResponse);
  }

  addNewCard(data) {
    return fetch(this.cardsUrl, {
      method: "POST",
      credentials: "include",
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
      credentials: "include",
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
      credentials: "include",
      headers: this.headers,
    }).then(handleResponse);
  }

  _unLikeCard(id) {
    return fetch(`${this.cardsUrl}/${id}/likes`, {
      method: "DELETE",
      credentials: "include",
      headers: this.headers,
    }).then(handleResponse);
  }
}

const api = new Api({
  cardsUrl: "http://localhost:3000/cards",
  userUrl: "http://localhost:3000/users/me",
  avatarUrl: "http://localhost:3000/users/me/avatar",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
