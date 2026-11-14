import { RouterProvider } from "react-router";
import { OperationalStateProvider } from "./operational-state";
import { router } from "./routes";

export default function App() {
  return (
    <OperationalStateProvider>
      <RouterProvider router={router} />
    </OperationalStateProvider>
  );
}
