import { FilesetResolver, TextClassifier } from "@mediapipe/tasks-text";
import { useEffect, useRef } from "react";
import { useClassification } from "@/hooks/useClassification";
import { useEffectOnce } from "react-use";
import { useUI } from "@/hooks/useUI";

const TextDetector = () => {
  const classifyText = useClassification((s) => s.classify);
  const rating = useClassification((s) => s.rating);
  const textDect = useRef<TextClassifier>(null);
  const language = useUI.getState().language;
  useEffect(() => {
    if (!classifyText || !textDect.current) return;
    console.log(classifyText);
    const result = textDect.current.classify(classifyText);
    const score = result.classifications[0].categories[1].score
    useClassification
      .getState()
      .setRating(score);
  }, [classifyText]);

  useEffectOnce(() => {
    let textDetection: TextClassifier;
    FilesetResolver.forTextTasks("/assets/ai/text/wasm").then((f) => {
      TextClassifier.createFromOptions(f, {
        baseOptions: {
          modelAssetPath: `/assets/ai/text/average_word_classifier.tflite`,
        },
        maxResults: 2,
      }).then((f) => {
        textDetection = f;
        textDect.current = f;
      });
    });
    return () => textDetection?.close();
  });

  return (
    <div className="fixed bottom-0 left-0 right-0 text-center text-[#22ffbd]">
      <div>{language === "Cantonese" ? "評價" : "Rating"}</div>
      <div
        className="radial-progress"
        //@ts-ignore
        style={{ "--value": rating * 100 }}
        role="progressbar"
      >
        {(rating * 100).toFixed(1)}
      </div>
    </div>
  );
};

export default TextDetector;
