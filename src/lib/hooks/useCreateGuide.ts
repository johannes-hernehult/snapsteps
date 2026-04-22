import { batch, createSignal } from "solid-js";
import {
  fileSchema,
  FileType,
  guideSchema,
  snapshotSchema,
  SnapshotType,
} from "../schemas/guide.schema";
import { compressImage } from "../helpers/image.helpers";

export default function useCreateGuide() {
  const [guideId] = createSignal(crypto.randomUUID());
  const [guideTitle, setGuideTitle] = createSignal("");
  const [guideDescription, setGuideDescription] = createSignal("");
  const [snapshots, setSnapshots] = createSignal<SnapshotType[]>([]);
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

    const guide = {
      id: guideId(),
      title: guideTitle(),
      description: guideDescription(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      version: 1,
      isDeleted: false,
    };

    //Vaidate guide, snapshots and snapshotFiles

    const validatedGuide = guideSchema.safeParse(guide);
    const validatedSnapshots = snapshots().map((snapshot) =>
      snapshotSchema.safeParse(snapshot),
    );
    const validatedSnapshotFiles = snapshotFiles().map((file) =>
      fileSchema.safeParse(file),
    );

    if (!validatedGuide.success) {
      console.log(validatedGuide.error);
      return;
    }

    if (validatedSnapshots.some((snapshot) => !snapshot.success)) {
      console.log(
        validatedSnapshots.find((snapshot) => !snapshot.success)?.error,
      );
      return;
    }

    if (validatedSnapshotFiles.some((file) => !file.success)) {
      console.log(validatedSnapshotFiles.find((file) => !file.success)?.error);
      return;
    }

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
