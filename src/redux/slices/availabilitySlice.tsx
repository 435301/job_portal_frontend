import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import BASE_URL_JOB from "../../config/config";
import getAuthAdminHeaders from "../../utils/auth";

// MODEL
export interface Availability {
    id: number;
    availability: string;
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

interface AvailabilityState {
    loading: boolean;
    AvailabilityList: Availability[];
    selectedAvailability: Availability | null;
    error: string | null;
    pagination: Pagination;
}

const initialState: AvailabilityState = {
    loading: false,
    AvailabilityList: [],
    selectedAvailability: null,
    error: null,
    pagination: {
        total: 0,
        pages: 1,
        page: 1,
    },
};

// THUNKS
export const createAvailability = createAsyncThunk<Availability, any>(
    "availability/create",
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${BASE_URL_JOB}/availability/create`, formData, getAuthAdminHeaders(false));
            toast.success(response.data.message);
            return response.data.data;
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Something went wrong");
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

export const getAllAvailability = createAsyncThunk<any, { page?: number; status?: string | number; search?: string, } | void>(
    "availability/getAll",
    async (params = { page: 1, status: 1, search: "", }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${BASE_URL_JOB}/availability/list`, params, getAuthAdminHeaders());
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

export const getAvailabilityById = createAsyncThunk<Availability, number>(
    "availability/getById",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${BASE_URL_JOB}/availability/${id}`, getAuthAdminHeaders());
            return response.data.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

export const updateAvailability = createAsyncThunk<Availability, { id: number; updateData: Availability }>(
    "availability/update",
    async ({ id, updateData }, { rejectWithValue }) => {
        try {
            const response = await axios.put(`${BASE_URL_JOB}/availability/update/${id}`, updateData, getAuthAdminHeaders(false));
            toast.success(response.data.message);
            return response.data.data;
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to update Availability");
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

export const deleteAvailability = createAsyncThunk<number, number>(
    "availability/delete",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.delete(`${BASE_URL_JOB}/availability/delete/${id}`, getAuthAdminHeaders());
            toast.success(response.data.message);
            return id;
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to delete availability");
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

// SLICE
const geenderSlice = createSlice({
    name: "availability",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            // CREATE
            .addCase(createAvailability.pending, (state) => {
                state.loading = true;
            })
            .addCase(createAvailability.fulfilled, (state, action: PayloadAction<Availability>) => {
                state.loading = false;
                state.AvailabilityList.unshift(action.payload);
            })
            .addCase(createAvailability.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // GET ALL
            .addCase(getAllAvailability.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllAvailability.fulfilled, (state, action) => {
                state.loading = false;

                // Correct backend mapping
                state.AvailabilityList = action.payload.data.availabilities;
                state.pagination.total = action.payload.data.pagination.total;
                state.pagination.pages = action.payload.data.pagination.pages;
                state.pagination.page = action.payload.data.pagination.page;
            })
            .addCase(getAllAvailability.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // GET BY ID
            .addCase(getAvailabilityById.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAvailabilityById.fulfilled, (state, action: PayloadAction<Availability>) => {
                state.loading = false;
                state.selectedAvailability = action.payload;
            })
            .addCase(getAvailabilityById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // UPDATE
            .addCase(updateAvailability.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateAvailability.fulfilled, (state, action: PayloadAction<Availability>) => {
                state.loading = false;
                state.AvailabilityList = state.AvailabilityList.map((Availability) =>
                    Availability.id === action.payload.id ? action.payload : Availability
                );
            })
            .addCase(updateAvailability.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // DELETE
            .addCase(deleteAvailability.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteAvailability.fulfilled, (state, action: PayloadAction<number>) => {
                state.loading = false;
                state.AvailabilityList = state.AvailabilityList.filter((c) => c.id !== action.payload);
            })
            .addCase(deleteAvailability.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default geenderSlice.reducer;
