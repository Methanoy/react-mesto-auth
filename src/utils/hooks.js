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