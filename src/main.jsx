import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import { router } from "./router/Router";
import AuthProvider from "./Context/AuthProvider";
import Theme from "./Context/Theme";
import { Toaster } from "react-hot-toast";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import ErrorBoundary from "./component/ErrorBoundary";

const queryClient = new QueryClient()

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <ErrorBoundary>
      <Theme>
        <AuthProvider>
          <Toaster position="top-center" />
          <RouterProvider router={router} />
        </AuthProvider>
      </Theme>
    </ErrorBoundary>
  </QueryClientProvider>
);



// ami urmi