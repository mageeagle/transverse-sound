import { JSX } from "react";

const RoundButton = ({
  text,
  icon,
  callback,
  className,
  dark,
}: {
  text?: string;
  icon?: JSX.Element;
  callback: () => void;
  className: string;
  dark?: boolean;
}) => {
  return (
    <button
      className={
        "rounded-full size-16 flex items-center justify-center fill-current cursor-pointer focus:outline-none border-2 " +
        (dark
          ? "text-white border-white bg-[#3469b2] " +
            "hover:text-[#22ffbd] hover:border-[#22ffbd] " +
            "active:text-[#f5cac8] active:border-[#f5cac8] "
          : "text-[#22ffbd] border-[#22ffbd] " +
            "hover:text-[#3469b2] hover:border-[#3469b2] " +
            "active:text-[#f5cac8] active:border-[#f5cac8] ") +
        className
      }
      onClick={callback}
    >
      <div>{text}</div>
      {icon}
    </button>
  );
};
export default RoundButton;
