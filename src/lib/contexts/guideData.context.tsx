import { createContext, useContext, ParentProps, batch } from "solid-js";
import { createStore, SetStoreFunction, unwrap } from "solid-js/store";
import {
  fileSchema,
  FileType,
  guideSchema,
  GuideType,
  snapshotSchema,
  SnapshotType,
  stepSchema,
  StepType,
} from "../schemas/guide.schema";
import { compressImage } from "../helpers/image.helpers";
import { Log } from "../helpers/global.helpers";

type GuideContextType = {
  guideData: GuideType;
  setGuideData: SetStoreFunction<GuideType>;
  snapshotsData: SnapshotType[];
  setSnapshotsData: SetStoreFunction<SnapshotType[]>;
  deleteSnapshot: (snapshotId: string) => void;
  addStep: (snapshotId: string) => void;
  deleteStep: (stepId: string) => void;
  filesData: FileType[];
  setFilesData: SetStoreFunction<FileType[]>;
  updateTitle: (
    id: string,
    title: string,
    type: "guide" | "snapshot" | "step",
  ) => void;
  handleCreateGuide: (e: Event) => void;
  handleFileDrop: (files: File[]) => Promise<void>;
};

const GuideDataContext = createContext<GuideContextType>();

export function GuideDataProvider(props: ParentProps) {
  //State and variables
  const guideId = crypto.randomUUID();

  const [guideData, setGuideData] = createStore<GuideType>({
    id: guideId,
    title: "",
    description: "",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    version: 1,
    isDeleted: false,
  });
  const [snapshotsData, setSnapshotsData] = createStore<SnapshotType[]>([]);
  const [filesData, setFilesData] = createStore<FileType[]>([]);

  //Functions

  function addStep(snapshotId: string) {
    const index = snapshotsData.findIndex((s) => s.id === snapshotId);
    if (index === -1) return;

    setSnapshotsData(index, "steps", (steps) => [
      ...steps,
      { id: crypto.randomUUID(), title: "", order: steps.length },
    ]);
  }

  function deleteStep(stepId: string) {
    const index = snapshotsData.findIndex((s) =>
      s.steps.some((step) => step.id === stepId),
    );
    if (index === -1) return;

    setSnapshotsData(index, "steps", (steps) =>
      steps.filter((step) => step.id !== stepId),
    );
  }

  function deleteSnapshot(snapshotId: string) {
    setSnapshotsData((s) => s.filter((s) => s.id !== snapshotId));
  }

  function updateTitle(
    id: string,
    title: string,
    type: "guide" | "snapshot" | "step",
  ) {
    switch (type) {
      case "guide":
        setGuideData("title", title);
        break;
      case "snapshot":
        setSnapshotsData((s) => s.id === id, "title", title);
        break;
      case "step": {
        const index = snapshotsData.findIndex((s) =>
          s.steps.some((step) => step.id === id),
        );
        if (index === -1) return;

        const stepIndex = snapshotsData[index].steps.findIndex(
          (s) => s.id === id,
        );
        setSnapshotsData(index, "steps", stepIndex, "title", title);
        break;
      }
    }
  }

  async function handleFileDrop(files: File[]) {
    const imageFiles = files.filter((file) => file.type.startsWith("image/"));
    if (imageFiles.length === 0) return;

    const compressed = await Promise.all(imageFiles.map(compressImage));

    const newFiles: FileType[] = [];
    const newSnapshots: SnapshotType[] = [];
    const newSteps: StepType[] = [];
    const baseOrder = snapshotsData.length;

    compressed.forEach((file, i) => {
      const snapshotId = crypto.randomUUID();
      const fileId = crypto.randomUUID();

      newFiles.push({
        id: fileId,
        snapshotId,
        fileName: file.name,
        fileMimeType: file.type,
        fileSize: file.size,
        fileBlob: file,
      });

      newSnapshots.push({
        id: snapshotId,
        guideId,
        title: "",
        order: baseOrder + i,
        steps: [{ id: crypto.randomUUID(), title: "", order: 0 }],
      });
    });

    batch(() => {
      setFilesData([...filesData, ...newFiles]);
      setSnapshotsData([...snapshotsData, ...newSnapshots]);
    });
  }

  function handleCreateGuide(e: Event) {
    e.preventDefault();

    const validatedGuideData = guideSchema.safeParse(unwrap(guideData));
    if (!validatedGuideData.success) {
      console.log("Guide validation error: ", validatedGuideData.error);
      return;
    }

    const snapshotResults = unwrap(snapshotsData).map((item, index) => {
      const result = snapshotSchema.safeParse(item);
      if (!result.success)
        console.error(`Snapshot error at index ${index}:`, result.error);
      return result;
    });
    const snapshotsValid = snapshotResults.every((r) => r.success);

    const fileResults = unwrap(filesData).map((item, index) => {
      const result = fileSchema.safeParse(item);
      if (!result.success)
        console.error(`File error at index ${index}:`, result.error);
      return result;
    });
    const filesValid = fileResults.every((r) => r.success);

    if (!snapshotsValid || !filesValid) {
      console.log("Validation failed. Please check errors above.");
      return;
    }

    Log(snapshotsData);
    console.log("All data valid. Proceeding...");

    //Add guide to database

    //reset form
    setGuideData({
      id: crypto.randomUUID(),
      title: "",
      description: "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      version: 1,
      isDeleted: false,
    });

    setSnapshotsData([]);
    setFilesData([]);
  }

  return (
    <GuideDataContext.Provider
      value={{
        guideData,
        setGuideData,
        snapshotsData,
        setSnapshotsData,
        deleteSnapshot,
        addStep,
        deleteStep,
        filesData,
        setFilesData,
        updateTitle,
        handleCreateGuide,
        handleFileDrop,
      }}
    >
      {props.children}
    </GuideDataContext.Provider>
  );
}

export function useGuideData() {
  const ctx = useContext(GuideDataContext);
  if (!ctx) throw new Error("useGuideData must be used within GuideProvider");
  return ctx;
}

// Try to make this ocntext work properly
