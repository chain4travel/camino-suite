import { useAppDispatch, useAppSelector } from "../../store/configureStore";

export const useStore = () => {
  const state = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  return { state };
};
