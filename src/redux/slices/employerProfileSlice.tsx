import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import BASE_URL_JOB from "../../config/config";
import getAuthAdminHeaders from "../../utils/auth";
import { toast } from "react-toastify";

interface EmployerProfileState {
    loading: boolean;
    data: any | null;
    error: string | null;
    list: string[];
    companyLogo: null;

}

const initialState: EmployerProfileState = {
    loading: false,
    data: null,
    error: null,
    list: [],
    companyLogo: null,
};

const employerId = JSON.parse(localStorage.getItem("employer") ?? "{}")?.id;

export const fetchEmployerProfile = createAsyncThunk(
    "employer/profile",
    async (employerId: number, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${BASE_URL_JOB}/employer/profile/${employerId}`, getAuthAdminHeaders());
            return response.data; // {status, message, data}
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to fetch employee profile"
            );
        }
    }
);

export const uploadCompanyLogo = createAsyncThunk(
    "employer/uploadCompanyLogo",
    async (file: File, { rejectWithValue, dispatch }) => {
        try {
            const formData = new FormData();
            formData.append("companyLogo", file);
            const response = await axios.patch(`${BASE_URL_JOB}/employer/uploadCompanyLogo`, formData, getAuthAdminHeaders(true));
            toast.success(response.data.message);
            if (employerId) {
                await dispatch(fetchEmployerProfile(employerId));
            }
            return response.data;
        } catch (error: any) {
            toast.error(error.response?.data.message);
            return rejectWithValue(error.response?.data || "Upload failed");
        }
    }
);

const employerProfileSlice = createSlice({
    name: "employerProfile",
    initialState,
    reducers: {
        clearEmployerProfile(state) {
            state.data = null;
            state.error = null;
            state.loading = false;
        }
    },
    extraReducers: (builder) => {
        //fetch profile details
        builder
            .addCase(fetchEmployerProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchEmployerProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload.data;
            })
            .addCase(fetchEmployerProfile.rejected, (state, action: any) => {
                state.loading = false;
                state.error = action.payload;
            });
        builder
            .addCase(uploadCompanyLogo.fulfilled, (state, action) => {
                state.loading = false;
                state.companyLogo = action.payload.companyLogo;
            })
    }
});


export const { clearEmployerProfile } = employerProfileSlice.actions;

export default employerProfileSlice.reducer;