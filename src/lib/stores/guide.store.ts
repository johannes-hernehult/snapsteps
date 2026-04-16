import { createStore } from "solid-js/store";
import { Guide } from "../schemas/guide.schema";

type GuideStore = {
  allGuides: Guide[];
};

export const [guideStore, setGuideStore] = createStore<GuideStore>({
  allGuides: [],
});
