import { useRef } from "react";
import { NavLink } from "react-router";

function Hero() {
  const dialogRef = useRef(null);

  function handleClick() {
    dialogRef.current.showModal();
  }

  function handleClose() {
    dialogRef.current.close();
  }

  return (
    <section className="hero">
      <h1>Elektriker Jansson</h1>
      <p>Din pålitliga partner för alla elarbeten</p>
      <button className="button button--cta" onClick={handleClick}>
        BÖRJA DIN PLANERING
      </button>

      <dialog ref={dialogRef} role="dialog" aria-modal="true">
        <button className="button button--close" onClick={handleClose}>
          stäng
        </button>
        <h2>Börja här!</h2>
        <p>Vad kul att du vill planera ditt hem! Välj vart du vill börja.</p>
        <ul>
          <li className="button">
            <NavLink to="/hello/johan">installationer</NavLink>
          </li>
          <li className="button">
            <NavLink to="/om-oss">Läs mer om oss</NavLink>
          </li>
        </ul>
      </dialog>
    </section>
  );
}

export default Hero;
