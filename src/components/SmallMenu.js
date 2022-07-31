function SmallMenu({email, onSignout}) {
  return (
    <div className="small-menu__container">
      <span className="small-menu__email">{email}</span>
      <button
        onClick={onSignout}
        className="small-menu__signout-btn"
        type="button"
      >
        Выйти
      </button>
    </div>
  );
}

export default SmallMenu;
