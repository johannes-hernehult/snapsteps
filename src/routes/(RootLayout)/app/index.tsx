import { Title } from "@solidjs/meta";
import { A } from "@solidjs/router";
import GuideList from "~/components/guide-list/GuideList";

export default function App() {
  return (
    <main>
      <Title>SnapSteps</Title>
      <A href="/app/create-guide">Create Guide</A>
      <GuideList />
    </main>
  );
}
