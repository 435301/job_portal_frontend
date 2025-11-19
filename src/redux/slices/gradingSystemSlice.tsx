import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import BASE_URL_JOB from "../../config/config";
import getAuthAdminHeaders from "../../utils/auth";

// MODEL
export interface GradingSystem {
    id: number;
    gradingType: string;
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

interface GradingSystemState {
    loading: boolean;
    GradingSystemList: GradingSystem[];
    selectedGradingSystem: GradingSystem | null;
    error: string | null;
    pagination: Pagination;
}

const initialState: GradingSystemState = {
    loading: false,
    GradingSystemList: [],
    selectedGradingSystem: null,
    error: null,
    pagination: {
        total: 0,
        pages: 1,
        page: 1,
    },
};

// THUNKS
export const createGradingSystem = createAsyncThunk<GradingSystem, any>(
    "gradingType/create",
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${BASE_URL_JOB}/gradingType/create`, formData, getAuthAdminHeaders(false));
            toast.success(response.data.message);
            return response.data.data;
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Something went wrong");
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

export const getAllGradingSystem = createAsyncThunk<any, { page?: number; status?: string | number; search?: string, } | void>(
    "gradingType/getAll",
    async (params = { page: 1, status: 1, search: "", }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${BASE_URL_JOB}/gradingType/list`, params, getAuthAdminHeaders());
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

export const getGradingSystemById = createAsyncThunk<GradingSystem, number>(
    "gradingType/getById",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${BASE_URL_JOB}/gradingType/${id}`, getAuthAdminHeaders());
            return response.data.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

export const updateGradingSystem = createAsyncThunk<GradingSystem, { id: number; updateData: GradingSystem }>(
    "gradingType/update",
    async ({ id, updateData }, { rejectWithValue }) => {
        try {
            const response = await axios.put(`${BASE_URL_JOB}/gradingType/update/${id}`, updateData, getAuthAdminHeaders(false));
            toast.success(response.data.message);
            return response.data.data;
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to update Grading System");
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

export const deleteGradingSystem = createAsyncThunk<number, number>(
    "gradingType/delete",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.delete(`${BASE_URL_JOB}/gradingType/delete/${id}`, getAuthAdminHeaders());
            toast.success(response.data.message);
            return id;
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to delete Grading System");
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

// SLICE
const gradingSystemSlice = createSlice({
    name: "gradingType",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            // CREATE
            .addCase(createGradingSystem.pending, (state) => {
                state.loading = true;
            })
            .addCase(createGradingSystem.fulfilled, (state, action: PayloadAction<GradingSystem>) => {
                state.loading = false;
                state.GradingSystemList.unshift(action.payload);
            })
            .addCase(createGradingSystem.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // GET ALL
            .addCase(getAllGradingSystem.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllGradingSystem.fulfilled, (state, action) => {
                state.loading = false;

                // Correct backend mapping
                state.GradingSystemList = action.payload.data.gradingTypes;
                state.pagination.total = action.payload.data.pagination.total;
                state.pagination.pages = action.payload.data.pagination.pages;
                state.pagination.page = action.payload.data.pagination.page;
            })
            .addCase(getAllGradingSystem.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // GET BY ID
            .addCase(getGradingSystemById.pending, (state) => {
                state.loading = true;
            })
            .addCase(getGradingSystemById.fulfilled, (state, action: PayloadAction<GradingSystem>) => {
                state.loading = false;
                state.selectedGradingSystem = action.payload;
            })
            .addCase(getGradingSystemById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // UPDATE
            .addCase(updateGradingSystem.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateGradingSystem.fulfilled, (state, action: PayloadAction<GradingSystem>) => {
                state.loading = false;
                state.GradingSystemList = state.GradingSystemList.map((GradingSystem) =>
                    GradingSystem.id === action.payload.id ? action.payload : GradingSystem
                );
            })
            .addCase(updateGradingSystem.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // DELETE
            .addCase(deleteGradingSystem.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteGradingSystem.fulfilled, (state, action: PayloadAction<number>) => {
                state.loading = false;
                state.GradingSystemList = state.GradingSystemList.filter((c) => c.id !== action.payload);
            })
            .addCase(deleteGradingSystem.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default gradingSystemSlice.reducer;
