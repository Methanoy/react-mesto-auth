import { React, useState } from "react";
import { Link } from "react-router-dom";

function Register(props) {
  return (
    <section className="authorization">
      <div className="authorization__container">
        <h3 className="authorization__title">Регистрация</h3>
        <form className="authorization__form">
          <input
            id="login-input"
            className="authorization__input"
            type="email"
            name="login"
            placeholder="Email"
            minLength="2"
            maxLength="30"
            autoComplete="off"
            required
          />
          <input
            id="password-input"
            className="authorization__input"
            type="password"
            name="password"
            placeholder="Пароль"
            minLength="4"
            maxLength="15"
            autoComplete="off"
            required
          />
          <button className="authorization__btn">Зарегистрироваться</button>
          <Link to="/signin" className="authorization__link">Уже зарегистрированы? Войти</Link>
        </form>
      </div>
    </section>
  );
}

export default Register;
