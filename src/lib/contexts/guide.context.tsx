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
    allGuides: [
      {
        id: "temp-1",
        title: "Temp Guide",
        description: "A temporary guide",
        snapshots: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        version: 1,
        isDeleted: false,
      },
    ],
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
