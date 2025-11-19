import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import BASE_URL_JOB from "../../config/config";
import getAuthAdminHeaders from "../../utils/auth";

// MODEL
export interface Country {
    id: number;
    countryName: string;
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

interface CountryState {
    loading: boolean;
    countryList: Country[];
    selectedCountry: Country | null;
    error: string | null;
    pagination: Pagination;
}

const initialState: CountryState = {
    loading: false,
    countryList: [],
    selectedCountry: null,
    error: null,
    pagination: {
        total: 0,
        pages: 1,
        page: 1,
    },
};

// THUNKS
export const createCountry = createAsyncThunk<Country, any>(
    "country/create",
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${BASE_URL_JOB}/country/create`, formData, getAuthAdminHeaders(false));
            toast.success(response.data.message);
            return response.data.data;
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Something went wrong");
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

export const getAllCountry = createAsyncThunk<any, { page?: number; status?: string | number; search?: string, } | void>(
    "country/getAll",
    async (params = { page: 1, status: 1, search: "", }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${BASE_URL_JOB}/country/list`, params, getAuthAdminHeaders());
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

export const getCountryById = createAsyncThunk<Country, number>(
    "country/getById",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${BASE_URL_JOB}/country/${id}`, getAuthAdminHeaders());
            return response.data.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

export const updateCountry = createAsyncThunk<Country, { id: number; updateData: Country }>(
    "country/update",
    async ({ id, updateData }, { rejectWithValue }) => {
        try {
            const response = await axios.put(`${BASE_URL_JOB}/country/update/${id}`, updateData, getAuthAdminHeaders(false));
            toast.success(response.data.message);
            return response.data.data;
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to update country");
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

export const deleteCountry = createAsyncThunk<number, number>(
    "country/delete",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.delete(`${BASE_URL_JOB}/country/delete/${id}`, getAuthAdminHeaders());
            toast.success(response.data.message);
            return id;
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to delete country");
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

// SLICE
const countryList = createSlice({
    name: "country",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            // CREATE
            .addCase(createCountry.pending, (state) => {
                state.loading = true;
            })
            .addCase(createCountry.fulfilled, (state, action: PayloadAction<Country>) => {
                state.loading = false;
                state.countryList.unshift(action.payload);
            })
            .addCase(createCountry.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // GET ALL
            .addCase(getAllCountry.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllCountry.fulfilled, (state, action) => {
                state.loading = false;

                // Correct backend mapping
                state.countryList = action.payload.data.countries;
                state.pagination.total = action.payload.data.pagination.total;
                state.pagination.pages = action.payload.data.pagination.pages;
                state.pagination.page = action.payload.data.pagination.page;
            })
            .addCase(getAllCountry.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // GET BY ID
            .addCase(getCountryById.pending, (state) => {
                state.loading = true;
            })
            .addCase(getCountryById.fulfilled, (state, action: PayloadAction<Country>) => {
                state.loading = false;
                state.selectedCountry = action.payload;
            })
            .addCase(getCountryById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // UPDATE
            .addCase(updateCountry.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateCountry.fulfilled, (state, action: PayloadAction<Country>) => {
                state.loading = false;
                state.countryList = state.countryList.map((gender) =>
                    gender.id === action.payload.id ? action.payload : gender
                );
            })
            .addCase(updateCountry.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // DELETE
            .addCase(deleteCountry.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteCountry.fulfilled, (state, action: PayloadAction<number>) => {
                state.loading = false;
                state.countryList = state.countryList.filter((c) => c.id !== action.payload);
            })
            .addCase(deleteCountry.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default countryList.reducer;
