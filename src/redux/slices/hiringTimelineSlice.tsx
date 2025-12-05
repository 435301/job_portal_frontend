import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import BASE_URL_JOB from "../../config/config";
import getAuthAdminHeaders from "../../utils/auth";

// MODEL
export interface HiringTimeline {
    id: number;
    title: string;
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

interface HiringTimelineState {
    loading: boolean;
    HiringTimelineList: HiringTimeline[];
    selectedHiringTimeline: HiringTimeline | null;
    error: string | null;
    pagination: Pagination;
}

const initialState: HiringTimelineState = {
    loading: false,
    HiringTimelineList: [],
    selectedHiringTimeline: null,
    error: null,
    pagination: {
        total: 0,
        pages: 1,
        page: 1,
    },
};

// THUNKS
export const createHiringTimeline = createAsyncThunk<HiringTimeline, any>(
    "hiringTimeline/create",
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${BASE_URL_JOB}/hiringTimeline/create`, formData, getAuthAdminHeaders(false));
            toast.success(response.data.message);
            return response.data.data;
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Something went wrong");
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

export const getAllHiringTimeline = createAsyncThunk<any, { page?: number; status?: string | number; search?: string, } | void>(
    "hiringTimeline/getAll",
    async (params = { page: 1, status: "", search: "", }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${BASE_URL_JOB}/hiringTimeline/list`, params, getAuthAdminHeaders());
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

export const getHiringTimelineById = createAsyncThunk<HiringTimeline, number>(
    "hiringTimeline/getById",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${BASE_URL_JOB}/hiringTimeline/${id}`, getAuthAdminHeaders());
            return response.data.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

export const updateHiringTimeline = createAsyncThunk<HiringTimeline, { id: number; updateData: HiringTimeline }>(
    "hiringTimeline/update",
    async ({ id, updateData }, { rejectWithValue }) => {
        try {
            const response = await axios.put(`${BASE_URL_JOB}/hiringTimeline/update/${id}`, updateData, getAuthAdminHeaders(false));
            toast.success(response.data.message);
            return response.data.data;
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to update Hiring Timeline");
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

export const deleteHiringTimeline = createAsyncThunk<number, number>(
    "hiringTimeline/delete",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.delete(`${BASE_URL_JOB}/hiringTimeline/delete/${id}`, getAuthAdminHeaders());
            toast.success(response.data.message);
            return id;
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to delete Hiring Timeline");
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

// SLICE
const HiringTimelineSlice = createSlice({
    name: "hiringTimeline",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            // CREATE
            .addCase(createHiringTimeline.pending, (state) => {
                state.loading = true;
            })
            .addCase(createHiringTimeline.fulfilled, (state, action: PayloadAction<HiringTimeline>) => {
                state.loading = false;
                state.HiringTimelineList.unshift(action.payload);
            })
            .addCase(createHiringTimeline.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // GET ALL
            .addCase(getAllHiringTimeline.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllHiringTimeline.fulfilled, (state, action) => {
                state.loading = false;

                // Correct backend mapping
                state.HiringTimelineList = action.payload.data.hiringTimelines;
                state.pagination.total = action.payload.data.pagination.total;
                state.pagination.pages = action.payload.data.pagination.pages;
                state.pagination.page = action.payload.data.pagination.page;
            })
            .addCase(getAllHiringTimeline.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // GET BY ID
            .addCase(getHiringTimelineById.pending, (state) => {
                state.loading = true;
            })
            .addCase(getHiringTimelineById.fulfilled, (state, action: PayloadAction<HiringTimeline>) => {
                state.loading = false;
                state.selectedHiringTimeline = action.payload;
            })
            .addCase(getHiringTimelineById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // UPDATE
            .addCase(updateHiringTimeline.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateHiringTimeline.fulfilled, (state, action: PayloadAction<HiringTimeline>) => {
                state.loading = false;
                state.HiringTimelineList = state.HiringTimelineList.map((HiringTimeline) =>
                    HiringTimeline.id === action.payload.id ? action.payload : HiringTimeline
                );
            })
            .addCase(updateHiringTimeline.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // DELETE
            .addCase(deleteHiringTimeline.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteHiringTimeline.fulfilled, (state, action: PayloadAction<number>) => {
                state.loading = false;
                state.HiringTimelineList = state.HiringTimelineList.filter((c) => c.id !== action.payload);
            })
            .addCase(deleteHiringTimeline.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default HiringTimelineSlice.reducer;
