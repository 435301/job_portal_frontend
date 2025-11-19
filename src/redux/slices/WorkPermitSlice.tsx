import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import BASE_URL_JOB from "../../config/config";
import getAuthAdminHeaders from "../../utils/auth";

// MODEL
export interface WorkPermit {
    id: number;
    workPermit: string;
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

interface WorkPermitState {
    loading: boolean;
    WorkPermitList: WorkPermit[];
    selectedWorkPermit: WorkPermit | null;
    error: string | null;
    pagination: Pagination;
}

const initialState: WorkPermitState = {
    loading: false,
    WorkPermitList: [],
    selectedWorkPermit: null,
    error: null,
    pagination: {
        total: 0,
        pages: 1,
        page: 1,
    },
};

// THUNKS
export const createWorkPermit = createAsyncThunk<WorkPermit, any>(
    "workPermit/create",
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${BASE_URL_JOB}/workPermit/create`, formData, getAuthAdminHeaders(false));
            toast.success(response.data.message);
            return response.data.data;
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Something went wrong");
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

export const getAllWorkPermit = createAsyncThunk<any, { page?: number; status?: string | number; search?: string, } | void>(
    "workPermit/getAll",
    async (params = { page: 1, status: 1, search: "", }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${BASE_URL_JOB}/workPermit/list`, params, getAuthAdminHeaders());
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

export const getWorkPermitById = createAsyncThunk<WorkPermit, number>(
    "workPermit/getById",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${BASE_URL_JOB}/workPermit/${id}`, getAuthAdminHeaders());
            return response.data.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

export const updateWorkPermit = createAsyncThunk<WorkPermit, { id: number; updateData: WorkPermit }>(
    "workPermit/update",
    async ({ id, updateData }, { rejectWithValue }) => {
        try {
            const response = await axios.put(`${BASE_URL_JOB}/workPermit/update/${id}`, updateData, getAuthAdminHeaders(false));
            toast.success(response.data.message);
            return response.data.data;
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to update Work Permit");
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

export const deleteWorkPermit = createAsyncThunk<number, number>(
    "workPermit/delete",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.delete(`${BASE_URL_JOB}/workPermit/delete/${id}`, getAuthAdminHeaders());
            toast.success(response.data.message);
            return id;
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to delete Work Permit");
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

// SLICE
const workPermitSlice = createSlice({
    name: "workPermit",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            // CREATE
            .addCase(createWorkPermit.pending, (state) => {
                state.loading = true;
            })
            .addCase(createWorkPermit.fulfilled, (state, action: PayloadAction<WorkPermit>) => {
                state.loading = false;
                state.WorkPermitList.unshift(action.payload);
            })
            .addCase(createWorkPermit.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // GET ALL
            .addCase(getAllWorkPermit.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllWorkPermit.fulfilled, (state, action) => {
                state.loading = false;

                // Correct backend mapping
                state.WorkPermitList = action.payload.data.workPermit;
                state.pagination.total = action.payload.data.pagination.total;
                state.pagination.pages = action.payload.data.pagination.pages;
                state.pagination.page = action.payload.data.pagination.page;
            })
            .addCase(getAllWorkPermit.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // GET BY ID
            .addCase(getWorkPermitById.pending, (state) => {
                state.loading = true;
            })
            .addCase(getWorkPermitById.fulfilled, (state, action: PayloadAction<WorkPermit>) => {
                state.loading = false;
                state.selectedWorkPermit = action.payload;
            })
            .addCase(getWorkPermitById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // UPDATE
            .addCase(updateWorkPermit.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateWorkPermit.fulfilled, (state, action: PayloadAction<WorkPermit>) => {
                state.loading = false;
                state.WorkPermitList = state.WorkPermitList.map((WorkPermit) =>
                    WorkPermit.id === action.payload.id ? action.payload : WorkPermit
                );
            })
            .addCase(updateWorkPermit.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // DELETE
            .addCase(deleteWorkPermit.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteWorkPermit.fulfilled, (state, action: PayloadAction<number>) => {
                state.loading = false;
                state.WorkPermitList = state.WorkPermitList.filter((c) => c.id !== action.payload);
            })
            .addCase(deleteWorkPermit.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default workPermitSlice.reducer;
