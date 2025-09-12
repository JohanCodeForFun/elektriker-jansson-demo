import { useState } from "react";
import styles from "./LikeCompany.module.css";

function LikeCompany() {

  const [likes, setLikes] = useState(610)

  function handleLike() {
    setLikes(likes + 1)
  }

  return (
    <article className={styles.container}>
      <h4>Vad våra kunder säger:</h4>
      <p><em>"Elektriker Jansson var lätt att jobba med och blev klar med jobbet före utlovad tid!" -- Johanna</em></p>
      <p>Det är {likes} Kunder som gillar vårt företag!</p>
      <div>
        <p>Gilla vårt företag!</p>
        <button className="button button--cta" onClick={handleLike}>Gilla</button>
      </div>
    </article>
  );
}

export default LikeCompany;
