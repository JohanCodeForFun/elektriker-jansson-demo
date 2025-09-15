import { useState } from "react";
import styles from "./LikeCompany.module.css";
import CouponModal from "./couponModal";
import ToastThankYou from "./ToastThankYou";

function LikeCompany() {
  const [likes, setLikes] = useState(610);
  const [showCouponModal, setShowModalPlaning] = useState(false);
  const [timeoutBtn, setTimeoutBtn] = useState(false);

  function timeout() {
    setTimeoutBtn(true);

    setTimeout(() => {
      setTimeoutBtn(false);
    }, 3000);
  }

  function maybeCelebrate(nextLikes) {
    if (nextLikes % 10 === 0) {
      setShowModalPlaning(true);

      timeout();
    }
  }

  function handleLike() {
    setLikes((prev) => {
      const next = prev + 1;
      maybeCelebrate(next);
      return next;
    });

    timeout();
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
      <p>Det är {likes} Kunder som gillar vårt företag!</p>
      <div>
        <p>Gilla vårt företag!</p>
        <button
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
