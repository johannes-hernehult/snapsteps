import "./Step.css";
import { useGuideData } from "~/lib/contexts/guideData.context";
import { StepType } from "~/lib/schemas/guide.schema";

export default function Step(props: { step: StepType; index: number }) {
  const { updateTitle, deleteStep } = useGuideData();

  return (
    <div class="step">
      <span>{props.index + 1}</span>
      <input
        type="text"
        id={`title-${props.index}`}
        value={props.step.title}
        onInput={(e) =>
          updateTitle(props.step.id, e.currentTarget.value, "step")
        }
      />
      <button
        class="delete-button"
        type="button"
        onClick={() => deleteStep(props.step.id)}
      >
        X
      </button>
    </div>
  );
}
