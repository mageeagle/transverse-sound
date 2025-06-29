import { useUI } from "@/hooks/useUI";
import Link from "next/link";

const About = () => {
  const language = useUI((s) => s.language);
  return (
    <div className="text-sm m-2 gap-2 flex flex-col">
      {language === "English" && (
        <>
          <div
            tabIndex={6}
            className="collapse collapse-open border-base-300 bg-base-100 border px-2"
          >
            <div className="collapse-title font-semibold">About Us</div>
            <Link
              className="btn"
              href="https://github.com/mageeagle/transverse-sound"
            >
              Github
            </Link>
          </div>
          <div
            tabIndex={0}
            className="collapse border-base-300 bg-base-100 border px-2"
          >
            <input type="checkbox" />
            <div className="collapse-title font-semibold">Artists</div>
            <div className="collapse-content">
              <div
                tabIndex={1}
                className="collapse border-base-300 bg-base-100 border px-2"
              >
                {" "}
                <input type="checkbox" />
                <div className="collapse-title font-semibold">Eagle Wu</div>
                <div className="collapse-content text-sm gap-2 flex flex-col">
                  {`WU Hou Lam (Eagle or AQ) is a musician, composer and
                  interdisciplinary artist. His work encompasses sound
                  installations, interactive web pieces, audiovisual
                  compositions and compositions for acoustic instruments. He is
                  particularly interested in how architecture, as a kind of
                  spatial art, interacts with music/sound as a kind of temporal
                  art.`}
                  <Link className="btn" href="https://qqaqq.net/">
                    Website
                  </Link>
                </div>
              </div>
              <div
                tabIndex={1}
                className="collapse border-base-300 bg-base-100 border px-2"
              >
                {" "}
                <input type="checkbox" />
                <div className="collapse-title font-semibold">Tat Sham</div>
                <div className="collapse-content text-sm gap-2 flex flex-col">
                  {`Sham Chung-tat holds a Master's degree in Sound Studies and
                  Sound Art from the Berlin University of the Arts (Universität
                  der Künste Berlin, UdK) and a Bachelor's degree in Sound
                  Design from the Hong Kong Academy for Performing Arts (HKAPA).
                  Sham has collaborated with various theatre groups, arts
                  festivals, and independent artists in Hong Kong.`}
                  <Link className="btn" href="https://victorsham.com/">
                    Website
                  </Link>
                </div>
              </div>
              <div
                tabIndex={1}
                className="collapse border-base-300 bg-base-100 border px-2"
              >
                {" "}
                <input type="checkbox" />
                <div className="collapse-title font-semibold">Lawrence Ting</div>
                <div className="collapse-content text-sm gap-2 flex flex-col">
                  {`Lawrence Ting is a registered architect and has over ten years
                  of woodwork and bamboo craft experience with expertise in
                  installation and furniture designs. He graduated from the
                  University of Hong Kong with Bachelor and Master Degree in
                  Architecture. He started his own wood-work design studio,
                  Grain Design, in 2012 dedicated to incorporate craft to our
                  daily life. His work fuses the unique quality of each material
                  and combines it with traditional craftsmanship. Nature is one
                  of the key elements which drive his design. Lawrence has been
                  selected by the Art Development Council as the ADC Artspace
                  programme Artist at 2014 and 2016. His work has also been
                  selected as the finalist for the Lane Crawford (HK) CALL OUT
                  2015. His work has been exhibited in various events, including
                  the London Craft Week, Chengdu Creativity & Design Week, Lane
                  Crawford Beijing Store and Kwun Tong Promenade.`}
                  <Link className="btn" href="https://grainwooddesign.com/">
                    Website
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div
            tabIndex={4}
            className="collapse border-base-300 bg-base-100 border px-2"
          >
            <div className="collapse-title font-semibold">
              Paperback Production
            </div>
            <div className="collapse-content text-sm gap-2 flex flex-col">
              {`Paperback Production is a team dedicated to creating innovative
              forms of documentary works. Its members include sound designer
              Sham Chung Tat, sound artist Eagle Wu, and documentary theatre
              creator Miu Law. Since 2021, the team has been producing
              experimental sound documentary works that incorporate spatial
              audio, web audio synthesis, and multichannel sound installations.
              Their projects explore topics such as migration, spatial memory,
              and urban development. The team excels at using oral history and
              community interviews as a foundation, combined with Ambisonics
              field recordings and body sensors for multi-layered documentation,
              showcasing the inseparable connections between memory, the body,
              and space. Recently, Paperback Production has been developing
              projects in immersive audio theatre, interactive installations,
              and game art, with works presented in South Korea, Germany, and
              Hong Kong. Their recent works in Hong Kong include On My Way Home
              (12-channel spatial audio documentary), My Belongings: My Sound
              Stories in 118.4 sq.ft. (interactive exhibition) and Transverse
              (interactive sound walk and a 32-channel sound and bamboo
              installation).`}
              <Link
                className="btn"
                href="https://www.instagram.com/paperbacksketch.project/"
              >
                Instagram
              </Link>
            </div>
          </div>
          <div
            tabIndex={5}
            className="collapse border-base-300 bg-base-100 border px-2"
          >
            <div className="collapse-title font-semibold">Team</div>
            <div className="collapse-content text-sm gap-2 flex flex-col">
              <p>
                <strong>Technical Support:</strong>
              </p>
              <p>{`Tsui Wai-hong (Voyu)`}</p>
              <p>
                <strong>Producer:</strong>
              </p>
              <p>Miu Law</p>
              <p>
                <strong>Publicity Design:</strong>
              </p>
              <p>Peter Bird Studio</p>
              <p>
                <strong>Acknowledgement:</strong>
              </p>
              <p>
                Arthur Sze, Barbara Leung, Christopher Choi, Roger Ting, May
                Yam, Alex Wu, 灝, All Solution Limited
              </p>
            </div>
          </div>
        </>
      )}
      {language === "Cantonese" && (
        <>
          <div
            tabIndex={6}
            className="collapse collapse-open border-base-300 bg-base-100 border px-2"
          >
            <div className="collapse-title font-semibold">關於我們</div>
            <Link
              className="btn"
              href="https://github.com/mageeagle/transverse-sound"
            >
              Github
            </Link>
          </div>
          <div
            tabIndex={0}
            className="collapse border-base-300 bg-base-100 border px-2"
          >
            {" "}
            <input type="checkbox" />
            <div className="collapse-title font-semibold">藝術家</div>
            <div className="collapse-content">
              <div
                tabIndex={1}
                className="collapse border-base-300 bg-base-100 border px-2"
              >
                {" "}
                <input type="checkbox" />
                <div className="collapse-title font-semibold">胡皓嵐</div>
                <div className="collapse-content text-sm gap-2 flex flex-col">
                  胡皓嵐為作曲家及跨媒體藝術家。作品涵蓋聲音裝置、聲音與影像作品、網絡互動作品以及器樂作品。尤其對建築與聲音，空間與時間的關係感興趣。胡氏畢業於柏林藝術大學修讀聲音研究及聲音藝術、香港大學建築系及香港演藝學院音樂學院，主修作曲。
                  <Link className="btn" href="https://qqaqq.net/">
                    網頁
                  </Link>
                </div>
              </div>
              <div
                tabIndex={1}
                className="collapse border-base-300 bg-base-100 border px-2"
              >
                {" "}
                <input type="checkbox" />
                <div className="collapse-title font-semibold">岑宗達</div>
                <div className="collapse-content text-sm gap-2 flex flex-col">
                  岑宗達為德國柏林藝術大學（Universität der Künste Berlin,
                  UdK）聲音研究與聲音藝術碩士，以及擁有香港演藝學院（Hong Kong
                  Academy for Performing Arts,
                  HKAPA）聲音設計的學士學位。岑氏曾與香港的各個劇團、藝術節及獨立藝術家合作。
                  <Link className="btn" href="https://victorsham.com/">
                    網頁
                  </Link>
                </div>
              </div>
              <div
                tabIndex={1}
                className="collapse border-base-300 bg-base-100 border px-2"
              >
                {" "}
                <input type="checkbox" />
                <div className="collapse-title font-semibold">丁樂融</div>
                <div className="collapse-content text-sm gap-2 flex flex-col">
                  丁樂融有超過十年木工和竹藝經驗亦是香港註冊建築師，於2012年成立GRAIN
                  DESIGN工作室，作品包括藝術裝置和訂造傢俬。GRAIN
                  DESIGN的設計宗旨希望透過物料的特性融合傳統工藝製作出獨一無二的藝術設計。作品曾於倫敦藝術周、成都創意設計周、北京連卡佛、觀塘海濱公園等地方展出。
                  <Link className="btn" href="https://grainwooddesign.com/">
                    網頁
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div
            tabIndex={4}
            className="collapse border-base-300 bg-base-100 border px-2"
          >
            <div className="collapse-title font-semibold">紙背製作</div>
            <div className="collapse-content text-sm gap-2 flex flex-col">
              紙背製作為一個以創作新型式紀錄作品為主的團隊，成員包括聲音設計師岑宗達，聲音藝術家胡皓嵐以及紀錄劇場創作人羅妙妍。團隊自2021年開始創作多個以空間音效（Spatial
              audio），網上聲音合成（Web
              audio），以及多聲道聲音裝置的實驗性聲音紀錄作品。涉獵議題包括移居，空間記憶，城市發展等等。團隊擅長以口述歷史，社區訪問作基礎，以Ambisonics
              田野錄音，身體傳感器作多重紀錄，展示記憶，身體，空間三者之間密不可分的關係。
              近期紙背製作團隊向沉浸式音響劇場，電子互動裝置製作，虛擬實景以及遊戲藝術方向發展，各自在韓國，德國及香港有其參與作品。團隊近期在香港作品為：On
              My Way
              Home（十二聲道空間音訊紀錄作品）﹐狹縫穿梭（聲音漫遊以及三十二聲道竹藝聲音裝置）。
              <Link
                className="btn"
                href="https://www.instagram.com/paperbacksketch.project/"
              >
                Instagram
              </Link>
            </div>
          </div>
          <div
            tabIndex={5}
            className="collapse border-base-300 bg-base-100 border px-2"
          >
            <div className="collapse-title font-semibold">團隊</div>
            <div className="collapse-content text-sm gap-2 flex flex-col">
              <p>
                <strong>技術支援</strong>
              </p>
              <p>徐偉康（大寶）</p>
              <p>
                <strong>監製</strong>
              </p>
              <p>羅妙妍</p>
              <p>
                <strong>宣傳設計</strong>
              </p>
              <p>Peter Bird Studio</p>
              <p>
                <strong>鳴謝</strong>
              </p>
              <p>
                Arthur Sze, Barbara Leung, Christopher Choi, Roger Ting, May
                Yam, Alex Wu, 灝, All Solution Limited
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default About;
