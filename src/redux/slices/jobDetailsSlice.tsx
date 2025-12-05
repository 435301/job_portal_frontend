import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import BASE_URL_JOB from "../../config/config";
import getAuthAdminHeaders from "../../utils/auth";
import { toast } from "react-toastify";

//  Add Job Details
export const addJobDetails = createAsyncThunk(
    "job/addJobDetails",
    async (payload: any, { rejectWithValue }) => {
        try {
            const res = await axios.post(`${BASE_URL_JOB}/jobDetails/addJobDetails`, payload, getAuthAdminHeaders());
            toast.success(res.data.message);
            return res.data;
        } catch (err: any) {
            toast.error(err.response.data.message);
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

//  Add Candidate Requirement
export const addCandidateRequirement = createAsyncThunk(
    "job/addCandidateRequirement",
    async (
        { jobId, payload }: { jobId: number; payload: any },
        { rejectWithValue }
    ) => {
        try {
            const res = await axios.patch(
                `${BASE_URL_JOB}/jobDetails/addCandidateRequirement/${jobId}`,
                payload, getAuthAdminHeaders(false)
            );
            toast.success(res.data.message);
            return res.data;
        } catch (err: any) {
            toast.error(err.response.data.message);
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

//  Add Work Timings
export const addWorkTimings = createAsyncThunk(
    "job/addWorkTimings",
    async ({ jobId, timings }: { jobId: number; timings: string }, { rejectWithValue }) => {
        try {
            const res = await axios.patch(
                `${BASE_URL_JOB}/jobDetails/addWorkTimings/${jobId}`,
                { timings }, getAuthAdminHeaders()
            );
            toast.success(res.data.message);
            return res.data;
        } catch (err: any) {
            toast.error(err.response.data.message);
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

interface JobState {
    loading: boolean;
    error: string | null;
    success: string | null;
    jobData: any;
}

const initialState: JobState = {
    loading: false,
    error: null,
    success: null,
    jobData: null,
};

const jobSlice = createSlice({
    name: "job",
    initialState,
    reducers: {
        resetJobState: (state) => {
            state.error = null;
            state.success = null;
        },
    },
    extraReducers: (builder) => {
        // Add Job Details
        builder
            .addCase(addJobDetails.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = null;
            })
            .addCase(addJobDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.success = action.payload.message;
                state.jobData = action.payload.data;
            })
            .addCase(addJobDetails.rejected, (state, action: any) => {
                state.loading = false;
                state.error = action.payload;
            });

        // Candidate Requirement
        builder
            .addCase(addCandidateRequirement.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = null;
            })
            .addCase(addCandidateRequirement.fulfilled, (state, action) => {
                state.loading = false;
                state.success = action.payload.message;
                state.jobData = action.payload.data;
            })
            .addCase(addCandidateRequirement.rejected, (state, action: any) => {
                state.loading = false;
                state.error = action.payload;
            });

        // Work Timings
        builder
            .addCase(addWorkTimings.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = null;
            })
            .addCase(addWorkTimings.fulfilled, (state, action) => {
                state.loading = false;
                state.success = action.payload.message;
                state.jobData = action.payload.data;
            })
            .addCase(addWorkTimings.rejected, (state, action: any) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { resetJobState } = jobSlice.actions;
export default jobSlice.reducer;
