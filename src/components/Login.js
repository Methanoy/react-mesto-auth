import { React, useState, useHistory } from "react";
import * as auth from "../utils/auth";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleSubmit = (evt) => {
    evt.preventDefault();

    const resetForm = () => {
      setEmail("");
      setPassword("");
    };

    onLogin({ email, password })
      .then(() => {
        history.push("/main");
      })
      .then(() => resetForm())
      .catch((err) => console.log(`Ошибка в email или пароле: ${err}`));
  };

  return (
    <section className="authorization">
      <div className="authorization__container">
        <h3 className="authorization__title">Вход</h3>
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
          <button className="authorization__btn">Войти</button>
        </form>
      </div>
    </section>
  );
};

export default Login;
