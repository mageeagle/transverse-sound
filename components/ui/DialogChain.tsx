import { useUI } from "@/hooks/useUI";
import RoundButton from "./RoundButton";
import Dialog from "./Dialog";
import Installation from "./Installation";
import Description from "./Description";
import About from "./About";
import { useLoading } from "@/hooks/useBufferLoading";
import TranslateIcon from "./icons/TranslateIcon";
import Link from "next/link";

const DialogChain = ({
  className,
  dark,
}: {
  className?: string;
  dark?: boolean;
}) => {
  const language = useUI((s) => s.language);
  const toneStarted = useLoading((s) => s.tone);
  return (
    <div className={"dropdown dropdown-top z-50 " + className}>
      <div tabIndex={0} role="button">
        <RoundButton
          dark={dark}
          callback={() => {}}
          className={""}
          text={language === "Cantonese" ? "資訊" : "Info"}
        />
      </div>
      <ul tabIndex={0} className="dropdown-content">
        <li>
          <Dialog
            dark={dark}
            className={"my-2"}
            contents={<Description />}
            text={language === "Cantonese" ? "注意" : "Note"}
          />
        </li>
        <li>
          <Dialog
            dark={dark}
            className={"my-2 text-xs"}
            contents={<Installation />}
            text={language === "Cantonese" ? "安裝指示" : "Installation"}
          />
        </li>
        <li>
          <Link href="https://transverse-kwuntong.vercel.app/">
            <RoundButton
              dark={dark}
              className="my-2 text-xs"
              text={language === "English" ? "Original Soundwalk" : "原聲音旅程"}
              callback={() => {}}
            />
          </Link>
        </li>
        <li>
          <Link href="https://transverse-documentation.vercel.app/">
            <RoundButton
              dark={dark}
              className="my-2 text-xs"
              text={language === "English" ? "Document ation" : "聲畫紀錄"}
              callback={() => {}}
            />
          </Link>
        </li>
        <li>
          <Dialog
            dark={dark}
            className={"my-2"}
            contents={<About />}
            text={language === "Cantonese" ? "關於" : "About"}
          />
        </li>
        <li>
          <RoundButton
            dark={dark}
            text={language === "Cantonese" ? "聯絡" : "Contact"}
            callback={() =>
              (window.location.href = "mailto:transverse.kwuntong@gmail.com")
            }
            className={"my-2"}
          />
        </li>
        {toneStarted && (
          <li>
            <RoundButton
              dark={dark}
              icon={<TranslateIcon />}
              className="my-2"
              callback={useUI.getState().setLanguage}
            />
          </li>
        )}
      </ul>
    </div>
  );
};
export default DialogChain;
