import headerLogo from "../images/header_logo.svg";
import { Route, Link, useHistory, Switch } from "react-router-dom";
import SmallMenu from "./SmallMenu";

function Header({ email, setLogOut }) {
  const history = useHistory();

  function onSignout() {
    localStorage.removeItem("jwt");
    setLogOut();
    history.push("/signin");
  }

  return (
    <>
      <SmallMenu email={email} onSignout={onSignout} isSmallMenu={true} />
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
            <SmallMenu email={email} onSignout={onSignout} isSmallMenu={false} />
            <button className="header__small-menu-btn">
              <span className="header__small-menu-btn_active" />
            </button>
          </Route>
        </Switch>
      </header>
    </>
  );
}

export default Header;
