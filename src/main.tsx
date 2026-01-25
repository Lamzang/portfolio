import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import Projects from "./router/Projects.tsx";
import Resume from "./router/Resume.tsx";
import Services from "./router/Services.tsx";
import Contact from "./router/Contact.tsx";
import AppLayout from "./AppLayout.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, Component: App },
      { path: "projects", Component: Projects },
      { path: "resume", Component: Resume },
      { path: "services", Component: Services },
      { path: "contact", Component: Contact },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
