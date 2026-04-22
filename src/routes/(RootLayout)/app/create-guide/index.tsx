import { Title } from "@solidjs/meta";
import { useNavigate } from "@solidjs/router";
import { For } from "solid-js";
import FileDropzone from "~/components/create-guide-form/FileDropzone";
import Snapshot from "~/components/create-guide-form/Snapshot";
import useCreateGuide from "~/lib/hooks/useCreateGuide";

export default function CreateGuide() {
  const navigate = useNavigate();

  const {
    guideTitle,
    guideDescription,
    setGuideTitle,
    setGuideDescription,
    snapshots,
    snapshotFiles,
    handleFileDrop,
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

        <FileDropzone onFiles={handleFileDrop} />

        <For each={snapshots()}>
          {(snapshot) => (
            <Snapshot
              snapshot={snapshot}
              snapshotFile={() =>
                snapshotFiles().find((f) => f.snapshotId === snapshot.id)
              }
            />
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
