import * as React from "react";
import { Provider } from "react-redux";

import { App } from "./app/index";

import { HelmetProvider } from "react-helmet-async";

import { configureAppStore } from "./store/configureStore";

import { ThemeProvider } from "./styles/theme/ThemeProvider";

import { QueryClient, QueryClientProvider } from "react-query";
import { ExplorerStoreProvider } from "./store/shareStore";

export const store = configureAppStore();
export const queryClient = new QueryClient();

export function StoreProvider({ children }) {
  return <Provider store={store}>{children}</Provider>;
}

const Root = () => (
  <ExplorerStoreProvider>
    <ThemeProvider>
      <HelmetProvider>
        <React.StrictMode>
          <QueryClientProvider client={queryClient}>
            <App />
          </QueryClientProvider>
        </React.StrictMode>
      </HelmetProvider>
    </ThemeProvider>
  </ExplorerStoreProvider>
);
export default Root;
// ReactDOM.render(<Root />, document.getElementById("app"));
