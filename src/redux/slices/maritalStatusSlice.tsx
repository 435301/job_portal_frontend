import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import BASE_URL_JOB from "../../config/config";
import getAuthAdminHeaders from "../../utils/auth";

// MODEL
export interface MaritalStatus {
    id: number;
    maritalStatus: string;
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

interface MaritalStatusState {
    loading: boolean;
    maritalStatusList: MaritalStatus[];
    selectedMaritalStatus: MaritalStatus | null;
    error: string | null;
    pagination: Pagination;
}

const initialState: MaritalStatusState = {
    loading: false,
    maritalStatusList: [],
    selectedMaritalStatus: null,
    error: null,
    pagination: {
        total: 0,
        pages: 1,
        page: 1,
    },
};

// THUNKS
export const createMaritalStatus = createAsyncThunk<MaritalStatus, any>(
    "maritalStatus/create",
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${BASE_URL_JOB}/maritalStatus/create`, formData, getAuthAdminHeaders(false));
            toast.success(response.data.message);
            return response.data.data;
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Something went wrong");
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

export const getAllMaritalStatus = createAsyncThunk<any, { page?: number; status?: string | number; search?: string, } | void>(
    "maritalStatus/getAll",
    async (params = { page: 1, status: 1, search: "", }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${BASE_URL_JOB}/maritalStatus/list`, params, getAuthAdminHeaders());
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

export const getMaritalStatusById = createAsyncThunk<MaritalStatus, number>(
    "maritalStatus/getById",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${BASE_URL_JOB}/maritalStatus/${id}`, getAuthAdminHeaders());
            return response.data.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

export const updateMaritalStatus = createAsyncThunk<MaritalStatus, { id: number; updateData: MaritalStatus }>(
    "maritalStatus/update",
    async ({ id, updateData }, { rejectWithValue }) => {
        try {
            const response = await axios.put(`${BASE_URL_JOB}/maritalStatus/update/${id}`, updateData, getAuthAdminHeaders(false));
            toast.success(response.data.message);
            return response.data.data;
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to update marital status");
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

export const deleteMaritalStatus = createAsyncThunk<number, number>(
    "maritalStatus/delete",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.delete(`${BASE_URL_JOB}/maritalStatus/delete/${id}`, getAuthAdminHeaders());
            toast.success(response.data.message);
            return id;
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to delete marital status");
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

// SLICE
const courseTypeSlice = createSlice({
    name: "maritalStatus",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            // CREATE
            .addCase(createMaritalStatus.pending, (state) => {
                state.loading = true;
            })
            .addCase(createMaritalStatus.fulfilled, (state, action: PayloadAction<MaritalStatus>) => {
                state.loading = false;
                state.maritalStatusList.unshift(action.payload);
            })
            .addCase(createMaritalStatus.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // GET ALL
            .addCase(getAllMaritalStatus.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllMaritalStatus.fulfilled, (state, action) => {
                state.loading = false;

                // Correct backend mapping
                state.maritalStatusList = action.payload.data.maritalStatuses;
                state.pagination.total = action.payload.data.pagination.total;
                state.pagination.pages = action.payload.data.pagination.pages;
                state.pagination.page = action.payload.data.pagination.page;
            })
            .addCase(getAllMaritalStatus.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // GET BY ID
            .addCase(getMaritalStatusById.pending, (state) => {
                state.loading = true;
            })
            .addCase(getMaritalStatusById.fulfilled, (state, action: PayloadAction<MaritalStatus>) => {
                state.loading = false;
                state.selectedMaritalStatus = action.payload;
            })
            .addCase(getMaritalStatusById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // UPDATE
            .addCase(updateMaritalStatus.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateMaritalStatus.fulfilled, (state, action: PayloadAction<MaritalStatus>) => {
                state.loading = false;
                state.maritalStatusList = state.maritalStatusList.map((course) =>
                    course.id === action.payload.id ? action.payload : course
                );
            })
            .addCase(updateMaritalStatus.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // DELETE
            .addCase(deleteMaritalStatus.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteMaritalStatus.fulfilled, (state, action: PayloadAction<number>) => {
                state.loading = false;
                state.maritalStatusList = state.maritalStatusList.filter((c) => c.id !== action.payload);
            })
            .addCase(deleteMaritalStatus.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default courseTypeSlice.reducer;
