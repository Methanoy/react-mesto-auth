import headerLogo from "../images/header_logo.svg";
import { Route, Link, useHistory } from "react-router-dom";

function Header({ email }) {
  const history = useHistory();

  function onSignout() {
    localStorage.removeItem("jwt");
    history.push("/signin");
  }

  return (
    <header className="header">
      <img
        className="header__logo"
        src={headerLogo}
        alt="Логотип проекта 'Место', написанный латинскими буквами."
      />
      <Route path="/signup">
        <Link className="header__link" to="signin">
          Войти
        </Link>
      </Route>
      <Route path="/signin">
        <Link className="header__link" to="signup">
          Регистрация
        </Link>
      </Route>
      <Route path="/main">
        <div>
          <p>{email}</p>
          <button onClick={onSignout}>Выйти</button>
        </div>
      </Route>
    </header>
  );
}

export default Header;
