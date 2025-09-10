import { NavLink } from "react-router";

function ModalPlaning({showModalPlaning, setShowModalPlaning}) {
  function handleClick () {
    setShowModalPlaning(prev => !prev)
  }

  return ( 
    <article
      className="modal"
      style={{ display: showModalPlaning ? 'block' : 'none' }}
      aria-hidden={!showModalPlaning}
    >
        <button className="button button--close" onClick={handleClick}>stäng</button>
          <h2>Börja här!</h2>
        <p>Vad kul att du vill planera ditt hem! Välj vart du vill börja.</p>
        <ul>
          <li className="button" ><NavLink to="/hello/johan">installationer</NavLink></li>
          <li className="button" ><NavLink to="/om-oss">Läs mer om oss</NavLink></li>
        </ul>
      </article>
   );
}

export default ModalPlaning;