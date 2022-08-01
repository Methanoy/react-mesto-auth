function SmallMenu({ email, onSignout, isSmallMenu }) {
  return (
    <nav className={isSmallMenu ? "header__menu_small" : "header__menu"}>
      <ul
        className={
          isSmallMenu ? "header__menu-list_small" : "header__menu-list"
        }
      >
        <li>
          <span className="header__email">{email}</span>
        </li>
        <li>
          <button
            onClick={onSignout}
            className="header__signout-btn"
            type="button"
          >
            Выйти
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default SmallMenu;
