import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import BASE_URL_JOB from "../../config/config";
import getAuthAdminHeaders from "../../utils/auth";

// MODEL
export interface Specialization {
    id: number;
    educationId: number;
    courseId: number;
    educationName: string;
    courseName: string;
    specializationName: string;
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

interface SpecializationState {
    loading: boolean;
    specializationList: Specialization[];
    selectedSpecialization: Specialization | null;
    error: string | null;
    pagination: Pagination;
}

const initialState: SpecializationState = {
    loading: false,
    specializationList: [],
    selectedSpecialization: null,
    error: null,
    pagination: {
        total: 0,
        pages: 1,
        page: 1,
    },
};

// THUNKS
export const createSpecialization = createAsyncThunk<Specialization, any>(
    "specialization/create",
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axios.post( `${BASE_URL_JOB}/specialization/create`,formData, getAuthAdminHeaders(false) );
            toast.success(response.data.message);
            return response.data.data;
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Something went wrong");
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

export const getAllSpecializations = createAsyncThunk<any, { page?: number; status?: string | number; search?: string, educationId?:number; courseId?: number; } | void>(
    "specialization/getAll",
    async (params = { page: 1, status: 1, search: "", educationId:0 }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${BASE_URL_JOB}/specialization/list`,params,getAuthAdminHeaders() );
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

export const getSpecializationById = createAsyncThunk<Specialization, number>(
    "specialization/getById",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${BASE_URL_JOB}/specialization/${id}`, getAuthAdminHeaders());
            return response.data.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

export const updateSpecialization = createAsyncThunk<Specialization, { id: number; updateData: Specialization }>(
    "specialization/update",
    async ({ id, updateData }, { rejectWithValue }) => {
        try {
            const response = await axios.put(`${BASE_URL_JOB}/specialization/update/${id}`,updateData, getAuthAdminHeaders(false) );
            toast.success(response.data.message);
            return response.data.data;
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to update specialization");
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

export const deleteSpecialization = createAsyncThunk<number, number>(
    "specialization/delete",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.delete( `${BASE_URL_JOB}/specialization/delete/${id}`, getAuthAdminHeaders());
            toast.success(response.data.message);
            return id;
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to delete specialization");
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

// SLICE
const specializationSlice = createSlice({
    name: "specialization",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            // CREATE
            .addCase(createSpecialization.pending, (state) => {
                state.loading = true;
            })
            .addCase(createSpecialization.fulfilled, (state, action: PayloadAction<Specialization>) => {
                state.loading = false;
                state.specializationList.unshift(action.payload);
            })
            .addCase(createSpecialization.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // GET ALL
            .addCase(getAllSpecializations.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllSpecializations.fulfilled, (state, action) => {
                state.loading = false;

                // Correct backend mapping
                state.specializationList = action.payload.data.specializations;
                state.pagination.total = action.payload.data.pagination.total;
                state.pagination.pages = action.payload.data.pagination.pages;
                state.pagination.page = action.payload.data.pagination.page;
            })
            .addCase(getAllSpecializations.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // GET BY ID
            .addCase(getSpecializationById.pending, (state) => {
                state.loading = true;
            })
            .addCase(getSpecializationById.fulfilled, (state, action: PayloadAction<Specialization>) => {
                state.loading = false;
                state.selectedSpecialization = action.payload;
            })
            .addCase(getSpecializationById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // UPDATE
            .addCase(updateSpecialization.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateSpecialization.fulfilled, (state, action: PayloadAction<Specialization>) => {
                state.loading = false;
                state.specializationList = state.specializationList.map((course) =>
                    course.id === action.payload.id ? action.payload : course
                );
            })
            .addCase(updateSpecialization.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // DELETE
            .addCase(deleteSpecialization.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteSpecialization.fulfilled, (state, action: PayloadAction<number>) => {
                state.loading = false;
                state.specializationList = state.specializationList.filter((c) => c.id !== action.payload);
            })
            .addCase(deleteSpecialization.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default specializationSlice.reducer;
