import { A } from "@solidjs/router";
import { For } from "solid-js";
import { useGuideStore } from "~/lib/contexts/guideList.context";

export default function GuideList() {
  const { guideList, setGuideList } = useGuideStore();

  return (
    <For each={guideList}>
      {(guide) => <A href={`/app/guide/${guide.id}`}>{guide.title}</A>}
    </For>
  );
}
