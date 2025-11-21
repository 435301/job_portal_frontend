import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import BASE_URL_JOB from "../../config/config";
import getAuthAdminHeaders from "../../utils/auth";
import { toast } from "react-toastify";

interface EmployeeProfileState {
  loading: boolean;
  data: any | null;
  error: string | null;
}

const initialState: EmployeeProfileState = {
  loading: false,
  data: null,
  error: null,
};

export const fetchEmployeeProfile = createAsyncThunk(
  "employees/profile",
  async (employeeId: number, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL_JOB}/employees/profile/${employeeId}`, getAuthAdminHeaders());
      return response.data; // {status, message, data}
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch employee profile"
      );
    }
  }
);

export const updatePersonalDetails = createAsyncThunk(
  "employee/updatePersonalDetails",
  async (formData: any, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${BASE_URL_JOB}/employees/updatePersonalDetails`, formData, getAuthAdminHeaders(false),);
      toast.success(response.data.message)
      return response.data; // { status, message, data }
    } catch (err: any) {
      return rejectWithValue(err.response?.data || "Something went wrong");
    }
  }
);

export const updateProfileTitle = createAsyncThunk(
  "employee/updateProfileTitle",
  async (newTitle: string, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL_JOB}/employees/updateProfileTitle`, {
        profileTitle: newTitle
      }, getAuthAdminHeaders(false),);
      toast.success(response.data.message)
      return { newTitle };
    } catch (err: any) {
      return rejectWithValue(err.response?.data || "Something went wrong");
    }
  }
);

const employeeProfileSlice = createSlice({
  name: "employeeProfile",
  initialState,
  reducers: {
    clearEmployeeProfile(state) {
      state.data = null;
      state.error = null;
      state.loading = false;
    }
  },
  extraReducers: (builder) => {
    //fetch profile details
    builder
      .addCase(fetchEmployeeProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmployeeProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
      })
      .addCase(fetchEmployeeProfile.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      });

    //update profile details
    builder
      .addCase(updatePersonalDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePersonalDetails.fulfilled, (state, action) => {
        state.loading = false;
        if (state.data) {
          state.data.personalDetails = {
            ...state.data.personalDetails,
            ...action.payload.data,
          };
        }
      })
      .addCase(updatePersonalDetails.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      });
    //update profile title
    builder
      .addCase(updateProfileTitle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfileTitle.fulfilled, (state, action) => {
        state.loading = false;
        if (state.data && state.data.profileTitle?.length > 0) {
          state.data.profileTitle[0].title = action.payload.newTitle;
        }
      })
      .addCase(updateProfileTitle.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearEmployeeProfile } = employeeProfileSlice.actions;

export default employeeProfileSlice.reducer;
