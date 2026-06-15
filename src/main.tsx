import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import Projects from "./router/Projects.tsx";
import ProjectDetail from "./router/ProjectDetail.tsx";
import ArticleDetail from "./router/ArticleDetail.tsx";
import Resume from "./router/Resume.tsx";
import Services from "./router/Services.tsx";
import Contact from "./router/Contact.tsx";
import AppLayout from "./AppLayout.tsx";
import { I18nProvider } from "./contexts/i18n.tsx";
import { AuthProvider } from "./contexts/auth.tsx";
import RequireAuth from "./components/RequireAuth.tsx";
import AdminLayout from "./router/admin/AdminLayout.tsx";
import AdminLogin from "./router/admin/AdminLogin.tsx";
import AdminDashboard from "./router/admin/AdminDashboard.tsx";
import ProjectForm from "./router/admin/ProjectForm.tsx";
import ArticleForm from "./router/admin/ArticleForm.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, Component: App },
      { path: "projects", Component: Projects },
      { path: "projects/:slug", Component: ProjectDetail },
      { path: "projects/:slug/articles/:articleId", Component: ArticleDetail },
      { path: "resume", Component: Resume },
      { path: "services", Component: Services },
      { path: "contact", Component: Contact },
    ],
  },
  { path: "/admin/login", Component: AdminLogin },
  {
    path: "/admin",
    element: (
      <RequireAuth>
        <AdminLayout />
      </RequireAuth>
    ),
    children: [
      { index: true, Component: AdminDashboard },
      { path: "projects/new", Component: ProjectForm },
      { path: "projects/:slug", Component: ProjectForm },
      { path: "projects/:slug/articles/new", Component: ArticleForm },
      { path: "projects/:slug/articles/:articleId", Component: ArticleForm },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <I18nProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </I18nProvider>
  </StrictMode>,
);
