/** React */
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

/** Style */
import "./index.css";

/** View */
import App from "./App.tsx";

/** React Query */
import { queryClient } from "@Lib/QueryClient.ts";
import { QueryClientProvider } from "react-query";

const router = createBrowserRouter([
  {
    path: "/*",
    element: <App />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>,
);
