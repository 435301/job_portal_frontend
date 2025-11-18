import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import BASE_URL_JOB from "../../config/config";
import getAuthAdminHeaders from "../../utils/auth";

// MODEL
export interface SchoolBoard {
    id: number;
    boardName: string;
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

interface SchoolBoardState {
    loading: boolean;
    schoolBoardList: SchoolBoard[];
    selectedSchoolBoardList: SchoolBoard | null;
    error: string | null;
    pagination: Pagination;
}

const initialState: SchoolBoardState = {
    loading: false,
    schoolBoardList: [],
    selectedSchoolBoardList: null,
    error: null,
    pagination: {
        total: 0,
        pages: 1,
        page: 1,
    },
};

// THUNKS
export const createSchoolBoard = createAsyncThunk<SchoolBoard, any>(
    "schoolBoard/create",
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${BASE_URL_JOB}/schoolBoard/create`, formData, getAuthAdminHeaders(false));
            toast.success(response.data.message);
            return response.data.data;
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Something went wrong");
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

export const getAllSchoolBoards = createAsyncThunk<any, { page?: number; status?: string | number; search?: string, } | void>(
    "schoolBoard/getAll",
    async (params = { page: 1, status: 1, search: "", }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${BASE_URL_JOB}/schoolBoard/list`, params, getAuthAdminHeaders());
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

export const getSchoolBoardById = createAsyncThunk<SchoolBoard, number>(
    "schoolBoard/getById",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${BASE_URL_JOB}/schoolBoard/${id}`, getAuthAdminHeaders());
            return response.data.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

export const updateSchoolBoard = createAsyncThunk<SchoolBoard, { id: number; updateData: SchoolBoard }>(
    "schoolBoard/update",
    async ({ id, updateData }, { rejectWithValue }) => {
        try {
            const response = await axios.put(`${BASE_URL_JOB}/schoolBoard/update/${id}`, updateData, getAuthAdminHeaders(false));
            toast.success(response.data.message);
            return response.data.data;
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to update school board");
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

export const deleteSchoolBoard = createAsyncThunk<number, number>(
    "schoolBoard/delete",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.delete(`${BASE_URL_JOB}/schoolBoard/delete/${id}`, getAuthAdminHeaders());
            toast.success(response.data.message);
            return id;
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to delete school board");
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

// SLICE
const courseTypeSlice = createSlice({
    name: "schoolBoard",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            // CREATE
            .addCase(createSchoolBoard.pending, (state) => {
                state.loading = true;
            })
            .addCase(createSchoolBoard.fulfilled, (state, action: PayloadAction<SchoolBoard>) => {
                state.loading = false;
                state.schoolBoardList.unshift(action.payload);
            })
            .addCase(createSchoolBoard.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // GET ALL
            .addCase(getAllSchoolBoards.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllSchoolBoards.fulfilled, (state, action) => {
                state.loading = false;

                // Correct backend mapping
                state.schoolBoardList = action.payload.data.boardTypes;
                state.pagination.total = action.payload.data.pagination.total;
                state.pagination.pages = action.payload.data.pagination.pages;
                state.pagination.page = action.payload.data.pagination.page;
            })
            .addCase(getAllSchoolBoards.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // GET BY ID
            .addCase(getSchoolBoardById.pending, (state) => {
                state.loading = true;
            })
            .addCase(getSchoolBoardById.fulfilled, (state, action: PayloadAction<SchoolBoard>) => {
                state.loading = false;
                state.selectedSchoolBoardList = action.payload;
            })
            .addCase(getSchoolBoardById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // UPDATE
            .addCase(updateSchoolBoard.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateSchoolBoard.fulfilled, (state, action: PayloadAction<SchoolBoard>) => {
                state.loading = false;
                state.schoolBoardList = state.schoolBoardList.map((course) =>
                    course.id === action.payload.id ? action.payload : course
                );
            })
            .addCase(updateSchoolBoard.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // DELETE
            .addCase(deleteSchoolBoard.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteSchoolBoard.fulfilled, (state, action: PayloadAction<number>) => {
                state.loading = false;
                state.schoolBoardList = state.schoolBoardList.filter((c) => c.id !== action.payload);
            })
            .addCase(deleteSchoolBoard.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default courseTypeSlice.reducer;
