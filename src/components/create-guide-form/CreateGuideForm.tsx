import "./CreateGuideForm.css";
import { useNavigate } from "@solidjs/router";
import { useGuideData } from "~/lib/contexts/guideData.context";
import FileDropzone from "./FileDropzone";
import { For } from "solid-js";
import Snapshot from "./Snapshot";

export default function CreateGuideForm() {
  const navigate = useNavigate();

  const {
    guideData,
    filesData,
    snapshotsData,
    setGuideData,
    handleFileDrop,
    handleCreateGuide,
  } = useGuideData();

  return (
    <form class="create-guide-form" onSubmit={handleCreateGuide}>
      <label for="title">
        Title
        <input
          type="text"
          id="title"
          value={guideData.title}
          onInput={(e) => setGuideData("title", e.target.value)}
        />
      </label>
      <label for="description">
        Description
        <textarea
          id="description"
          value={guideData.description}
          onInput={(e) => setGuideData("description", e.target.value)}
        />
      </label>

      <FileDropzone onFiles={handleFileDrop} />

      <For each={snapshotsData}>
        {(snapshot) => (
          <Snapshot
            snapshot={snapshot}
            snapshotFile={filesData.find((f) => f.snapshotId === snapshot.id)}
          />
        )}
      </For>

      <button type="submit">Save</button>
      <button type="button" onClick={() => navigate("/app")}>
        Cancel
      </button>
    </form>
  );
}
