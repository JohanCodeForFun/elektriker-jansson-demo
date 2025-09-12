import { useEffect, useRef, useState } from "react";
import styles from "./ToastThankYou.module.css";

// Props:
// - trigger: any value that changes when you want to show the toast (e.g., like count)
// Behavior: shows toast when `trigger` changes (but skips first mount), auto-hides after 3s
function ToastThankYou({ trigger }) {
  const [showToast, setShowToast] = useState(false);
  const timeoutRef = useRef(null);
  const didMountRef = useRef(false);

  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true; // skip initial render
      return;
    }

    console.log("trigger:", trigger)

    // Show toast
    setShowToast(true);

    // Auto-hide after 3 seconds
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setShowToast(false);
    }, 3000);

    return () => clearTimeout(timeoutRef.current);
  }, [trigger]);

  return (
    <p className={`${styles.toast} ${showToast ? styles.isOpen : ""}`}>
      Tack för din like, den betyder mycket för oss!
    </p>
  );
}

export default ToastThankYou;