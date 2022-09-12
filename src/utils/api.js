import BASE_URL from "./utils.js";
class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  getInitialCardsData() {
    return fetch(`${this.baseUrl}/cards`, {
      credentials: "include",
      headers: this.headers,
    }).then(handleResponse);
  }

  getInitialUserData() {
    return fetch(`${this.baseUrl}/users/me`, {
      credentials: "include",
      headers: this.headers,
    }).then(handleResponse);
  }

  editUserInfo(data) {
    return fetch(`${this.baseUrl}/users/me`, {
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
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      credentials: "include",
      headers: this.headers,
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then(handleResponse);
  }

  addNewCard(data) {
    return fetch(`${this.baseUrl}/cards`, {
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
    return fetch(`${this.baseUrl}/cards/${id}`, {
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
    return fetch(`${this.baseUrl}/cards/${id}/likes`, {
      method: "PUT",
      credentials: "include",
      headers: this.headers,
    }).then(handleResponse);
  }

  _unLikeCard(id) {
    return fetch(`${this.baseUrl}/cards/${id}/likes`, {
      method: "DELETE",
      credentials: "include",
      headers: this.headers,
    }).then(handleResponse);
  }
}

const api = new Api({
  baseUrl: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;

export const handleResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(
    `Okay, Houston, we've had a problem here: ${res.status}`
  );
};