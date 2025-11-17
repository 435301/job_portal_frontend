import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import BASE_URL_JOB from "../../config/config";
import getAuthAdminHeaders from "../../utils/auth";

// MODEL
export interface CourseType {
    id: number;
    courseType: string;
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

interface CourseTypeState {
    loading: boolean;
    courseTypeList: CourseType[];
    selectedCourseType: CourseType | null;
    error: string | null;
    pagination: Pagination;
}

const initialState: CourseTypeState = {
    loading: false,
    courseTypeList: [],
    selectedCourseType: null,
    error: null,
    pagination: {
        total: 0,
        pages: 1,
        page: 1,
    },
};

// THUNKS
export const createCourseType = createAsyncThunk<CourseType, any>(
    "courseType/create",
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${BASE_URL_JOB}/courseType/create`, formData, getAuthAdminHeaders(false));
            toast.success(response.data.message);
            return response.data.data;
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Something went wrong");
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

export const getAllCourseTypes = createAsyncThunk<any, { page?: number; status?: string | number; search?: string, } | void>(
    "courseType/getAll",
    async (params = { page: 1, status: 1, search: "", }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${BASE_URL_JOB}/courseType/list`, params, getAuthAdminHeaders());
            return response.data;
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to fetch course type");
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

export const getCourseTypeById = createAsyncThunk<CourseType, number>(
    "courseType/getById",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${BASE_URL_JOB}/courseType/${id}`, getAuthAdminHeaders());
            return response.data.data;
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to fetch course Type");
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

export const updateCourseType = createAsyncThunk<CourseType, { id: number; updateData: CourseType }>(
    "courseType/update",
    async ({ id, updateData }, { rejectWithValue }) => {
        try {
            const response = await axios.put(`${BASE_URL_JOB}/courseType/update/${id}`, updateData, getAuthAdminHeaders(false));
            toast.success(response.data.message);
            return response.data.data;
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to update course Type");
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

export const deleteCourseType = createAsyncThunk<number, number>(
    "courseType/delete",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.delete(`${BASE_URL_JOB}/courseType/delete/${id}`, getAuthAdminHeaders());
            toast.success(response.data.message);
            return id;
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to delete course Type");
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

// SLICE
const courseTypeSlice = createSlice({
    name: "courseType",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            // CREATE
            .addCase(createCourseType.pending, (state) => {
                state.loading = true;
            })
            .addCase(createCourseType.fulfilled, (state, action: PayloadAction<CourseType>) => {
                state.loading = false;
                state.courseTypeList.unshift(action.payload);
            })
            .addCase(createCourseType.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // GET ALL
            .addCase(getAllCourseTypes.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllCourseTypes.fulfilled, (state, action) => {
                state.loading = false;

                // Correct backend mapping
                state.courseTypeList = action.payload.data.courseTypes;
                state.pagination.total = action.payload.data.pagination.total;
                state.pagination.pages = action.payload.data.pagination.pages;
                state.pagination.page = action.payload.data.pagination.page;
            })
            .addCase(getAllCourseTypes.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // GET BY ID
            .addCase(getCourseTypeById.pending, (state) => {
                state.loading = true;
            })
            .addCase(getCourseTypeById.fulfilled, (state, action: PayloadAction<CourseType>) => {
                state.loading = false;
                state.selectedCourseType = action.payload;
            })
            .addCase(getCourseTypeById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // UPDATE
            .addCase(updateCourseType.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateCourseType.fulfilled, (state, action: PayloadAction<CourseType>) => {
                state.loading = false;
                state.courseTypeList = state.courseTypeList.map((course) =>
                    course.id === action.payload.id ? action.payload : course
                );
            })
            .addCase(updateCourseType.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // DELETE
            .addCase(deleteCourseType.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteCourseType.fulfilled, (state, action: PayloadAction<number>) => {
                state.loading = false;
                state.courseTypeList = state.courseTypeList.filter((c) => c.id !== action.payload);
            })
            .addCase(deleteCourseType.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default courseTypeSlice.reducer;
