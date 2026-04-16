import { For } from "solid-js";
import { useGuideStore } from "~/lib/contexts/guide.context";

export default function GuideList() {
  const { guideStore, setGuideStore } = useGuideStore();

  return (
    <For each={guideStore.allGuides}>{(guide) => <div>{guide.title}</div>}</For>
  );
}
