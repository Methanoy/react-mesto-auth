import { React, useState } from 'react';

const Login = ({ onLogin }) => {
  const [userEmail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (!userEmail || !password) {
      return;
    }
    onLogin(userEmail, password);
  };

  const handleEmailChange = (evt) => {
    setUserEmail(evt.target.value);
  };

  const handlePasswordChange = (evt) => {
    setPassword(evt.target.value);
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
            value={userEmail}
            onChange={handleEmailChange}
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
            onChange={handlePasswordChange}
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
