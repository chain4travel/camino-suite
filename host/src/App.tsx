import React from "react";
import ReactDOM from "react-dom";
import Layout from "./Layout";
import { HelmetProvider } from "react-helmet-async";
import ThemeConfig from "./theme";
import { Provider as ReduxProvider } from "react-redux";
import { configureAppStore } from "./redux/store";
import "./index.css";
import { ExplorerStoreProvider } from "Explorer/useStore";

export const store = configureAppStore();

ReactDOM.render(
  <HelmetProvider>
    <ExplorerStoreProvider>
      <ReduxProvider store={store}>
        <ThemeConfig>
          <Layout />
        </ThemeConfig>
      </ReduxProvider>
    </ExplorerStoreProvider>
  </HelmetProvider>,
  document.getElementById("app")
);
