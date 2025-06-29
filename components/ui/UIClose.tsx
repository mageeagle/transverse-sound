import { uikey, useUI } from "@/hooks/useUI";
import CloseIcon from "./icons/CloseIcon";

function UIClose({ closeKey }: { closeKey: keyof typeof uikey }) {
  return (
    <button
      className="h-12 w-12 m-4 fill-current text-gray-400 active:text-gray-800 focus:outline-none hover:text-gray-600"
      id="close"
      onClick={() => {
        useUI.getState().closePopup(closeKey);
      }}
      type="button"
    >
      <CloseIcon />
    </button>
  );
}

export default UIClose;
