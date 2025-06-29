import { useUI } from "@/hooks/useUI";
import Link from "next/link";

const Description = () => {
  const language = useUI((s) => s.language);
  return (
    <div className="text-sm collapse-open">
      {language === "English" && (
        <>
          <div
            tabIndex={1}
            className="collapse border-base-300 bg-base-100 border px-2"
          >
            <div className="collapse-title font-semibold">Introduction</div>
            <div className="collapse-content text-sm flex flex-col gap-2">
              <p>
                This is a demo version of Transverse: the Interactive Soundwalk
              </p>
              <p>
                You can activate any of the sound interactions in the Sound
                Journey from this page.
              </p>
              <Link className="btn" href="/ambitest">
                Test Binaural Sound
              </Link>
            </div>
          </div>
          <div
            tabIndex={3}
            className="collapse border-base-300 bg-base-100 border px-2"
          >
            <div className="collapse-title font-semibold">
              Device Requirements
            </div>
            <div className="collapse-content text-sm flex flex-col gap-2">
              <p>
                {` Size of this app is approximately 200MB. Please note that
                installation will consume user's data and phone storage. It is
                recommended to download using Wi-Fi beforehand.`}
              </p>
              <p>
                To ensure the best experience, it is recommended to use
                Apple/Android phones released in 2022 or later. Some older phone
                models may not support all the features of this app due to
                hardware and software limitations.
              </p>
            </div>
          </div>
          <div
            tabIndex={4}
            className="collapse border-base-300 bg-base-100 border px-2"
          >
            <div className="collapse-title font-semibold">iOS Known Issues</div>
            <div className="collapse-content text-sm flex flex-col gap-2">
              <p>
                Due to system limitations, users of Apple iOS mobile phones are
                likely to experience the following issues:
              </p>
              <p>
                {`Sound quality with a ‘crushing’ effect: This is a problem that
                  may occur with Bluetooth headsets linked to iOS. If you
                  experience this issue, please switch to a different headset,
                  use a wired headset, or use your phone's speakers.`}
              </p>
              <p>
                Your phone locks itself or uses another application, and when
                you return to the application, there is no sound, or the sound
                may diminish automatically and not return to normal sound level:
                please restart the application. For the best experience, please
                prolong the automatic screen-off time as long as possible.
              </p>
              <p>
                The phone automatically switches to landscape orientation: The
                app is optimized for the portrait orientation. Please lock the
                orientation of the screen.
              </p>
              <p>
                After answering a question in a specific area, the sound of the
                mobile phone may be automatically switched from headset to
                speaker. There is no long-term solution to this problem. If this
                happens, please restart the app.
              </p>
            </div>
          </div>
        </>
      )}

      {language === "Cantonese" && (
        <>
          <div
            tabIndex={1}
            className="collapse collapse-open border-base-300 bg-base-100 border px-2"
          >
            <div className="collapse-title font-semibold">簡介</div>
            <div className="collapse-content text-sm flex flex-col gap-2">
              <p>此為聲音漫遊旅程《狹縫穿梭》的自由測試模式。</p>
              <p>可於此頁面任意啓動於聲音旅程中的聲音互動。</p>
              <Link className="btn" href="/ambitest">
                測試雙耳立體聲
              </Link>
            </div>
          </div>

          <div
            tabIndex={3}
            className="collapse border-base-300 bg-base-100 border px-2"
          >
            <div className="collapse-title font-semibold">裝置要求</div>
            <div className="collapse-content text-sm flex flex-col gap-2">
              <p>
                本應用程式的大小約300MB，請注意安裝時將佔用用家的數據流量以及手機容量，建議事先利用wifi下載。
              </p>
              <p>
                為確保最佳體驗，建議使用2022年或之後推出的蘋果/安卓手機。部分舊款手機的硬件和軟件可能無法支持本應用程式的全部功能。
              </p>
            </div>
          </div>
          <div
            tabIndex={4}
            className="collapse border-base-300 bg-base-100 border px-2"
          >
            <div className="collapse-title font-semibold">iOS已知問題</div>
            <div className="collapse-content text-sm flex flex-col gap-2">
              <p>鑒於系統限制，Apple iOS手機的用戶有機會遭遇以下問題：</p>
              <p>
                聲音品質出現「壓碎」效果：此爲iOS鏈接藍牙耳機有機會出現的問題。若出現此問題，請轉換其他耳機、用有線耳機或用手機喇叭進行體驗。
              </p>
              <p>
                手機自動鎖屏或使用其他程式，重回程式後沒有聲音，或有機會自動減弱而無法恢復正常聲量：請重啓程式。爲了最佳體驗，請將自動關閉螢幕時間儘量延長。
              </p>
              <p>
                手機自動轉換橫向顯示：此程式以直向顯示爲佳。請鎖定屏幕顯示方向。
              </p>
              <p>
                在特定區域回答問題後，手機聲音有機會自動由耳機轉爲喇叭播放。此問題並無能夠長遠解決的方案。若發生情況，請重啓程式。
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Description;
