import { useEffect } from "react";

export function useEscKeydown(handleClosePopup) {
  useEffect(() => {
    function handleEscClose(evt) {
      if (evt.key === "Escape") {
        handleClosePopup();
      }
    }
    document.addEventListener("keydown", handleEscClose);
    return () => document.removeEventListener("keydown", handleEscClose);
  });
}

export function useOutsideClick(handleClosePopup) {
    useEffect(() => {
    function handleOutsideClickClose(evt) {if (evt.target.classList.contains("popup_opened")) {
        handleClosePopup();
          }
        }
        document.addEventListener("mousedown", handleOutsideClickClose);
        return () =>
          document.removeEventListener("mousedown", handleOutsideClickClose);
      });
}