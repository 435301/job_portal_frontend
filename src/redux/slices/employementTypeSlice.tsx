import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import BASE_URL_JOB from "../../config/config";
import getAuthAdminHeaders from "../../utils/auth";

// MODEL
export interface EmploymentType {
    id: number;
    employmentType: string;
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

interface EmploymentTypeState {
    loading: boolean;
    EmploymentTypeList: EmploymentType[];
    selectedEmploymentType: EmploymentType | null;
    error: string | null;
    pagination: Pagination;
}

const initialState: EmploymentTypeState = {
    loading: false,
    EmploymentTypeList: [],
    selectedEmploymentType: null,
    error: null,
    pagination: {
        total: 0,
        pages: 1,
        page: 1,
    },
};

// THUNKS
export const createEmploymentType = createAsyncThunk<EmploymentType, any>(
    "employmentType/create",
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${BASE_URL_JOB}/employmentType/create`, formData, getAuthAdminHeaders(false));
            toast.success(response.data.message);
            return response.data.data;
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Something went wrong");
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

export const getAllEmploymentType = createAsyncThunk<any, { page?: number; status?: string | number; search?: string, } | void>(
    "employmentType/getAll",
    async (params = { page: 1, status: 1, search: "", }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${BASE_URL_JOB}/employmentType/list`, params, getAuthAdminHeaders());
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

export const getEmploymentTypeById = createAsyncThunk<EmploymentType, number>(
    "employmentType/getById",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${BASE_URL_JOB}/employmentType/${id}`, getAuthAdminHeaders());
            return response.data.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

export const updateEmploymentType = createAsyncThunk<EmploymentType, { id: number; updateData: EmploymentType }>(
    "employmentType/update",
    async ({ id, updateData }, { rejectWithValue }) => {
        try {
            const response = await axios.put(`${BASE_URL_JOB}/employmentType/update/${id}`, updateData, getAuthAdminHeaders(false));
            toast.success(response.data.message);
            return response.data.data;
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to update Employment Type");
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

export const deleteEmploymentType = createAsyncThunk<number, number>(
    "employmentType/delete",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.delete(`${BASE_URL_JOB}/employmentType/delete/${id}`, getAuthAdminHeaders());
            toast.success(response.data.message);
            return id;
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to delete Employment Type");
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

// SLICE
const geenderSlice = createSlice({
    name: "employmentType",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            // CREATE
            .addCase(createEmploymentType.pending, (state) => {
                state.loading = true;
            })
            .addCase(createEmploymentType.fulfilled, (state, action: PayloadAction<EmploymentType>) => {
                state.loading = false;
                state.EmploymentTypeList.unshift(action.payload);
            })
            .addCase(createEmploymentType.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // GET ALL
            .addCase(getAllEmploymentType.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllEmploymentType.fulfilled, (state, action) => {
                state.loading = false;

                // Correct backend mapping
                state.EmploymentTypeList = action.payload.data.employmentTypes;
                state.pagination.total = action.payload.data.pagination.total;
                state.pagination.pages = action.payload.data.pagination.pages;
                state.pagination.page = action.payload.data.pagination.page;
            })
            .addCase(getAllEmploymentType.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // GET BY ID
            .addCase(getEmploymentTypeById.pending, (state) => {
                state.loading = true;
            })
            .addCase(getEmploymentTypeById.fulfilled, (state, action: PayloadAction<EmploymentType>) => {
                state.loading = false;
                state.selectedEmploymentType = action.payload;
            })
            .addCase(getEmploymentTypeById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // UPDATE
            .addCase(updateEmploymentType.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateEmploymentType.fulfilled, (state, action: PayloadAction<EmploymentType>) => {
                state.loading = false;
                state.EmploymentTypeList = state.EmploymentTypeList.map((EmploymentType) =>
                    EmploymentType.id === action.payload.id ? action.payload : EmploymentType
                );
            })
            .addCase(updateEmploymentType.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // DELETE
            .addCase(deleteEmploymentType.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteEmploymentType.fulfilled, (state, action: PayloadAction<number>) => {
                state.loading = false;
                state.EmploymentTypeList = state.EmploymentTypeList.filter((c) => c.id !== action.payload);
            })
            .addCase(deleteEmploymentType.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default geenderSlice.reducer;
