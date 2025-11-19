import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "./slices/adminSlice";
import educationReducer from "./slices/educationSlice.tsx"
import skillReducer from "./slices/skillSlice.tsx"
import institutionReducer from "./slices/institutionSlice.tsx"
import jobTitleReducer from "./slices/JobTitleSlice.tsx"
import noticePeriodReducer from "./slices/noticePeriodSlice.tsx";
import experienceReducer from "./slices/experienceSlice.tsx";
import courseReducer from "./slices/courseSlice.tsx";
import courseTypeReducer from "./slices/courseTypeSlice.tsx";
import captchaReducer from "./slices/captchaSlice.tsx";
import registerReducer from "./slices/registerSlice.tsx";
import schoolBoardReducer from "./slices/schoolBoardSlice.tsx";
import schoolMediumReducer from "./slices/schoolMediumSlice.tsx";
import specializationReducer from "./slices/specializationSlice.tsx";
import maritalStatusReducer from "./slices/maritalStatusSlice.tsx";

export const store = configureStore({
  reducer: {
    admin: adminReducer,
    education: educationReducer,
    skill: skillReducer,
    institution: institutionReducer,
    jobTitle: jobTitleReducer,
    noticePeriod: noticePeriodReducer,
    experience: experienceReducer,
    course: courseReducer,
    courseType: courseTypeReducer,
    captcha: captchaReducer,
    register: registerReducer,
    schoolBoard: schoolBoardReducer,
    schoolMedium: schoolMediumReducer,
    specialization: specializationReducer,
    maritalStatus: maritalStatusReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
// export type AppNaivagate = typeof store.navigate;

export default store;
