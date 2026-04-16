import { createContext, useContext, ParentProps } from "solid-js";
import { createStore } from "solid-js/store";
import { Guide } from "../schemas/guide.schema";

type GuideStore = {
  allGuides: Guide[];
};

type GuideContextType = {
  guideStore: GuideStore;
  setGuideStore: (key: keyof GuideStore, value: any) => void;
};

const GuideContext = createContext<GuideContextType>();

export function GuideProvider(props: ParentProps) {
  const [guideStore, setGuideStore] = createStore<GuideStore>({
    allGuides: [],
  });

  return (
    <GuideContext.Provider value={{ guideStore, setGuideStore }}>
      {props.children}
    </GuideContext.Provider>
  );
}

export function useGuideStore() {
  const ctx = useContext(GuideContext);
  if (!ctx) throw new Error("useGuideStore must be used within GuideProvider");
  return ctx;
}
