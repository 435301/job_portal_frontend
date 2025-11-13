import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "./slices/adminSlice";
import educationReducer from "./slices/educationSlice.tsx"
import skillReducer from "./slices/skillSlice.tsx"
import institutionReducer from "./slices/institutionSlice.tsx"
import jobTitleReducer from "./slices/JobTitleSlice.tsx"
import noticePeriodReducer from "./slices/noticePeriodSlice.tsx";

export const store = configureStore({
  reducer: {
    admin: adminReducer,
    education: educationReducer,
    skill: skillReducer,
    institution: institutionReducer,
    jobTitle: jobTitleReducer,
    noticePeriod: noticePeriodReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
