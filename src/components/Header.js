import headerLogo from "../images/header_logo.svg";
import { Route, Link, useHistory, Switch } from "react-router-dom";

function Header({ email, setLogOut }) {
  const history = useHistory();

  function onSignout() {
    localStorage.removeItem("jwt");
    setLogOut();
    history.push("/signin");
  }

  return (
    <header className="header">
      <img
        className="header__logo"
        src={headerLogo}
        alt="Логотип проекта 'Место', написанный латинскими буквами."
      />
      <Switch>
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
        <Route path="/">
          <nav className="header__menu">
            <ul className="header__menu-list">
              <li>
                <span className="header__menu-list_email">{email}</span>
              </li>
              <li>
                <button
                  onClick={onSignout}
                  className="header__menu-list_signout-btn"
                  type="button"
                >
                  Выйти
                </button>
              </li>
              <li>
                <button className="header__small-menu-btn">
                  <span className="header__small-menu-btn_active" />
                </button>
              </li>
            </ul>
          </nav>
        </Route>
      </Switch>
    </header>
  );
}

export default Header;
