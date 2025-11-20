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
import genderReducer from "./slices/genderSlice.tsx";
import countryReducer from "./slices/countrySlice.tsx";
import stateReducer from "./slices/stateSlice.tsx";
import cityReducer from "./slices/citiesSlice.tsx";
import employmentReducer from "./slices/employementTypeSlice.tsx";
import availabilityReducer from "./slices/availabilitySlice.tsx";
import gradingSystemReducer from "./slices/gradingSystemSlice.tsx";
import profilePercentageReducer from "./slices/profilePercentageSlice.tsx";
import workPermitReducer from "./slices/WorkPermitSlice.tsx";
import loginReducer from "./slices/loginSlice.tsx";
import forgotPasswordReducer from "./slices/forgotPasswordSlice.tsx";

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
    gender: genderReducer,
    country:countryReducer,
    state: stateReducer,
    city: cityReducer, 
    employmentType: employmentReducer,
    availability: availabilityReducer,
    gradingSystem: gradingSystemReducer,
    profilePercentage: profilePercentageReducer,
    workPermit:workPermitReducer,
     employeeLogin: loginReducer,
     orgotPassword: forgotPasswordReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
// export type AppNaivagate = typeof store.navigate;

export default store;
