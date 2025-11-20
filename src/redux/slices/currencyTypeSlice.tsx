import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import BASE_URL_JOB from "../../config/config";
import getAuthAdminHeaders from "../../utils/auth";

// MODEL
export interface CurrencyType {
    id: number;
    currencyType: string;
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

interface CurrencyTypeState {
    loading: boolean;
    CurrencyTypeList: CurrencyType[];
    selectedCurrencyType: CurrencyType | null;
    error: string | null;
    pagination: Pagination;
}

const initialState: CurrencyTypeState = {
    loading: false,
    CurrencyTypeList: [],
    selectedCurrencyType: null,
    error: null,
    pagination: {
        total: 0,
        pages: 1,
        page: 1,
    },
};

// THUNKS
export const createCurrencyType = createAsyncThunk<CurrencyType, any>(
    "currency/create",
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${BASE_URL_JOB}/currency/create`, formData, getAuthAdminHeaders(false));
            toast.success(response.data.message);
            return response.data.data;
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Something went wrong");
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

export const getAllCurrencyType = createAsyncThunk<any, { page?: number; status?: string | number; search?: string, } | void>(
    "currency/getAll",
    async (params = { page: 1, status: 1, search: "", }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${BASE_URL_JOB}/currency/list`, params, getAuthAdminHeaders());
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

export const getCurrencyTypeById = createAsyncThunk<CurrencyType, number>(
    "currency/getById",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${BASE_URL_JOB}/currency/${id}`, getAuthAdminHeaders());
            return response.data.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

export const updateCurrencyType = createAsyncThunk<CurrencyType, { id: number; updateData: CurrencyType }>(
    "currency/update",
    async ({ id, updateData }, { rejectWithValue }) => {
        try {
            const response = await axios.put(`${BASE_URL_JOB}/currency/update/${id}`, updateData, getAuthAdminHeaders(false));
            toast.success(response.data.message);
            return response.data.data;
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to update Currency Type");
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

export const deleteCurrencyType = createAsyncThunk<number, number>(
    "currency/delete",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.delete(`${BASE_URL_JOB}/currency/delete/${id}`, getAuthAdminHeaders());
            toast.success(response.data.message);
            return id;
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to delete Currency Type");
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

// SLICE
const currencyTypeSlice = createSlice({
    name: "currencyType",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            // CREATE
            .addCase(createCurrencyType.pending, (state) => {
                state.loading = true;
            })
            .addCase(createCurrencyType.fulfilled, (state, action: PayloadAction<CurrencyType>) => {
                state.loading = false;
                state.CurrencyTypeList.unshift(action.payload);
            })
            .addCase(createCurrencyType.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // GET ALL
            .addCase(getAllCurrencyType.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllCurrencyType.fulfilled, (state, action) => {
                state.loading = false;

                // Correct backend mapping
                state.CurrencyTypeList = action.payload.data.currencyTypes;
                state.pagination.total = action.payload.data.pagination.total;
                state.pagination.pages = action.payload.data.pagination.pages;
                state.pagination.page = action.payload.data.pagination.page;
            })
            .addCase(getAllCurrencyType.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // GET BY ID
            .addCase(getCurrencyTypeById.pending, (state) => {
                state.loading = true;
            })
            .addCase(getCurrencyTypeById.fulfilled, (state, action: PayloadAction<CurrencyType>) => {
                state.loading = false;
                state.selectedCurrencyType = action.payload;
            })
            .addCase(getCurrencyTypeById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // UPDATE
            .addCase(updateCurrencyType.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateCurrencyType.fulfilled, (state, action: PayloadAction<CurrencyType>) => {
                state.loading = false;
                state.CurrencyTypeList = state.CurrencyTypeList.map((CurrencyType) =>
                    CurrencyType.id === action.payload.id ? action.payload : CurrencyType
                );
            })
            .addCase(updateCurrencyType.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // DELETE
            .addCase(deleteCurrencyType.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteCurrencyType.fulfilled, (state, action: PayloadAction<number>) => {
                state.loading = false;
                state.CurrencyTypeList = state.CurrencyTypeList.filter((c) => c.id !== action.payload);
            })
            .addCase(deleteCurrencyType.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default currencyTypeSlice.reducer;
