/* eslint-disable react-refresh/only-export-components */
import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { RouterProvider, createRouter } from "@tanstack/react-router";

const queryClient = new QueryClient();

// Import the generated route tree
import { routeTree } from "./routeTree.gen";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";

import { AuthProvider } from "@/context/AuthProvider";

// Create a new router instance
const router = createRouter({
  routeTree,
  context: {
    queryClient,
  },
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function InnerApp() {
  return <RouterProvider router={router} />;
}

function App() {
  return (
    <AuthProvider>
      <InnerApp />
    </AuthProvider>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <div className={cn("min-h-screen antialiased font-serif")}>
        <Toaster />
        <App />
      </div>
    </QueryClientProvider>
  </React.StrictMode>
);
