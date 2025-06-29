import { uikey, useUI } from "@/hooks/useUI";
import { JSX } from "react";

function UIOpen({
  openKey,
  icon,
}: {
  openKey: keyof typeof uikey;
  icon: JSX.Element;
}) {
  const display = useUI((s) => s[openKey]);
  return (
    <button
      className="h-12 w-12 m-4 fill-current text-gray-400 active:text-gray-800 focus:outline-none hover:text-gray-600"
      id="open"
      onClick={() => {
        useUI.getState().openPopup(openKey);
      }}
      type="button"
    >
      {icon}
    </button>
  );
}

export default UIOpen;
