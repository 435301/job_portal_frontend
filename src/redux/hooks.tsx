import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";
import { useNavigate } from "react-router-dom";

export const useAppDispatch: () => AppDispatch = useDispatch;
// export const useAppNavigate: () => AppNaivagate = useNavigate;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
