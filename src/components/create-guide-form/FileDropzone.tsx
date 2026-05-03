import { createSignal, onCleanup, onMount, Show } from "solid-js";

export default function FileDropzone(props: {
  onFiles: (files: File[]) => void;
}) {
  const [isDrop, setIsDrop] = createSignal(false);
  let dragCounter = 0;

  function handleDragEnter(e: DragEvent) {
    e.preventDefault();
    dragCounter++;
    setIsDrop(true);
  }

  function handleDragLeave(e: DragEvent) {
    e.preventDefault();
    dragCounter--;
    if (dragCounter === 0) setIsDrop(false);
  }

  function handleDragOver(e: DragEvent) {
    e.preventDefault();
  }

  function handleDrop(e: DragEvent) {
    e.preventDefault();
    dragCounter = 0;
    setIsDrop(false);
    const files = Array.from(e.dataTransfer?.files ?? []);
    if (files.length > 0) props.onFiles(files);
  }

  onMount(() => {
    window.addEventListener("dragenter", handleDragEnter);
    window.addEventListener("dragleave", handleDragLeave);
    window.addEventListener("dragover", handleDragOver);
    window.addEventListener("drop", handleDrop);
  });

  onCleanup(() => {
    if (typeof window === "undefined") return;
    window.removeEventListener("dragenter", handleDragEnter);
    window.removeEventListener("dragleave", handleDragLeave);
    window.removeEventListener("dragover", handleDragOver);
    window.removeEventListener("drop", handleDrop);
  });

  return (
    <>
      <Show when={isDrop()}>
        <div
          style={{
            position: "fixed",
            inset: "0",
            "z-index": "9999",
            "pointer-events": "none",
          }}
        >
          <p>Drop your images here!</p>
        </div>
      </Show>
      <label for="file-upload" style={{ display: "block", cursor: "pointer" }}>
        <div class="dropzone-visual">
          <p>Click or drag to upload images</p>
        </div>
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          multiple
          style={{
            position: "absolute",
            width: "1px",
            height: "1px",
            opacity: "0",
            overflow: "hidden",
            clip: "rect(0,0,0,0)",
            "white-space": "nowrap",
          }}
          onChange={(e) => {
            const files = Array.from(e.target.files ?? []);
            if (files.length > 0) props.onFiles(files);
          }}
        />
      </label>
    </>
  );
}
