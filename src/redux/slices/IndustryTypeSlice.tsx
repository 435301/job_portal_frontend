import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import BASE_URL_JOB from "../../config/config";
import getAuthAdminHeaders from "../../utils/auth";

// MODEL
export interface IndustryType {
    id: number;
    industryType: string;
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

interface IndustryTypeState {
    loading: boolean;
    IndustryTypeList: IndustryType[];
    selectedIndustryType: IndustryType | null;
    error: string | null;
    pagination: Pagination;
}

const initialState: IndustryTypeState = {
    loading: false,
    IndustryTypeList: [],
    selectedIndustryType: null,
    error: null,
    pagination: {
        total: 0,
        pages: 1,
        page: 1,
    },
};

// THUNKS
export const createIndustryType = createAsyncThunk<IndustryType, any>(
    "industryType/create",
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${BASE_URL_JOB}/industryType/create`, formData, getAuthAdminHeaders(false));
            toast.success(response.data.message);
            return response.data.data;
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Something went wrong");
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

export const getAllIndustryType = createAsyncThunk<any, { page?: number; status?: string | number; search?: string, } | void>(
    "industryType/getAll",
    async (params = { page: 1, status: 1, search: "", }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${BASE_URL_JOB}/industryType/list`, params, getAuthAdminHeaders());
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

export const getIndustryTypeById = createAsyncThunk<IndustryType, number>(
    "industryType/getById",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${BASE_URL_JOB}/industryType/${id}`, getAuthAdminHeaders());
            return response.data.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

export const updateIndustryType = createAsyncThunk<IndustryType, { id: number; updateData: IndustryType }>(
    "industryType/update",
    async ({ id, updateData }, { rejectWithValue }) => {
        try {
            const response = await axios.put(`${BASE_URL_JOB}/industryType/update/${id}`, updateData, getAuthAdminHeaders(false));
            toast.success(response.data.message);
            return response.data.data;
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to update Industry Type");
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

export const deleteIndustryType = createAsyncThunk<number, number>(
    "industryType/delete",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.delete(`${BASE_URL_JOB}/industryType/delete/${id}`, getAuthAdminHeaders());
            toast.success(response.data.message);
            return id;
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to delete Industry Type");
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

// SLICE
const IndustryTypeSlice = createSlice({
    name: "industryType",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            // CREATE
            .addCase(createIndustryType.pending, (state) => {
                state.loading = true;
            })
            .addCase(createIndustryType.fulfilled, (state, action: PayloadAction<IndustryType>) => {
                state.loading = false;
                state.IndustryTypeList.unshift(action.payload);
            })
            .addCase(createIndustryType.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // GET ALL
            .addCase(getAllIndustryType.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllIndustryType.fulfilled, (state, action) => {
                state.loading = false;

                // Correct backend mapping
                state.IndustryTypeList = action.payload.data.industryTypes;
                state.pagination.total = action.payload.data.pagination.total;
                state.pagination.pages = action.payload.data.pagination.pages;
                state.pagination.page = action.payload.data.pagination.page;
            })
            .addCase(getAllIndustryType.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // GET BY ID
            .addCase(getIndustryTypeById.pending, (state) => {
                state.loading = true;
            })
            .addCase(getIndustryTypeById.fulfilled, (state, action: PayloadAction<IndustryType>) => {
                state.loading = false;
                state.selectedIndustryType = action.payload;
            })
            .addCase(getIndustryTypeById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // UPDATE
            .addCase(updateIndustryType.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateIndustryType.fulfilled, (state, action: PayloadAction<IndustryType>) => {
                state.loading = false;
                state.IndustryTypeList = state.IndustryTypeList.map((IndustryType) =>
                    IndustryType.id === action.payload.id ? action.payload : IndustryType
                );
            })
            .addCase(updateIndustryType.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // DELETE
            .addCase(deleteIndustryType.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteIndustryType.fulfilled, (state, action: PayloadAction<number>) => {
                state.loading = false;
                state.IndustryTypeList = state.IndustryTypeList.filter((c) => c.id !== action.payload);
            })
            .addCase(deleteIndustryType.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default IndustryTypeSlice.reducer;
