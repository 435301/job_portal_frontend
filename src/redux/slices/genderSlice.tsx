import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import BASE_URL_JOB from "../../config/config";
import getAuthAdminHeaders from "../../utils/auth";

// MODEL
export interface Gender {
    id: number;
    gender: string;
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

interface GenderState {
    loading: boolean;
    genderList: Gender[];
    selectedGender: Gender | null;
    error: string | null;
    pagination: Pagination;
}

const initialState: GenderState = {
    loading: false,
    genderList: [],
    selectedGender: null,
    error: null,
    pagination: {
        total: 0,
        pages: 1,
        page: 1,
    },
};

// THUNKS
export const createGender = createAsyncThunk<Gender, any>(
    "gender/create",
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${BASE_URL_JOB}/gender/create`, formData, getAuthAdminHeaders(false));
            toast.success(response.data.message);
            return response.data.data;
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Something went wrong");
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

export const getAllGender = createAsyncThunk<any, { page?: number; status?: string | number; search?: string, } | void>(
    "gender/getAll",
    async (params = { page: 1, status: 1, search: "", }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${BASE_URL_JOB}/gender/list`, params, getAuthAdminHeaders());
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

export const getGenderById = createAsyncThunk<Gender, number>(
    "gender/getById",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${BASE_URL_JOB}/gender/${id}`, getAuthAdminHeaders());
            return response.data.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

export const updateGender = createAsyncThunk<Gender, { id: number; updateData: Gender }>(
    "gender/update",
    async ({ id, updateData }, { rejectWithValue }) => {
        try {
            const response = await axios.put(`${BASE_URL_JOB}/gender/update/${id}`, updateData, getAuthAdminHeaders(false));
            toast.success(response.data.message);
            return response.data.data;
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to update gender");
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

export const deleteGender = createAsyncThunk<number, number>(
    "gender/delete",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.delete(`${BASE_URL_JOB}/gender/delete/${id}`, getAuthAdminHeaders());
            toast.success(response.data.message);
            return id;
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to delete gender");
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

// SLICE
const geenderSlice = createSlice({
    name: "gender",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            // CREATE
            .addCase(createGender.pending, (state) => {
                state.loading = true;
            })
            .addCase(createGender.fulfilled, (state, action: PayloadAction<Gender>) => {
                state.loading = false;
                state.genderList.unshift(action.payload);
            })
            .addCase(createGender.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // GET ALL
            .addCase(getAllGender.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllGender.fulfilled, (state, action) => {
                state.loading = false;

                // Correct backend mapping
                state.genderList = action.payload.data.genders;
                state.pagination.total = action.payload.data.pagination.total;
                state.pagination.pages = action.payload.data.pagination.pages;
                state.pagination.page = action.payload.data.pagination.page;
            })
            .addCase(getAllGender.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // GET BY ID
            .addCase(getGenderById.pending, (state) => {
                state.loading = true;
            })
            .addCase(getGenderById.fulfilled, (state, action: PayloadAction<Gender>) => {
                state.loading = false;
                state.selectedGender = action.payload;
            })
            .addCase(getGenderById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // UPDATE
            .addCase(updateGender.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateGender.fulfilled, (state, action: PayloadAction<Gender>) => {
                state.loading = false;
                state.genderList = state.genderList.map((gender) =>
                    gender.id === action.payload.id ? action.payload : gender
                );
            })
            .addCase(updateGender.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // DELETE
            .addCase(deleteGender.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteGender.fulfilled, (state, action: PayloadAction<number>) => {
                state.loading = false;
                state.genderList = state.genderList.filter((c) => c.id !== action.payload);
            })
            .addCase(deleteGender.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default geenderSlice.reducer;
