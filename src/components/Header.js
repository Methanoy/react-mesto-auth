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
      {isSmallMenuOpen && <SmallMenu email={email} onSignout={onSignout} isSmallMenu={true} /> }
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
          {isSmallMenuOpen && <SmallMenu
              email={email}
              onSignout={onSignout}
              isSmallMenu={false}
            /> }
            <button
              onClick={toggleSmallMenu}
              className="header__small-menu-btn"
              type="button"
            >
              <span className="header__small-menu-btn_active" />
            </button>
          </Route>
        </Switch>
      </header>
    </>
  );
}

export default Header;
