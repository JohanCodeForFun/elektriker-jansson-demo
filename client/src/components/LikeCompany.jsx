import { useState } from "react";
import { computeLikeState } from "../utils/likeLogic";
import styles from "./LikeCompany.module.css";
import CouponModal from "./couponModal";
import ToastThankYou from "./ToastThankYou";

function LikeCompany() {
  const [likes, setLikes] = useState(610);
  const [showCouponModal, setShowModalPlaning] = useState(false);
  const [timeoutBtn, setTimeoutBtn] = useState(false);

  function handleLike() {
    setLikes((prev) => {
      const { nextLikes, celebrates, cooldownMs } = computeLikeState(prev);

      if (celebrates) {
        setShowModalPlaning(true);
      }

      setTimeoutBtn(true);
      
      setTimeout(() => setTimeoutBtn(false), cooldownMs);

      return nextLikes;
    });
  }

  return (
    <article className={styles.container}>
      <h4>Vad våra kunder säger:</h4>
      <p>
        <em>
          "Elektriker Jansson var lätt att jobba med och blev klar med jobbet
          före utlovad tid!" -- Johanna
        </em>
      </p>
  <p data-testid="like-count">Det är {likes} Kunder som gillar vårt företag!</p>
      <div>
        <p>Gilla vårt företag!</p>
        <button
          data-testid="like-button"
          disabled={timeoutBtn}
          className="button button--cta"
          onClick={handleLike}
        >
          Gilla
        </button>
      </div>
      <CouponModal
        showCouponModal={showCouponModal}
        like={likes}
        onClose={() => setShowModalPlaning(false)}
      />
      <ToastThankYou trigger={likes} />
    </article>
  );
}

export default LikeCompany;
