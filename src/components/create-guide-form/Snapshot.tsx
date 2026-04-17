import { Setter } from "solid-js";
import { SnapshotDraftType } from "~/lib/schemas/guide.schema";

export function Snapshot(props: {
  snapshot: SnapshotDraftType;
  setSnapshots: Setter<SnapshotDraftType[]>;
}) {
  return (
    <div class="snapshot">
      <label for="title">Title</label>
      <input type="text" id="title" value={props.snapshot.title} />
    </div>
  );
}
