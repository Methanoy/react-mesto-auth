function SmallMenu({ email, onSignout }) {
  return (
    <nav className="header__menu_small">
      <ul
        className="header__menu-list_small"
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
