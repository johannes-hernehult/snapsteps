import { Title } from "@solidjs/meta";
import { RouteSectionProps } from "@solidjs/router";

export default function Guide(props: RouteSectionProps) {
  return (
    <main>
      <Title>Guide - {props.params["guide-id"]}</Title>
      <h1>Guide {props.params["guide-id"]}</h1>
    </main>
  );
}
