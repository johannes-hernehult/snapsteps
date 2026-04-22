import { batch, createSignal } from "solid-js";
import { FileType, SnapshotType } from "../schemas/guide.schema";
import { compressImage } from "../helpers/image.helpers";

export default function useCreateGuide() {
  const [guideId] = createSignal(crypto.randomUUID());
  const [guideTitle, setGuideTitle] = createSignal("");
  const [guideDescription, setGuideDescription] = createSignal("");
  const [snapshots, setSnapshots] = createSignal<SnapshotType[]>([
    {
      id: crypto.randomUUID(),
      title: "",
      steps: [],
      guideId: guideId(),
      order: 0,
    },
  ]);
  const [snapshotFiles, setSnapshotFiles] = createSignal<FileType[]>([]);

  async function handleFileDrop(files: File[]) {
    const gId = guideId();

    const imageFiles = files.filter((file) => file.type.startsWith("image/"));
    if (imageFiles.length === 0) return; //Add user feedback in toast later
    const compressed = await Promise.all(imageFiles.map(compressImage));

    const pairs = compressed.map((file) => ({
      snapshotId: crypto.randomUUID(),
      fileId: crypto.randomUUID(),
      file,
    }));

    batch(() => {
      setSnapshots((prev) => [
        ...prev,
        ...pairs.map(({ snapshotId, file }, i) => ({
          id: snapshotId,
          title: file.name,
          steps: [],
          guideId: gId,
          order: prev.length + i + 1,
        })),
      ]);

      setSnapshotFiles((prev) => [
        ...prev,
        ...pairs.map(({ snapshotId, fileId, file }) => ({
          id: fileId,
          fileBlob: file,
          fileName: file.name,
          fileMimeType: file.type,
          fileSize: file.size,
          guideId: gId,
          snapshotId,
        })),
      ]);
    });
  }

  function handleCreateGuide(e: Event) {
    e.preventDefault();

    console.log(guideId());
    console.log(guideTitle());
    console.log(guideDescription());

    console.log(snapshots());
    console.log(snapshotFiles());

    //ZOD validation
    //Add guide to database
    //

    //reset form
    setGuideTitle("");
    setGuideDescription("");
    setSnapshots([
      {
        id: crypto.randomUUID(),
        title: "",
        steps: [],
        guideId: guideId(),
        order: 0,
      },
    ]);
    setSnapshotFiles([]);
  }

  return {
    guideId,
    guideTitle,
    setGuideTitle,
    guideDescription,
    setGuideDescription,
    snapshots,
    snapshotFiles,
    setSnapshots,
    setSnapshotFiles,
    handleFileDrop,
    handleCreateGuide,
  };
}
