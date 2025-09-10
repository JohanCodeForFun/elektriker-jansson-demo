import { useRef, useEffect } from 'react';

export default function ModalDialog() {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    // close on Escape (optional, small helper)
    function onKey(e) {
      if (e.key === 'Escape') dialog.close();
    }
    dialog.addEventListener('cancel', onKey); // dialog fires 'cancel' on Esc in some browsers
    window.addEventListener('keydown', onKey);

    return () => {
      dialog.removeEventListener('cancel', onKey);
      window.removeEventListener('keydown', onKey);
    };
  }, []);

  function show() {
    const d = dialogRef.current;
    if (!d) return;
    // prefer showModal if available, otherwise fallback to open attribute
    if (typeof d.showModal === 'function') d.showModal();
    else d.setAttribute('open', ''); // fallback
  }

  function close() {
    const d = dialogRef.current;
    if (!d) return;
    if (typeof d.close === 'function') d.close();
    else d.removeAttribute('open');
  }

  return (
    <>
      <dialog ref={dialogRef}>
        <button onClick={close}>Close</button>
        <p>This modal dialog has a groovy backdrop!</p>
      </dialog>

      <button onClick={show}>Show the dialog</button>
    </>
  );
}