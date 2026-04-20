import { createSignal } from "solid-js";
import { SnapshotDraftType } from "../schemas/guide.schema";

export default function useCreateGuide() {
  const [guideId] = createSignal(crypto.randomUUID());
  const [guideTitle, setGuideTitle] = createSignal("");
  const [guideDescription, setGuideDescription] = createSignal("");
  const [snapshots, setSnapshots] = createSignal<SnapshotDraftType[]>([
    {
      id: crypto.randomUUID(),
      title: "",
      steps: [],
      file: undefined,
      guideId: guideId(),
    },
  ]);

  function handleCreateGuide(e: Event) {
    e.preventDefault();
    console.log(guideId());
    console.log(guideTitle());
    console.log(guideDescription());

    console.log(snapshots());

    //reset form
    setGuideTitle("");
    setGuideDescription("");
    setSnapshots([
      {
        id: crypto.randomUUID(),
        title: "",
        steps: [],
        file: undefined,
        guideId: guideId(),
      },
    ]);
  }

  return {
    guideId,
    guideTitle,
    setGuideTitle,
    guideDescription,
    setGuideDescription,
    snapshots,
    setSnapshots,
    handleCreateGuide,
  };
}
