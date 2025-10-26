import { NavLink } from "react-router";
import { useAuth } from "../context/useAuth.js";
import { useEffect, useRef } from "react";

function Header() {
  const { user, logout } = useAuth();
  const headerRef = useRef(null);

  useEffect(() => {
    const headerEl = headerRef.current;
    if (!headerEl) return;

    const sentinel = document.getElementById("hero-end-sentinel");

    // No sentinel on this page → just solid
    if (!sentinel) {
      headerEl.classList.add("is-solid");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return; // safety guard
        headerEl.classList.toggle("is-solid", !entry.isIntersecting);
      },
      { threshold: 0 }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  return (
    <header ref={headerRef} className="site-header">
      <nav className="nav-mobile">
        <ul>
          <li>Elektriker Jansson</li>
          <li className="call">
            <i className="fa-solid fa-phone-volume fa-lg"></i>
            <strong> Ring +460 123 45 67</strong>
          </li>
          <li className="hamburger">
            <a href="#">
              <i className="fa-solid fa-bars fa-lg"></i>
            </a>
          </li>
        </ul>
      </nav>

      <nav className="nav-desktop">
        <ul>
          <li className="company-name">Elektriker Jansson</li>

          <li className="button">
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Hem
            </NavLink>
          </li>
          <li className="button">
            <NavLink
              className={({ isActive }) => (isActive ? "active" : "")}
              to="/om-oss"
            >
              Om oss
            </NavLink>
          </li>

          {user ? (
            <li className="button">
              <button className="button" onClick={logout}>
                Logga ut ({user.name})
              </button>
            </li>
          ) : (
            <li className="button">
              <NavLink
                className={({ isActive }) => (isActive ? "active" : "")}
                to="/login"
              >
                Logga in
              </NavLink>
            </li>
          )}

          {/* <li className="button"><a href="tjanster.html">Tjänster</a></li> */}
          {/* <li className="button"><a href="kontakt.html">Kontakt</a></li>
              <li className="button">
                <a href="mailto:info@elektrikerjansson.se">Maila oss!</a>
              </li>
              <li className="button button--cta call-desktop">
                <i className="fa-solid fa-phone-volume fa-lg"></i>
                <strong> Ring +460 123 45 67</strong>
              </li> */}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
