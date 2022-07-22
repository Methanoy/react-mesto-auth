import { React, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import * as auth from "../utils/auth";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    auth.register(password, email).then((res) => {
      if (res.statusCode === 200) {
        history.push("/signin");
      }
    });
  };

  return (
    <section className="authorization">
      <div className="authorization__container">
        <h3 className="authorization__title">Регистрация</h3>
        <form onSubmit={handleSubmit} className="authorization__form">
          <input
            id="login-input"
            className="authorization__input"
            type="email"
            name="login"
            value={email}
            onChange={({ target }) => setEmail(target.value)}
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
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            placeholder="Пароль"
            minLength="4"
            maxLength="15"
            autoComplete="off"
            required
          />
          <button className="authorization__btn" type="submit">Зарегистрироваться</button>
          <Link to="/signin" className="authorization__link">
            Уже зарегистрированы? Войти
          </Link>
        </form>
      </div>
    </section>
  );
};

export default Register;
