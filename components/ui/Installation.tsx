import { useUI } from "@/hooks/useUI";
import Image from "next/image";

const Installation = () => {
  const language = useUI((s) => s.language);
  return (
    <div className="text-sm collapse-open">
      {language === "English" && (
        <>
            <div className="collapse-title font-semibold">
              Installation Instructions
            </div>
            <div className="collapse-content text-sm flex flex-col gap-2">
              <p>
                It is recommended to use Chrome as your browser. After a
                successful login, please follow the instructions to add the
                application to your home screen.
              </p>
              <Image
                src={"/assets/image/topicon.png"}
                alt={"The icon is next to the address bar."}
                width={576}
                height={664}
              />
              <p> iOS: There is a sharing icon next to address bar.</p>
              <p> Android: There is a menu icon next to the address bar. </p>
              <Image
                src={"/assets/image/eng-add.png"}
                alt={"Choose Add to Home Screen."}
                width={706}
                height={1071}
              />
              <p>
                Click on the icon to bring up the menu and select ‘Add to Home
                Screen’ to install the app.
              </p>
            </div>
        </>
      )}
      {language === "Cantonese" && (
        <>
          <div
            tabIndex={6}
            className="collapse collapse-open border-base-300 bg-base-100 border px-2"
          >
            <div className="collapse-title font-semibold">安裝指示</div>
            <div className="collapse-content text-sm flex flex-col gap-2">
              <p>建議使用Chrome作為瀏覽器。請按指示將應用程式加入主畫面。</p>
              <Image
                src={"/assets/image/topicon.png"}
                alt={"圖示在網址一欄旁邊。"}
                width={576}
                height={664}
              />
              <p>iOS: 網址一欄旁邊有分享圖示 </p>
              <p>Android: 網址一欄旁邊有選單圖示</p>
              <Image
                src={"/assets/image/chin-add.png"}
                alt={"選取「加入主畫面」。"}
                width={951}
                height={847}
              />
              <p>按圖示後出現選單，選取「加入主畫面」，就可以安裝應用程式。</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Installation;
