import { Title } from "@solidjs/meta";
import { A } from "@solidjs/router";

export default function Home() {
  return (
    <main>
      <Title>SnapSteps - Landing page</Title>
      <h1>SnapSteps Landingpage</h1>
      <A href="/app">Go to App</A>
    </main>
  );
}
