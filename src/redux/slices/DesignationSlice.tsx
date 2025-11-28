import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import BASE_URL_JOB from "../../config/config";
import getAuthAdminHeaders from "../../utils/auth";

// MODEL
export interface Designation {
    id: number;
    designation: string;
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

interface DesignationState {
    loading: boolean;
    DesignationList: Designation[];
    selectedDesignation: Designation | null;
    error: string | null;
    pagination: Pagination;
}

const initialState: DesignationState = {
    loading: false,
    DesignationList: [],
    selectedDesignation: null,
    error: null,
    pagination: {
        total: 0,
        pages: 1,
        page: 1,
    },
};

// THUNKS
export const createDesignation = createAsyncThunk<Designation, any>(
    "designation/create",
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${BASE_URL_JOB}/designation/create`, formData, getAuthAdminHeaders(false));
            toast.success(response.data.message);
            return response.data.data;
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Something went wrong");
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

export const getAllDesignation = createAsyncThunk<any, { page?: number; status?: string | number; search?: string, } | void>(
    "designation/getAll",
    async (params = { page: 1, status: 1, search: "", }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${BASE_URL_JOB}/designation/list`, params, getAuthAdminHeaders());
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

export const getDesignationById = createAsyncThunk<Designation, number>(
    "designation/getById",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${BASE_URL_JOB}/designation/${id}`, getAuthAdminHeaders());
            return response.data.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

export const updateDesignation = createAsyncThunk<Designation, { id: number; updateData: Designation }>(
    "designation/update",
    async ({ id, updateData }, { rejectWithValue }) => {
        try {
            const response = await axios.put(`${BASE_URL_JOB}/designation/update/${id}`, updateData, getAuthAdminHeaders(false));
            toast.success(response.data.message);
            return response.data.data;
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to update designation");
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

export const deleteDesignation = createAsyncThunk<number, number>(
    "designation/delete",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.delete(`${BASE_URL_JOB}/designation/delete/${id}`, getAuthAdminHeaders());
            toast.success(response.data.message);
            return id;
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to delete designation");
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

// SLICE
const DesignationSlice = createSlice({
    name: "designation",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            // CREATE
            .addCase(createDesignation.pending, (state) => {
                state.loading = true;
            })
            .addCase(createDesignation.fulfilled, (state, action: PayloadAction<Designation>) => {
                state.loading = false;
                state.DesignationList.unshift(action.payload);
            })
            .addCase(createDesignation.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // GET ALL
            .addCase(getAllDesignation.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllDesignation.fulfilled, (state, action) => {
                state.loading = false;

                // Correct backend mapping
                state.DesignationList = action.payload.data.designations;
                state.pagination.total = action.payload.data.pagination.total;
                state.pagination.pages = action.payload.data.pagination.pages;
                state.pagination.page = action.payload.data.pagination.page;
            })
            .addCase(getAllDesignation.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // GET BY ID
            .addCase(getDesignationById.pending, (state) => {
                state.loading = true;
            })
            .addCase(getDesignationById.fulfilled, (state, action: PayloadAction<Designation>) => {
                state.loading = false;
                state.selectedDesignation = action.payload;
            })
            .addCase(getDesignationById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // UPDATE
            .addCase(updateDesignation.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateDesignation.fulfilled, (state, action: PayloadAction<Designation>) => {
                state.loading = false;
                state.DesignationList = state.DesignationList.map((Designation) =>
                    Designation.id === action.payload.id ? action.payload : Designation
                );
            })
            .addCase(updateDesignation.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // DELETE
            .addCase(deleteDesignation.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteDesignation.fulfilled, (state, action: PayloadAction<number>) => {
                state.loading = false;
                state.DesignationList = state.DesignationList.filter((c) => c.id !== action.payload);
            })
            .addCase(deleteDesignation.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default DesignationSlice.reducer;
