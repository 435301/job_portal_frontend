import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import BASE_URL_JOB from "../../config/config";
import getAuthAdminHeaders from "../../utils/auth";

// MODEL
export interface CompanyType {
    id: number;
    companyType: string;
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

interface CompanyTypeState {
    loading: boolean;
    CompanyTypeList: CompanyType[];
    selectedCompanyType: CompanyType | null;
    error: string | null;
    pagination: Pagination;
}

const initialState: CompanyTypeState = {
    loading: false,
    CompanyTypeList: [],
    selectedCompanyType: null,
    error: null,
    pagination: {
        total: 0,
        pages: 1,
        page: 1,
    },
};

// THUNKS
export const createCompanyType = createAsyncThunk<CompanyType, any>(
    "companyType/create",
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${BASE_URL_JOB}/companyType/create`, formData, getAuthAdminHeaders(false));
            toast.success(response.data.message);
            return response.data.data;
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Something went wrong");
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

export const getAllCompanyType = createAsyncThunk<any, { page?: number; status?: string | number; search?: string, } | void>(
    "companyType/getAll",
    async (params = { page: 1, status: 1, search: "", }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${BASE_URL_JOB}/companyType/list`, params, getAuthAdminHeaders());
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

export const getCompanyTypeById = createAsyncThunk<CompanyType, number>(
    "companyType/getById",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${BASE_URL_JOB}/companyType/${id}`, getAuthAdminHeaders());
            return response.data.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

export const updateCompanyType = createAsyncThunk<CompanyType, { id: number; updateData: CompanyType }>(
    "companyType/update",
    async ({ id, updateData }, { rejectWithValue }) => {
        try {
            const response = await axios.put(`${BASE_URL_JOB}/companyType/update/${id}`, updateData, getAuthAdminHeaders(false));
            toast.success(response.data.message);
            return response.data.data;
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to update Company Type");
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

export const deleteCompanyType = createAsyncThunk<number, number>(
    "companyType/delete",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.delete(`${BASE_URL_JOB}/companyType/delete/${id}`, getAuthAdminHeaders());
            toast.success(response.data.message);
            return id;
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to delete Company Type");
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

// SLICE
const CompanyTypeSlice = createSlice({
    name: "companyType",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            // CREATE
            .addCase(createCompanyType.pending, (state) => {
                state.loading = true;
            })
            .addCase(createCompanyType.fulfilled, (state, action: PayloadAction<CompanyType>) => {
                state.loading = false;
                state.CompanyTypeList.unshift(action.payload);
            })
            .addCase(createCompanyType.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // GET ALL
            .addCase(getAllCompanyType.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllCompanyType.fulfilled, (state, action) => {
                state.loading = false;

                // Correct backend mapping
                state.CompanyTypeList = action.payload.data.companyTypes;
                state.pagination.total = action.payload.data.pagination.total;
                state.pagination.pages = action.payload.data.pagination.pages;
                state.pagination.page = action.payload.data.pagination.page;
            })
            .addCase(getAllCompanyType.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // GET BY ID
            .addCase(getCompanyTypeById.pending, (state) => {
                state.loading = true;
            })
            .addCase(getCompanyTypeById.fulfilled, (state, action: PayloadAction<CompanyType>) => {
                state.loading = false;
                state.selectedCompanyType = action.payload;
            })
            .addCase(getCompanyTypeById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // UPDATE
            .addCase(updateCompanyType.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateCompanyType.fulfilled, (state, action: PayloadAction<CompanyType>) => {
                state.loading = false;
                state.CompanyTypeList = state.CompanyTypeList.map((CompanyType) =>
                    CompanyType.id === action.payload.id ? action.payload : CompanyType
                );
            })
            .addCase(updateCompanyType.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // DELETE
            .addCase(deleteCompanyType.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteCompanyType.fulfilled, (state, action: PayloadAction<number>) => {
                state.loading = false;
                state.CompanyTypeList = state.CompanyTypeList.filter((c) => c.id !== action.payload);
            })
            .addCase(deleteCompanyType.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default CompanyTypeSlice.reducer;
