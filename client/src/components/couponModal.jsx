function CouponModal({ like, showCouponModal, setShowModalPlaning, onClose }) {
  function handleClick() {
    if (typeof onClose === "function") return onClose();
    if (typeof setShowModalPlaning === "function") {
      return setShowModalPlaning((prev) => !prev);
    }
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className={`modal-backdrop ${showCouponModal ? "is-open" : ""}`}
        aria-hidden={!showCouponModal}
        onClick={handleClick}
      />
      {/* Dialog */}
      <div
        className={`modal coupon ${showCouponModal ? "is-open" : ""}`}
        aria-hidden={!showCouponModal}
        role="dialog"
        aria-modal="true"
      >
        <button className="button button--close" onClick={handleClick}>
          stäng
        </button>
        <h4>Grattis!</h4>
        <p>
          Du är vår {like}e gilla! Använd kod: <strong>rabatt10procent</strong> vid nästa
          elinstallation för att få 10% rabatt!
        </p>
      </div>
    </>
  );
}

export default CouponModal;
