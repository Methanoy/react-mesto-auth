import headerLogo from "../images/header_logo.svg";
import { Route, Link } from "react-router-dom";

function Header(props) {
  return (
    <header className="header">
      <div>
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
      </div>
    </header>
  );
}

export default Header;
