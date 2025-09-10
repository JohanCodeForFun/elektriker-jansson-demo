import { NavLink } from "react-router";

function Header() {
  return ( 
    <header>
          <nav className="nav-mobile">
            <ul>
              <li>Elektriker Jansson</li>
              <li className="call">
                <i className="fa-solid fa-phone-volume fa-lg"></i>
                <strong> Ring +460 123 45 67</strong>
              </li>
              <li className="hamburger">
                <a href="#"><i className="fa-solid fa-bars fa-lg"></i></a>
              </li>
            </ul>
          </nav>

          <nav className="nav-desktop">
            <ul>
              <li className="company-name">Elektriker Jansson</li>
              
              <li className="button">
                <NavLink to="/" 
                className={({ isActive }) =>
                isActive ? "active" : ""
                }>Hem</NavLink>
                </li>
              <li className="button">
                <NavLink
                  className={({ isActive }) =>
            isActive ? "active" : ""
              }
                to="/om-oss">Om oss</NavLink>
                </li>
              <li className="button">
                <NavLink
                  className={({ isActive }) =>
                isActive ? "active" : ""
                }
               to="/hello/johan">Hej Johan</NavLink>
                </li>

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