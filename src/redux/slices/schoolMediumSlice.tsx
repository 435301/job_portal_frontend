import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import BASE_URL_JOB from "../../config/config";
import getAuthAdminHeaders from "../../utils/auth";

// MODEL
export interface SchoolMedium {
    id: number;
    schoolMedium: string;
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

interface SchoolMediumState {
    loading: boolean;
    schoolMediumList: SchoolMedium[];
    selectedSchoolMediumList: SchoolMedium | null;
    error: string | null;
    pagination: Pagination;
}

const initialState: SchoolMediumState = {
    loading: false,
    schoolMediumList: [],
    selectedSchoolMediumList: null,
    error: null,
    pagination: {
        total: 0,
        pages: 1,
        page: 1,
    },
};

// THUNKS
export const createSchoolMedium = createAsyncThunk<SchoolMedium, any>(
    "schoolMedium/create",
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${BASE_URL_JOB}/schoolMedium/create`, formData, getAuthAdminHeaders(false));
            toast.success(response.data.message);
            return response.data.data;
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Something went wrong");
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

export const getAllSchoolMedium = createAsyncThunk<any, { page?: number; status?: string | number; search?: string, } | void>(
    "schoolMedium/getAll",
    async (params = { page: 1, status: 1, search: "", }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${BASE_URL_JOB}/schoolMedium/list`, params, getAuthAdminHeaders());
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

export const getSchoolMediumById = createAsyncThunk<SchoolMedium, number>(
    "schoolMedium/getById",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${BASE_URL_JOB}/schoolMedium/${id}`, getAuthAdminHeaders());
            return response.data.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

export const updateSchoolMedium = createAsyncThunk<SchoolMedium, { id: number; updateData: SchoolMedium }>(
    "schoolMedium/update",
    async ({ id, updateData }, { rejectWithValue }) => {
        try {
            const response = await axios.put(`${BASE_URL_JOB}/schoolMedium/update/${id}`, updateData, getAuthAdminHeaders(false));
            toast.success(response.data.message);
            return response.data.data;
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to update school medium");
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

export const deleteSchoolMedium = createAsyncThunk<number, number>(
    "schoolMedium/delete",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.delete(`${BASE_URL_JOB}/schoolMedium/delete/${id}`, getAuthAdminHeaders());
            toast.success(response.data.message);
            return id;
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to delete school medium");
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

// SLICE
const SchoolMediumSlice = createSlice({
    name: "schoolMedium",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            // CREATE
            .addCase(createSchoolMedium.pending, (state) => {
                state.loading = true;
            })
            .addCase(createSchoolMedium.fulfilled, (state, action: PayloadAction<SchoolMedium>) => {
                state.loading = false;
                state.schoolMediumList.unshift(action.payload);
            })
            .addCase(createSchoolMedium.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // GET ALL
            .addCase(getAllSchoolMedium.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllSchoolMedium.fulfilled, (state, action) => {
                state.loading = false;

                // Correct backend mapping
                state.schoolMediumList = action.payload.data.schoolMediums;
                state.pagination.total = action.payload.data.pagination.total;
                state.pagination.pages = action.payload.data.pagination.pages;
                state.pagination.page = action.payload.data.pagination.page;
            })
            .addCase(getAllSchoolMedium.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // GET BY ID
            .addCase(getSchoolMediumById.pending, (state) => {
                state.loading = true;
            })
            .addCase(getSchoolMediumById.fulfilled, (state, action: PayloadAction<SchoolMedium>) => {
                state.loading = false;
                state.selectedSchoolMediumList = action.payload;
            })
            .addCase(getSchoolMediumById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // UPDATE
            .addCase(updateSchoolMedium.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateSchoolMedium.fulfilled, (state, action: PayloadAction<SchoolMedium>) => {
                state.loading = false;
                state.schoolMediumList = state.schoolMediumList.map((course) =>
                    course.id === action.payload.id ? action.payload : course
                );
            })
            .addCase(updateSchoolMedium.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // DELETE
            .addCase(deleteSchoolMedium.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteSchoolMedium.fulfilled, (state, action: PayloadAction<number>) => {
                state.loading = false;
                state.schoolMediumList = state.schoolMediumList.filter((c) => c.id !== action.payload);
            })
            .addCase(deleteSchoolMedium.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default SchoolMediumSlice.reducer;
