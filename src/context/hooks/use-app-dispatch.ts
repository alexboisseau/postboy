import { useDispatch } from "react-redux";
import { AppDispatch } from "@context/store";

export const useAppDispatch: () => AppDispatch = useDispatch;
