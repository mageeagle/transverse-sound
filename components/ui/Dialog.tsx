"use client";
import { JSX, useRef, useEffect } from "react";
import CloseIcon from "./icons/CloseIcon";
import RoundButton from "./RoundButton";

export default function Dialog({
  text,
  icon,
  className,
  contents,
  dark,
}: {
  text?: string;
  icon?: JSX.Element;
  className: string;
  contents: string | JSX.Element;
  dark?: boolean;
}) {
  const modalRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const node = modalRef.current;
    
    const handleBlur = () => {
      if (node && !node.hidden) {
        node.close();
      }
    };

    window.addEventListener("blur", handleBlur);
    
    return () => {
      window.removeEventListener("blur", handleBlur);
      node?.close();
    };
  }, []);

  const handleCheckoutClick = () => {
    modalRef.current!.hidden = false;
    modalRef.current?.showModal();
  };

  const handleCloseModal = () => {
    modalRef.current!.hidden = true;
    modalRef.current?.close();
  };

  return (
    <div className="">
      <RoundButton
        text={text}
        icon={icon}
        className={className}
        callback={handleCheckoutClick}
        dark={dark}
      />
      <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <div className="py-4">{contents}</div>
          <RoundButton
            icon={<CloseIcon />}
            className={"top-0 right-0 absolute m-4 text-xs"}
            callback={handleCloseModal}
          />
        </div>
      </dialog>
    </div>
  );
}
