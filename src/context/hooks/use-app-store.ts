import { AppStore } from "@context/store";
import { useStore } from "react-redux";

export const useAppStore: () => AppStore = useStore;
