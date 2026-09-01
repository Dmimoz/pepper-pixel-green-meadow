import { createFileRoute } from "@tanstack/react-router";
import App from "../App";

export const Route = createFileRoute("/")({
  ssr: false,
  component: Home,
});

function Home() {
  return (
    <div id="app-root">
      <App />
    </div>
  );
}
