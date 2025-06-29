import { useUI } from "@/hooks/useUI";

const BigGreenButton = ({clickCallback, disabled, cantonese, english, name, type}: {clickCallback: () => void, disabled: boolean, cantonese: string, english: string, name: string, type?: "submit" | "reset" | "button" | undefined}) => {
    const language = useUI(s => s.language)
    return (
    <button
      className="bg-[#22ffbd] text-black font-light text-xl p-4 rounded-lg w-full disabled:border-gray-700 disabled:bg-gray-800/20 disabled:text-[#22ffbd] disabled:shadow-none disabled:cursor-not-allowed cursor-pointer max-w-screen active:bg-[#3469b2] active:border-[#f5cac8]"
      name={name}
      type={type}
      onClick={clickCallback}
      disabled={disabled}
    >
      {language === "Cantonese" ? cantonese : english}
    </button>
  );
};

export default BigGreenButton
