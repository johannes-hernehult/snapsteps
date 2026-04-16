import { Title } from "@solidjs/meta";
import { RouteSectionProps } from "@solidjs/router";

export default function EditGuide(props: RouteSectionProps) {
  return (
    <main>
      <Title>Edit Guide - {props.params["guide-id"]}</Title>
    </main>
  );
}
