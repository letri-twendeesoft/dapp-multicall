import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import Web3Provider from "./provider/web3/index.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Web3Provider>
      <QueryClientProvider client={queryClient}>
        <div className="flex flex-col items-center justify-center min-h-dvh w-full bg-slate-950 text-white">
          <App />
        </div>
      </QueryClientProvider>
    </Web3Provider>
  </StrictMode>
);
