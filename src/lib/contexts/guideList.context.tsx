import { createContext, useContext, ParentProps } from "solid-js";
import { createStore, SetStoreFunction } from "solid-js/store";
import { GuideType } from "../schemas/guide.schema";

type GuideContextType = {
  guideList: GuideType[];
  setGuideList: SetStoreFunction<GuideType[]>;
};

const GuideContext = createContext<GuideContextType>();

export function GuideProvider(props: ParentProps) {
  const [guideList, setGuideList] = createStore<GuideType[]>([
    {
      id: "temp-1",
      title: "Temp Guide",
      description: "A temporary guide",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      version: 1,
      isDeleted: false,
    },
  ]);

  return (
    <GuideContext.Provider value={{ guideList, setGuideList }}>
      {props.children}
    </GuideContext.Provider>
  );
}

export function useGuideStore() {
  const ctx = useContext(GuideContext);
  if (!ctx) throw new Error("useGuideStore must be used within GuideProvider");
  return ctx;
}
