import React from "react";
import { Provider } from "react-redux";
import { store } from "../../App";
import { useAppDispatch, useAppSelector } from "../configureStore";

export const useStore = () => {
  const state = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  return { state };
};

export function ExplorerStoreProvider({ children }) {
  return <Provider store={store}>{children}</Provider>;
}
