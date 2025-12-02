import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import BASE_URL_JOB from "../../config/config";
import getAuthAdminHeaders from "../../utils/auth";

// MODEL
export interface OrganizationSize {
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

interface OrganizationSizeState {
    loading: boolean;
    OrganizationSizeList: OrganizationSize[];
    selectedOrganizationSize: OrganizationSize | null;
    error: string | null;
    pagination: Pagination;
}

const initialState: OrganizationSizeState = {
    loading: false,
    OrganizationSizeList: [],
    selectedOrganizationSize: null,
    error: null,
    pagination: {
        total: 0,
        pages: 1,
        page: 1,
    },
};

// THUNKS
export const createOrganizationSize = createAsyncThunk<OrganizationSize, any>(
    "sizeOfORganization/create",
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${BASE_URL_JOB}/sizeOfORganization/create`, formData, getAuthAdminHeaders(false));
            toast.success(response.data.message);
            return response.data.data;
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Something went wrong");
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

export const getAllOrganizationSize = createAsyncThunk<any, { page?: number; status?: string | number; search?: string, } | void>(
    "sizeOfORganization/getAll",
    async (params = { page: 1, status: 1, search: "", }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${BASE_URL_JOB}/sizeOfORganization/list`, params, getAuthAdminHeaders());
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

export const getOrganizationSizeById = createAsyncThunk<OrganizationSize, number>(
    "sizeOfORganization/getById",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${BASE_URL_JOB}/sizeOfORganization/${id}`, getAuthAdminHeaders());
            return response.data.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

export const updateOrganizationSize = createAsyncThunk<OrganizationSize, { id: number; updateData: OrganizationSize }>(
    "sizeOfORganization/update",
    async ({ id, updateData }, { rejectWithValue }) => {
        try {
            const response = await axios.put(`${BASE_URL_JOB}/sizeOfORganization/update/${id}`, updateData, getAuthAdminHeaders(false));
            toast.success(response.data.message);
            return response.data.data;
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to update size Of organization");
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

export const deleteOrganizationSize = createAsyncThunk<number, number>(
    "sizeOfORganization/delete",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.delete(`${BASE_URL_JOB}/sizeOfORganization/delete/${id}`, getAuthAdminHeaders());
            toast.success(response.data.message);
            return id;
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to delete size Of organization");
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

// SLICE
const OrganizationSizeSlice = createSlice({
    name: "sizeOfORganization",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            // CREATE
            .addCase(createOrganizationSize.pending, (state) => {
                state.loading = true;
            })
            .addCase(createOrganizationSize.fulfilled, (state, action: PayloadAction<OrganizationSize>) => {
                state.loading = false;
                state.OrganizationSizeList.unshift(action.payload);
            })
            .addCase(createOrganizationSize.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // GET ALL
            .addCase(getAllOrganizationSize.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllOrganizationSize.fulfilled, (state, action) => {
                state.loading = false;

                // Correct backend mapping
                state.OrganizationSizeList = action.payload.data.sizeOfOrganizations;
                state.pagination.total = action.payload.data.pagination.total;
                state.pagination.pages = action.payload.data.pagination.pages;
                state.pagination.page = action.payload.data.pagination.page;
            })
            .addCase(getAllOrganizationSize.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // GET BY ID
            .addCase(getOrganizationSizeById.pending, (state) => {
                state.loading = true;
            })
            .addCase(getOrganizationSizeById.fulfilled, (state, action: PayloadAction<OrganizationSize>) => {
                state.loading = false;
                state.selectedOrganizationSize = action.payload;
            })
            .addCase(getOrganizationSizeById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // UPDATE
            .addCase(updateOrganizationSize.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateOrganizationSize.fulfilled, (state, action: PayloadAction<OrganizationSize>) => {
                state.loading = false;
                state.OrganizationSizeList = state.OrganizationSizeList.map((OrganizationSize) =>
                    OrganizationSize.id === action.payload.id ? action.payload : OrganizationSize
                );
            })
            .addCase(updateOrganizationSize.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // DELETE
            .addCase(deleteOrganizationSize.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteOrganizationSize.fulfilled, (state, action: PayloadAction<number>) => {
                state.loading = false;
                state.OrganizationSizeList = state.OrganizationSizeList.filter((c) => c.id !== action.payload);
            })
            .addCase(deleteOrganizationSize.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default OrganizationSizeSlice.reducer;
