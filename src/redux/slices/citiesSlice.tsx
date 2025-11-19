import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import BASE_URL_JOB from "../../config/config";
import getAuthAdminHeaders from "../../utils/auth";

// MODEL
export interface City {
    id: number;
    countryId: number;
    stateId: number;
    countryName: string;
    stateName: string;
    cityName: string;
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

interface CityState {
    loading: boolean;
    CityList: City[];
    selectedCity: City | null;
    error: string | null;
    pagination: Pagination;
}

const initialState: CityState = {
    loading: false,
    CityList: [],
    selectedCity: null,
    error: null,
    pagination: {
        total: 0,
        pages: 1,
        page: 1,
    },
};

// THUNKS
export const createCity = createAsyncThunk<City, any>(
    "city/create",
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axios.post( `${BASE_URL_JOB}/city/create`,formData, getAuthAdminHeaders(false) );
            toast.success(response.data.message);
            return response.data.data;
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Something went wrong");
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

export const getAllCities = createAsyncThunk<any, { page?: number; status?: string | number; search?: string, countryId?:number; stateId?: number; } | void>(
    "city/getAll",
    async (params = { page: 1, status: 1, search: "", countryId:0, stateId:0 }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${BASE_URL_JOB}/city/list`,params,getAuthAdminHeaders() );
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

export const getCityById = createAsyncThunk<City, number>(
    "city/getById",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${BASE_URL_JOB}/city/${id}`, getAuthAdminHeaders());
            return response.data.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

export const updateCity = createAsyncThunk<City, { id: number; updateData: City }>(
    "city/update",
    async ({ id, updateData }, { rejectWithValue }) => {
        try {
            const response = await axios.put(`${BASE_URL_JOB}/city/update/${id}`,updateData, getAuthAdminHeaders(false) );
            toast.success(response.data.message);
            return response.data.data;
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to update City");
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

export const deleteCity = createAsyncThunk<number, number>(
    "city/delete",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.delete( `${BASE_URL_JOB}/city/delete/${id}`, getAuthAdminHeaders());
            toast.success(response.data.message);
            return id;
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to delete City");
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

// SLICE
const CitySlice = createSlice({
    name: "city",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            // CREATE
            .addCase(createCity.pending, (state) => {
                state.loading = true;
            })
            .addCase(createCity.fulfilled, (state, action: PayloadAction<City>) => {
                state.loading = false;
                state.CityList.unshift(action.payload);
            })
            .addCase(createCity.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // GET ALL
            .addCase(getAllCities.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllCities.fulfilled, (state, action) => {
                state.loading = false;

                // Correct backend mapping
                state.CityList = action.payload.data.cities;
                state.pagination.total = action.payload.data.pagination.total;
                state.pagination.pages = action.payload.data.pagination.pages;
                state.pagination.page = action.payload.data.pagination.page;
            })
            .addCase(getAllCities.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // GET BY ID
            .addCase(getCityById.pending, (state) => {
                state.loading = true;
            })
            .addCase(getCityById.fulfilled, (state, action: PayloadAction<City>) => {
                state.loading = false;
                state.selectedCity = action.payload;
            })
            .addCase(getCityById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // UPDATE
            .addCase(updateCity.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateCity.fulfilled, (state, action: PayloadAction<City>) => {
                state.loading = false;
                state.CityList = state.CityList.map((city) =>
                    city.id === action.payload.id ? action.payload : city
                );
            })
            .addCase(updateCity.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // DELETE
            .addCase(deleteCity.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteCity.fulfilled, (state, action: PayloadAction<number>) => {
                state.loading = false;
                state.CityList = state.CityList.filter((c) => c.id !== action.payload);
            })
            .addCase(deleteCity.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default CitySlice.reducer;
