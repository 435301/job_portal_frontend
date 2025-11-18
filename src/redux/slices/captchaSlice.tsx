import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import BASE_URL_JOB from "../../config/config";

export interface CaptchaState {
  loading: boolean;
  captchaSvg: string;
  captchaText: string;
  error: string | null;
}

const initialState: CaptchaState = {
  loading: false,
  captchaSvg: "",
  captchaText:"",
  error: null,
};

// Response type
interface CaptchaResponse {
  status: number;
  captchaSvg: string;
  captchaText: string;
}

// Async thunk
export const fetchCaptcha = createAsyncThunk<
  CaptchaResponse,      // return type
  void,                 // argument type
  { rejectValue: string }
>(
  "captcha/fetchCaptcha",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get<CaptchaResponse>( `${BASE_URL_JOB}/employees/captcha`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to load captcha");
    }
  }
);

const captchaSlice = createSlice({
  name: "captcha",
  initialState,
  reducers: {
    clearCaptcha(state) {
      state.captchaSvg = "";
      state.captchaText = "";
       state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCaptcha.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchCaptcha.fulfilled,
        (state, action: PayloadAction<CaptchaResponse>) => {
          state.loading = false;
          state.captchaSvg = action.payload.captchaSvg;
        state.captchaText = action.payload.captchaText;
        }
      )
      .addCase(fetchCaptcha.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) || "Something went wrong fetching captcha";
      });
  },
});

export const { clearCaptcha } = captchaSlice.actions;
export default captchaSlice.reducer;
