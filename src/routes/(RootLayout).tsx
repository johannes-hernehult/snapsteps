import { RouteSectionProps } from "@solidjs/router";
import { GuideProvider } from "~/lib/contexts/guide.context";

export default function Layout(props: RouteSectionProps) {
  return (
    <GuideProvider>
      <header>Logo</header>
      {props.children}
      <footer>Copyright {new Date().getFullYear()}</footer>
    </GuideProvider>
  );
}
