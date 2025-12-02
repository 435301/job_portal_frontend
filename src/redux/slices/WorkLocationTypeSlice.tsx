import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import BASE_URL_JOB from "../../config/config";
import getAuthAdminHeaders from "../../utils/auth";

// MODEL
export interface WorkLocationType {
    id: number;
    workLocationType: string;
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

interface WorkLocationTypeState {
    loading: boolean;
    WorkLocationTypeList: WorkLocationType[];
    selectedWorkLocationType: WorkLocationType | null;
    error: string | null;
    pagination: Pagination;
}

const initialState: WorkLocationTypeState = {
    loading: false,
    WorkLocationTypeList: [],
    selectedWorkLocationType: null,
    error: null,
    pagination: {
        total: 0,
        pages: 1,
        page: 1,
    },
};

// THUNKS
export const createWorkLocationType = createAsyncThunk<WorkLocationType, any>(
    "workLocationType/create",
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${BASE_URL_JOB}/workLocationType/create`, formData, getAuthAdminHeaders(false));
            toast.success(response.data.message);
            return response.data.data;
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Something went wrong");
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

export const getAllWorkLocationType = createAsyncThunk<any, { page?: number; status?: string | number; search?: string, } | void>(
    "workLocationType/getAll",
    async (params = { page: 1, status: 1, search: "", }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${BASE_URL_JOB}/workLocationType/list`, params, getAuthAdminHeaders());
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

export const getWorkLocationTypeById = createAsyncThunk<WorkLocationType, number>(
    "workLocationType/getById",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${BASE_URL_JOB}/workLocationType/${id}`, getAuthAdminHeaders());
            return response.data.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

export const updateWorkLocationType = createAsyncThunk<WorkLocationType, { id: number; updateData: WorkLocationType }>(
    "workLocationType/update",
    async ({ id, updateData }, { rejectWithValue }) => {
        try {
            const response = await axios.put(`${BASE_URL_JOB}/workLocationType/update/${id}`, updateData, getAuthAdminHeaders(false));
            toast.success(response.data.message);
            return response.data.data;
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to update work location type");
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

export const deleteWorkLocationType = createAsyncThunk<number, number>(
    "workLocationType/delete",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.delete(`${BASE_URL_JOB}/workLocationType/delete/${id}`, getAuthAdminHeaders());
            toast.success(response.data.message);
            return id;
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to delete work location type");
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

// SLICE
const WorkLocationTypeSlice = createSlice({
    name: "workLocationType",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            // CREATE
            .addCase(createWorkLocationType.pending, (state) => {
                state.loading = true;
            })
            .addCase(createWorkLocationType.fulfilled, (state, action: PayloadAction<WorkLocationType>) => {
                state.loading = false;
                state.WorkLocationTypeList.unshift(action.payload);
            })
            .addCase(createWorkLocationType.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // GET ALL
            .addCase(getAllWorkLocationType.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllWorkLocationType.fulfilled, (state, action) => {
                state.loading = false;

                // Correct backend mapping
                state.WorkLocationTypeList = action.payload.data.workLocationTypes;
                state.pagination.total = action.payload.data.pagination.total;
                state.pagination.pages = action.payload.data.pagination.pages;
                state.pagination.page = action.payload.data.pagination.page;
            })
            .addCase(getAllWorkLocationType.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // GET BY ID
            .addCase(getWorkLocationTypeById.pending, (state) => {
                state.loading = true;
            })
            .addCase(getWorkLocationTypeById.fulfilled, (state, action: PayloadAction<WorkLocationType>) => {
                state.loading = false;
                state.selectedWorkLocationType = action.payload;
            })
            .addCase(getWorkLocationTypeById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // UPDATE
            .addCase(updateWorkLocationType.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateWorkLocationType.fulfilled, (state, action: PayloadAction<WorkLocationType>) => {
                state.loading = false;
                state.WorkLocationTypeList = state.WorkLocationTypeList.map((WorkLocationType) =>
                    WorkLocationType.id === action.payload.id ? action.payload : WorkLocationType
                );
            })
            .addCase(updateWorkLocationType.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // DELETE
            .addCase(deleteWorkLocationType.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteWorkLocationType.fulfilled, (state, action: PayloadAction<number>) => {
                state.loading = false;
                state.WorkLocationTypeList = state.WorkLocationTypeList.filter((c) => c.id !== action.payload);
            })
            .addCase(deleteWorkLocationType.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default WorkLocationTypeSlice.reducer;
