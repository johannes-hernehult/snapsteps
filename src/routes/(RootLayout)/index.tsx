import { Title } from "@solidjs/meta";
import GuideList from "~/components/guide-list/GuideList";

export default function Home() {
  return (
    <main>
      <Title>SnapSteps - Landing page</Title>
      <h1>Hello SnapSteps</h1>
      <GuideList />
    </main>
  );
}
