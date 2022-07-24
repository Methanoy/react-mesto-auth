function Footer({ isLoggedIn }) {
  return (
    <footer className={`footer ${isLoggedIn && "footer_visible"}`}>
      <p className="footer__copyright">
        &copy; {new Date().getFullYear()} Mesto Russia
      </p>
    </footer>
  );
}

export default Footer;
