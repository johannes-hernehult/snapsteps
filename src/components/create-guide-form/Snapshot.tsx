import "./Snapshot.css";
import { createMemo, For, onCleanup } from "solid-js";
import { useGuideData } from "~/lib/contexts/guideData.context";
import { FileType, SnapshotType } from "~/lib/schemas/guide.schema";
import Step from "./Step";

export default function Snapshot(props: {
  snapshot: SnapshotType;
  snapshotFile: FileType | undefined;
}) {
  const { addStep, updateTitle, deleteSnapshot } = useGuideData();

  const objectUrl = createMemo(() => {
    const file = props.snapshotFile;
    if (!file?.fileBlob) return undefined;
    const url = URL.createObjectURL(file.fileBlob);
    return url;
  });

  onCleanup(() => {
    const url = objectUrl();
    if (url) URL.revokeObjectURL(url);
  });

  return (
    <div class="snapshot">
      <label for="title">
        Title
        <input
          type="text"
          id="title"
          value={props.snapshot.title}
          onChange={(e) =>
            updateTitle(props.snapshot.id, e.target.value, "snapshot")
          }
        />
      </label>
      <img src={objectUrl()} alt={props.snapshot.title} />

      <button
        class="add-button"
        type="button"
        onClick={() => addStep(props.snapshot.id)}
      >
        Add Step
      </button>

      <For each={props.snapshot.steps}>
        {(item, i) => <Step step={item} index={i()} />}
      </For>

      <button
        class="delete-button"
        type="button"
        onClick={() => deleteSnapshot(props.snapshot.id)}
      >
        Delete Snapshot
      </button>
    </div>
  );
}
