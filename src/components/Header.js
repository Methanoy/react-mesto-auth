import headerLogo from "../images/header_logo.svg";
import { Route, Link, useHistory, Switch } from "react-router-dom";
import SmallMenu from "./SmallMenu";
import { useState } from "react";

function Header({ email, setLogOut }) {
  const history = useHistory();
  const [isSmallMenuOpen, setIsSmallMenuOpen] = useState(false);

  function onSignout() {
    localStorage.removeItem("jwt");
    setLogOut();
    history.push("/signin");
  }

  function toggleSmallMenu() {
    setIsSmallMenuOpen(!isSmallMenuOpen);
  }

  return (
    <>
      {isSmallMenuOpen && (
        <SmallMenu
          email={email}
          onSignout={onSignout}
          isSmallMenuOpen={isSmallMenuOpen}
        />
      )}
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
                  <span className={"header__email"}>{email}</span>
                </li>
                <li>
                  <button
                    onClick={onSignout}
                    className={"header__signout-btn"}
                    type="button"
                  >
                    Выйти
                  </button>
                </li>
              </ul>
            </nav>
            <button
              onClick={toggleSmallMenu}
              className="header__small-menu-btn"
              type="button"
            >
              <span className={isSmallMenuOpen ? "header__small-menu-btn" : null} />
            </button>
          </Route>
        </Switch>
      </header>
    </>
  );
}

export default Header;
