import { RouteSectionProps } from "@solidjs/router";

export default function RootLayout(props: RouteSectionProps) {
  return (
    <>
      <header>Logo</header>
      {props.children}
      <footer>Copyright {new Date().getFullYear()}</footer>
    </>
  );
}
