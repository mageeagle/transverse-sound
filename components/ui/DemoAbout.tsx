import { useSection } from "@/hooks/useSection";
import { useUI } from "@/hooks/useUI";
import { useMemo } from "react";
import { sectionTitles } from "./DemoSelection";
import { useSectionPersist } from "@/hooks/useSectionPersist";

interface Description {
  des: string;
  engDes: string;
  des2?: string;
  engDes2?: string;
  des3?: string;
  engDes3?: string;
}

const description: Record<string, Description> = {
  prelude: {
    des: "第一個後巷區域位於兩個充滿餐廳的商場中間，程式會偵測不同的人和物件，產生各種轉瞬即逝的合成聲音，籍此解釋閾限空間的不同特性，隨著玩家在後巷的進程，聲調及波差會漸漸降低。",
    engDes:
      "The first alley zone is situated between two restaurant-filled shopping malls. The program detects different people and objects, generating various fleeting synthesized sounds to interpret the unique characteristics of this liminal space. As the player progresses through the alley, both the pitch and modulation of the sounds gradually decrease.",
  },
  mold: {
    des: "第二個後巷區域邀請玩家在一個T字路口駐留，以一個截面視點橫向觀察來往的路人，程式會以不同數目的路人合成節拍，讓玩家以聽覺感受後巷的人流。",
    engDes:
      "The second alley zone invites players to linger at a T-junction, observing passing pedestrians from a cross-sectional perspective. The program synthesizes rhythms based on the number of people detected, enabling players to experience the flow of people in the alley through sound.",
  },
  ice: {
    des: "第三個後巷區域邀請玩家將後巷的狹長空間想像成一條樂器上的弦，而玩家搖動自己的手機就像弓撥在弦上產生聲音，玩家與區域各個出口的距離就如同弦的長度，會影響合成聲音的音高及音色。最後，程式會邀請玩家在工廈的後門，像煙民停留一段時刻，此時玩家可以把聲音「涷結」，就像煙民暫時放下工作，把時間「涷結」一樣。",
    engDes:
      "In the third alley zone, players are invited to imagine the narrow alley as a string on a musical instrument. Shaking the phone is akin to bowing the string to produce sound. The player’s distance from each exit of the zone represents the string’s length, affecting the pitch and timbre of the synthesized sound. Finally, the program prompts players to pause at the back entrance of an industrial building—like a smoker taking a break from work—allowing them to freeze the sound, metaphorically suspending time.",
  },
  crossing: {
    des: "第四個後巷區域在兩條後巷交界的十字路口，程式會引導玩家在手機鏡頭前擺出不同手勢，合成聲音會隨著手勢以及鏡頭的相對位置變化，從自己的定向習慣出發，探索在閾限空間自處的迷失感覺。",
    engDes:
      "The fourth alley zone is located at the intersection of two alleys. The program guides players to make different hand gestures in front of their phone’s camera. The synthesized sound changes according to the gestures and the camera’s relative position, encouraging players to explore the sense of disorientation and self-orientation within a liminal space.",
  },
  electric: {
    des: "第五個後巷區域由數幢地積較小的工廠大廈平分，形成一連串由不同方式劃分的小區域，程式會帶領玩家在小區域之間的灰色地帶探索，以手機鏡頭將這些分界分割、疊加，聲音的合成會隨著疊加的圖像變化，帶領玩家玩味這條業權細分的後巷的閾限特性。",
    engDes:
      "The fifth alley zone is divided by several small-lot factory buildings, forming a series of sub-zones demarcated in various ways. The program leads players to explore the grey areas between these sub-zones, using the phone camera to segment and overlay these boundaries. The synthesized sound changes with the overlaid images, inviting players to reflect on the liminality of this subdivided alley.",
  },
  rift: {
    des: "第六個後巷區域被新式商廈及舊式工廈夾在中間，玩家在可以聽到一連串由高階球形環繞聲（Ambisonics）所譜成的聲景，以及利用手機調整聲域的指向。",
    engDes:
      "The sixth alley zone is sandwiched between modern office towers and old factories. Here, players can listen to an immersive Ambisonics soundscape and use their phone to adjust the directionality of the audio field.",
  },
  riftEnd: {
    des: "在第六個後巷區域的終點，程式會偵測手機鏡頭中出現的物件，引導玩家將這些物件「帶走」，人工智能會對我們選擇的「收藏」作評價，影響在竹幕重新出現的玩家聲音。",
    engDes:
      "At the end of the sixth alley zone, the program detects objects appearing in the phone’s camera view, prompting players to “collect” them. Artificial intelligence evaluates the choices, which in turn influences the player's sonic presence when they reappear in the Bamboo Vault.",
  },
  pier: {
    des: "第七個區域位於一個視野開闊的海濱，程式以「夢境」為題，邀請玩家回想在後巷所見所聽，與在海濱的景物作對比，程式會實時偵測不同景物在畫面的佔比，合成仿如夢境一般的聲音，在這個聲音體驗的最後一站，給玩家一種異想的寧靜。",
    engDes:
      "The seventh zone is located at a waterfront with a broad, open view. The program, themed around “dreams,” invites players to reflect on their experiences in the alleys and contrast them with the waterfront scenery. It detects the proportions of different objects in the camera view in real time, generating dreamlike synthesized sounds. As the final stop in this sonic journey, it offers players a sense of weird, imaginative tranquility.",
  },
  sections: {
    des: "我講緊嘢",
    engDes: "I'm saying something",
  },
  route: {
    des: "我講緊嘢",
    engDes: "I'm saying something",
  },
};

export default function DemoAbout() {
  const main = useSection((s) => s.main);
  const riftSection = useSectionPersist((s) => s.rift);
  const language = useUI((s) => s.language);
  const mainQuery = useMemo(() => {
    if (main !== "rift" && main !== "sections" && main !== "route") return main;
    if (main === "rift" && riftSection <= 0) return "rift";
    if (main === "rift" && riftSection > 0) return "riftEnd";
  }, [main, riftSection]);
  return (
    <div>
      <div className="p-4 pr-8 font-semibold">
        {language === "Cantonese"
          ? sectionTitles[mainQuery!].chi
          : sectionTitles[mainQuery!].eng}
      </div>
      <div className="p-4 pr-8">
        {language === "Cantonese"
          ? description[mainQuery!].des
          : description[mainQuery!].engDes}
      </div>
      <div>
        {language === "Cantonese"
          ? description[mainQuery!].des2
          : description[mainQuery!].engDes2}
      </div>
      <div>
        {language === "Cantonese"
          ? description[mainQuery!].des3
          : description[mainQuery!].engDes3}
      </div>
    </div>
  );
}
