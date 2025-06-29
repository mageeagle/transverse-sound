"use client";
import { JSX, useEffect, useRef, useState } from "react";
import { useUI } from "@/hooks/useUI";
import BigGreenButton from "./BigGreenButton";

export default function Terms({
  contents,
  handleCloseModal,
  check,
}: {
  contents: string | JSX.Element;
  handleCloseModal: () => void;
  check?: boolean;
}) {
  const modalRef = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (!modalRef.current?.open) modalRef.current?.showModal();
  }, [contents]);

  const language = useUI((s) => s.language);
  const [checked, setChecked] = useState(false);

  return (
    <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <label className="swap border-2 rounded-full size-16 ">
          <input
            type="checkbox"
            className={"outline-0"}
            onClick={() => useUI.getState().setLanguage()}
            checked={language === "Cantonese"}
            readOnly
          />
          <div className="swap-on items-center justify-center flex">
            English
          </div>
          <div className="swap-off items-center justify-center flex">中文</div>
        </label>
        <div className="py-4">{contents}</div>
        {check && (
          <fieldset className="fieldset p-4 bg-base-100 border border-base-300 rounded-box w-full my-1">
            <label className="fieldset-label">
              <input
                type="checkbox"
                className="checkbox"
                checked={checked}
                onChange={() => setChecked((s) => !s)}
              />
              {language === "Cantonese" ? (
                <p>我已閱讀並同意遵守上述條款和條件。</p>
              ) : (
                <p>
                  I have read and agree to comply with the above terms and
                  conditions.
                </p>
              )}
            </label>
          </fieldset>
        )}
        <BigGreenButton
          name=""
          disabled={check ? !checked : false}
          clickCallback={handleCloseModal}
          cantonese="繼續"
          english="Continue"
        />
      </div>
    </dialog>
  );
}
