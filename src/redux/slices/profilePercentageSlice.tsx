import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import BASE_URL_JOB from "../../config/config";
import getAuthAdminHeaders from "../../utils/auth";

// MODEL
export interface ProfilePercentage {
    id: number;
    title: string;
    percentage: number;
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

interface ProfilePercentageState {
    loading: boolean;
    ProfilePercentageList: ProfilePercentage[];
    selectedProfilePercentage: ProfilePercentage | null;
    error: string | null;
    pagination: Pagination;
}

const initialState: ProfilePercentageState = {
    loading: false,
    ProfilePercentageList: [],
    selectedProfilePercentage: null,
    error: null,
    pagination: {
        total: 0,
        pages: 1,
        page: 1,
    },
};

// THUNKS
export const createProfilePercentage = createAsyncThunk<ProfilePercentage, any>(
    "profilePerceentage/create",
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${BASE_URL_JOB}/profilePerceentage/create`, formData, getAuthAdminHeaders(false));
            toast.success(response.data.message);
            return response.data.data;
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Something went wrong");
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

export const getAllProfilePercentage = createAsyncThunk<any, { page?: number; status?: string | number; search?: string, } | void>(
    "profilePerceentage/getAll",
    async (params = { page: 1, status: 1, search: "", }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${BASE_URL_JOB}/profilePerceentage/list`, params, getAuthAdminHeaders());
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

export const getProfilePercentageById = createAsyncThunk<ProfilePercentage, number>(
    "profilePerceentage/getById",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${BASE_URL_JOB}/profilePerceentage/${id}`, getAuthAdminHeaders());
            return response.data.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

export const updateProfilePercentage = createAsyncThunk<ProfilePercentage, { id: number; updateData: ProfilePercentage }>(
    "profilePerceentage/update",
    async ({ id, updateData }, { rejectWithValue }) => {
        try {
            const response = await axios.put(`${BASE_URL_JOB}/profilePerceentage/update/${id}`, updateData, getAuthAdminHeaders(false));
            toast.success(response.data.message);
            return response.data.data;
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to update profile perceentage");
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

export const deleteProfilePercentage = createAsyncThunk<number, number>(
    "profilePerceentage/delete",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.delete(`${BASE_URL_JOB}/profilePerceentage/delete/${id}`, getAuthAdminHeaders());
            toast.success(response.data.message);
            return id;
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to delete profile perceentage");
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

// SLICE
const ProfilePercentageSlice = createSlice({
    name: "profilePerceentage",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            // CREATE
            .addCase(createProfilePercentage.pending, (state) => {
                state.loading = true;
            })
            .addCase(createProfilePercentage.fulfilled, (state, action: PayloadAction<ProfilePercentage>) => {
                state.loading = false;
                state.ProfilePercentageList.unshift(action.payload);
            })
            .addCase(createProfilePercentage.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // GET ALL
            .addCase(getAllProfilePercentage.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllProfilePercentage.fulfilled, (state, action) => {
                state.loading = false;

                // Correct backend mapping
                state.ProfilePercentageList = action.payload.data.profilePercentage;
                state.pagination.total = action.payload.data.pagination.total;
                state.pagination.pages = action.payload.data.pagination.pages;
                state.pagination.page = action.payload.data.pagination.page;
            })
            .addCase(getAllProfilePercentage.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // GET BY ID
            .addCase(getProfilePercentageById.pending, (state) => {
                state.loading = true;
            })
            .addCase(getProfilePercentageById.fulfilled, (state, action: PayloadAction<ProfilePercentage>) => {
                state.loading = false;
                state.selectedProfilePercentage = action.payload;
            })
            .addCase(getProfilePercentageById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // UPDATE
            .addCase(updateProfilePercentage.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateProfilePercentage.fulfilled, (state, action: PayloadAction<ProfilePercentage>) => {
                state.loading = false;
                state.ProfilePercentageList = state.ProfilePercentageList.map((ProfilePercentage) =>
                    ProfilePercentage.id === action.payload.id ? action.payload : ProfilePercentage
                );
            })
            .addCase(updateProfilePercentage.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // DELETE
            .addCase(deleteProfilePercentage.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteProfilePercentage.fulfilled, (state, action: PayloadAction<number>) => {
                state.loading = false;
                state.ProfilePercentageList = state.ProfilePercentageList.filter((c) => c.id !== action.payload);
            })
            .addCase(deleteProfilePercentage.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default ProfilePercentageSlice.reducer;
