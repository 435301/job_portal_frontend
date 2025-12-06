import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import BASE_URL_JOB from "../../config/config";
import getAuthAdminHeaders from "../../utils/auth";

// MODEL
export interface Timings {
    id: number;
    timings: string;
    timeZone: string;
    status: number;
    ipAddress: string;
    createdBy?: number;
    updatedBy?: number;
    createdAt?: string;
    updatedAt?: string;
    trash?: number;
}

interface Pagination {
    total: number;
    pages: number;
    page: number;
}

interface TimingsState {
    loading: boolean;
    TimingsList: Timings[];
    selectedTimings: Timings | null;
    error: string | null;
    pagination: Pagination;
}

const initialState: TimingsState = {
    loading: false,
    TimingsList: [],
    selectedTimings: null,
    error: null,
    pagination: {
        total: 0,
        pages: 1,
        page: 1,
    },
};

// THUNKS
export const createTimings = createAsyncThunk<Timings, any>(
    "timings/create",
    async (formData, { rejectWithValue, dispatch }) => {
        try {
            const response = await axios.post(`${BASE_URL_JOB}/timings/create`, formData, getAuthAdminHeaders(false));
            toast.success(response.data.message);
            dispatch(getAllTimings());
            return response.data.data;
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Something went wrong");
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

export const getAllTimings = createAsyncThunk<any, { page?: number; status?: string | number; search?: string, } | void>(
    "timings/getAll",
    async (params = { page: 1, status: 1, search: "", }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${BASE_URL_JOB}/timings/list`, params, getAuthAdminHeaders());
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

export const getTimingsById = createAsyncThunk<Timings, number>(
    "timings/getById",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${BASE_URL_JOB}/timings/${id}`, getAuthAdminHeaders());
            return response.data.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

export const updateTimings = createAsyncThunk<Timings, { id: number; updateData: Timings }>(
    "timings/update",
    async ({ id, updateData }, { rejectWithValue, dispatch }) => {
        try {
            const response = await axios.put(`${BASE_URL_JOB}/timings/update/${id}`, updateData, getAuthAdminHeaders(false));
            toast.success(response.data.message);
            return response.data.data;
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to update timings");
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

export const deleteTimings = createAsyncThunk<number, number>(
    "timings/delete",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.delete(`${BASE_URL_JOB}/timings/delete/${id}`, getAuthAdminHeaders());
            toast.success(response.data.message);
            return id;
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to delete timings");
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

// SLICE
const TimingsSlice = createSlice({
    name: "timings",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            // CREATE
            .addCase(createTimings.pending, (state) => {
                state.loading = true;
            })
            .addCase(createTimings.fulfilled, (state, action: PayloadAction<Timings>) => {
                state.loading = false;
                state.TimingsList.unshift(action.payload);
            })
            .addCase(createTimings.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // GET ALL
            .addCase(getAllTimings.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllTimings.fulfilled, (state, action) => {
                state.loading = false;

                // Correct backend mapping
                state.TimingsList = action.payload.data.timings;
                state.pagination.total = action.payload.data.pagination.total;
                state.pagination.pages = action.payload.data.pagination.pages;
                state.pagination.page = action.payload.data.pagination.page;
            })
            .addCase(getAllTimings.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // GET BY ID
            .addCase(getTimingsById.pending, (state) => {
                state.loading = true;
            })
            .addCase(getTimingsById.fulfilled, (state, action: PayloadAction<Timings>) => {
                state.loading = false;
                state.selectedTimings = action.payload;
            })
            .addCase(getTimingsById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // UPDATE
            .addCase(updateTimings.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateTimings.fulfilled, (state, action: PayloadAction<Timings>) => {
                state.loading = false;
                state.TimingsList = state.TimingsList.map((Timings) =>
                    Timings.id === action.payload.id ? action.payload : Timings
                );
            })
            .addCase(updateTimings.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // DELETE
            .addCase(deleteTimings.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteTimings.fulfilled, (state, action: PayloadAction<number>) => {
                state.loading = false;
                state.TimingsList = state.TimingsList.filter((c) => c.id !== action.payload);
            })
            .addCase(deleteTimings.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default TimingsSlice.reducer;
