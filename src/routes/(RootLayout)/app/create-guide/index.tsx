import { Title } from "@solidjs/meta";
import { useNavigate } from "@solidjs/router";
import { createSignal, For } from "solid-js";
import { Snapshot } from "~/components/create-guide-form/Snapshot";
import { SnapshotDraftType, SnapshotType } from "~/lib/schemas/guide.schema";

export default function CreateGuide() {
  const navigate = useNavigate();

  const [guideId, setGuideId] = createSignal(crypto.randomUUID());
  const [title, setTitle] = createSignal("");
  const [description, setDescription] = createSignal("");
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
    console.log(snapshots());
  }

  return (
    <main>
      <Title>Create Guide</Title>
      <form onSubmit={handleCreateGuide}>
        <label for="title">Title</label>
        <input
          type="text"
          id="title"
          onInput={(e) => setTitle(e.target.value)}
        />
        <label for="description">Description</label>
        <textarea
          id="description"
          onChange={(e) => setDescription(e.target.value)}
        />

        <For each={snapshots()}>
          {(snapshot) => (
            <Snapshot snapshot={snapshot} setSnapshots={setSnapshots} />
          )}
        </For>

        <button type="submit">Save</button>
        <button type="button" onClick={() => navigate("/app")}>
          Cancel
        </button>
      </form>
    </main>
  );
}
