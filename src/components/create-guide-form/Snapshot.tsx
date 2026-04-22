import { createMemo, onCleanup } from "solid-js";
import { FileType, SnapshotType } from "~/lib/schemas/guide.schema";

export default function Snapshot(props: {
  snapshot: SnapshotType;
  snapshotFile: () => FileType | undefined;
}) {
  const objectUrl = createMemo(() => {
    const file = props.snapshotFile();
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
      <img src={objectUrl()} alt={props.snapshot.title} />
      <label for="title">Title</label>
      <input type="text" id="title" value={props.snapshot.title} />
    </div>
  );
}
