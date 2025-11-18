import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import BASE_URL_JOB from "../../config/config";
import getAuthAdminHeaders from "../../utils/auth";

// MODEL
export interface Course {
    id: number;
    educationId: number;
    educationName: string;
    courseName: string;
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

interface CourseState {
    loading: boolean;
    courseList: Course[];
    selectedCourse: Course | null;
    error: string | null;
    pagination: Pagination;
}

const initialState: CourseState = {
    loading: false,
    courseList: [],
    selectedCourse: null,
    error: null,
    pagination: {
        total: 0,
        pages: 1,
        page: 1,
    },
};

// THUNKS
export const createCourse = createAsyncThunk<Course, any>(
    "course/create",
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axios.post( `${BASE_URL_JOB}/course/create`,formData, getAuthAdminHeaders(false) );
            toast.success(response.data.message);
            return response.data.data;
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Something went wrong");
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

export const getAllCourses = createAsyncThunk<any, { page?: number; status?: string | number; search?: string, educationId?:number; } | void>(
    "course/getAll",
    async (params = { page: 1, status: 1, search: "", educationId:0 }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${BASE_URL_JOB}/course/list`,params,getAuthAdminHeaders() );
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

export const getCourseById = createAsyncThunk<Course, number>(
    "course/getById",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${BASE_URL_JOB}/course/${id}`, getAuthAdminHeaders());
            return response.data.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

export const updateCourse = createAsyncThunk<Course, { id: number; updateData: Course }>(
    "course/update",
    async ({ id, updateData }, { rejectWithValue }) => {
        try {
            const response = await axios.put(`${BASE_URL_JOB}/course/update/${id}`,updateData, getAuthAdminHeaders(false) );
            toast.success(response.data.message);
            return response.data.data;
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to update course");
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

export const deleteCourse = createAsyncThunk<number, number>(
    "course/delete",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.delete( `${BASE_URL_JOB}/course/delete/${id}`, getAuthAdminHeaders());
            toast.success(response.data.message);
            return id;
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to delete course");
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

// SLICE
const courseSlice = createSlice({
    name: "course",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            // CREATE
            .addCase(createCourse.pending, (state) => {
                state.loading = true;
            })
            .addCase(createCourse.fulfilled, (state, action: PayloadAction<Course>) => {
                state.loading = false;
                state.courseList.unshift(action.payload);
            })
            .addCase(createCourse.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // GET ALL
            .addCase(getAllCourses.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllCourses.fulfilled, (state, action) => {
                state.loading = false;

                // Correct backend mapping
                state.courseList = action.payload.data.courses;
                state.pagination.total = action.payload.data.pagination.total;
                state.pagination.pages = action.payload.data.pagination.pages;
                state.pagination.page = action.payload.data.pagination.page;
            })
            .addCase(getAllCourses.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // GET BY ID
            .addCase(getCourseById.pending, (state) => {
                state.loading = true;
            })
            .addCase(getCourseById.fulfilled, (state, action: PayloadAction<Course>) => {
                state.loading = false;
                state.selectedCourse = action.payload;
            })
            .addCase(getCourseById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // UPDATE
            .addCase(updateCourse.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateCourse.fulfilled, (state, action: PayloadAction<Course>) => {
                state.loading = false;
                state.courseList = state.courseList.map((course) =>
                    course.id === action.payload.id ? action.payload : course
                );
            })
            .addCase(updateCourse.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // DELETE
            .addCase(deleteCourse.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteCourse.fulfilled, (state, action: PayloadAction<number>) => {
                state.loading = false;
                state.courseList = state.courseList.filter((c) => c.id !== action.payload);
            })
            .addCase(deleteCourse.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default courseSlice.reducer;
