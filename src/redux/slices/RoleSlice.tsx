import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import BASE_URL_JOB from "../../config/config";
import getAuthAdminHeaders from "../../utils/auth";

// MODEL
export interface Role {
    id: number;
    role: string;
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

interface RoleState {
    loading: boolean;
    RoleList: Role[];
    selectedRole: Role | null;
    error: string | null;
    pagination: Pagination;
}

const initialState: RoleState = {
    loading: false,
    RoleList: [],
    selectedRole: null,
    error: null,
    pagination: {
        total: 0,
        pages: 1,
        page: 1,
    },
};

// THUNKS
export const createRole = createAsyncThunk<Role, any>(
    "role/create",
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${BASE_URL_JOB}/role/create`, formData, getAuthAdminHeaders(false));
            toast.success(response.data.message);
            return response.data.data;
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Something went wrong");
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

export const getAllRole = createAsyncThunk<any, { page?: number; status?: string | number; search?: string, } | void>(
    "role/getAll",
    async (params = { page: 1, status: 1, search: "", }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${BASE_URL_JOB}/role/list`, params, getAuthAdminHeaders());
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

export const getRoleById = createAsyncThunk<Role, number>(
    "role/getById",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${BASE_URL_JOB}/role/${id}`, getAuthAdminHeaders());
            return response.data.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

export const updateRole = createAsyncThunk<Role, { id: number; updateData: Role }>(
    "role/update",
    async ({ id, updateData }, { rejectWithValue }) => {
        try {
            const response = await axios.put(`${BASE_URL_JOB}/role/update/${id}`, updateData, getAuthAdminHeaders(false));
            toast.success(response.data.message);
            return response.data.data;
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to update role");
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

export const deleteRole = createAsyncThunk<number, number>(
    "role/delete",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.delete(`${BASE_URL_JOB}/role/delete/${id}`, getAuthAdminHeaders());
            toast.success(response.data.message);
            return id;
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to delete Role");
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

// SLICE
const RoleSlice = createSlice({
    name: "role",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            // CREATE
            .addCase(createRole.pending, (state) => {
                state.loading = true;
            })
            .addCase(createRole.fulfilled, (state, action: PayloadAction<Role>) => {
                state.loading = false;
                state.RoleList.unshift(action.payload);
            })
            .addCase(createRole.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // GET ALL
            .addCase(getAllRole.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllRole.fulfilled, (state, action) => {
                state.loading = false;

                // Correct backend mapping
                state.RoleList = action.payload.data.roles;
                state.pagination.total = action.payload.data.pagination.total;
                state.pagination.pages = action.payload.data.pagination.pages;
                state.pagination.page = action.payload.data.pagination.page;
            })
            .addCase(getAllRole.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // GET BY ID
            .addCase(getRoleById.pending, (state) => {
                state.loading = true;
            })
            .addCase(getRoleById.fulfilled, (state, action: PayloadAction<Role>) => {
                state.loading = false;
                state.selectedRole = action.payload;
            })
            .addCase(getRoleById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // UPDATE
            .addCase(updateRole.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateRole.fulfilled, (state, action: PayloadAction<Role>) => {
                state.loading = false;
                state.RoleList = state.RoleList.map((Role) =>
                    Role.id === action.payload.id ? action.payload : Role
                );
            })
            .addCase(updateRole.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // DELETE
            .addCase(deleteRole.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteRole.fulfilled, (state, action: PayloadAction<number>) => {
                state.loading = false;
                state.RoleList = state.RoleList.filter((c) => c.id !== action.payload);
            })
            .addCase(deleteRole.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default RoleSlice.reducer;
