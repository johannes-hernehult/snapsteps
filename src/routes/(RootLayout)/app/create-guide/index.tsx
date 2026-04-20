import { Title } from "@solidjs/meta";
import { useNavigate } from "@solidjs/router";
import { createSignal, For } from "solid-js";
import { Snapshot } from "~/components/create-guide-form/Snapshot";
import useCreateGuide from "~/lib/hooks/useCreateGuide";
import { SnapshotDraftType, SnapshotType } from "~/lib/schemas/guide.schema";

export default function CreateGuide() {
  const navigate = useNavigate();

  const {
    guideTitle,
    guideDescription,
    setGuideTitle,
    setGuideDescription,
    snapshots,
    setSnapshots,
    handleCreateGuide,
  } = useCreateGuide();

  return (
    <main>
      <Title>Create Guide</Title>
      <form onSubmit={handleCreateGuide}>
        <label for="title">Title</label>
        <input
          type="text"
          id="title"
          value={guideTitle()}
          onInput={(e) => setGuideTitle(e.target.value)}
        />
        <label for="description">Description</label>
        <textarea
          id="description"
          value={guideDescription()}
          onChange={(e) => setGuideDescription(e.target.value)}
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
