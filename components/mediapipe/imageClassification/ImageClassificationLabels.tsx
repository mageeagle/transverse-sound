import { fetchLink } from "@/helpers/fetcher";
import { useClassification } from "@/hooks/useClassification";
import { use, useEffect } from "react";
const labelList = fetchLink("/assets/data/image_classifier_labels.json");

const ImageClassificationLabels = () => {
  const labels = use(labelList);

  useEffect(() => {
    if (!labels) return;
    useClassification.getState().setClassifyHKList(labels.categoriesHK);
    useClassification.getState().setClassifyEngList(labels.categories);
  }, [labels]);

  return null;
};

export default ImageClassificationLabels;
