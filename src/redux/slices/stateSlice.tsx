import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import BASE_URL_JOB from "../../config/config";
import getAuthAdminHeaders from "../../utils/auth";

// MODEL
export interface State {
    id: number;
    countryId: number;
    countryName: string;
    stateName: string;
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

interface StateState {
    loading: boolean;
    StateList: State[];
    selectedState: State | null;
    error: string | null;
    pagination: Pagination;
}

const initialState: StateState = {
    loading: false,
    StateList: [],
    selectedState: null,
    error: null,
    pagination: {
        total: 0,
        pages: 1,
        page: 1,
    },
};

// THUNKS
export const createState = createAsyncThunk<State, any>(
    "state/create",
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axios.post( `${BASE_URL_JOB}/state/create`,formData, getAuthAdminHeaders(false) );
            toast.success(response.data.message);
            return response.data.data;
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Something went wrong");
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

export const getAllStates = createAsyncThunk<any, { page?: number; status?: string | number; search?: string, countryId?:number | string; } | void>(
    "state/getAll",
    async (params = { page: 1, status: 1, search: "", countryId:"" }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${BASE_URL_JOB}/state/list`,params,getAuthAdminHeaders() );
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

export const getStateById = createAsyncThunk<State, number>(
    "state/getById",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${BASE_URL_JOB}/state/${id}`, getAuthAdminHeaders());
            return response.data.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

export const updateState = createAsyncThunk<State, { id: number; updateData: State }>(
    "state/update",
    async ({ id, updateData }, { rejectWithValue }) => {
        try {
            const response = await axios.put(`${BASE_URL_JOB}/state/update/${id}`,updateData, getAuthAdminHeaders(false) );
            toast.success(response.data.message);
            return response.data.data;
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to update State");
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

export const deleteState = createAsyncThunk<number, number>(
    "state/delete",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.delete( `${BASE_URL_JOB}/state/delete/${id}`, getAuthAdminHeaders());
            toast.success(response.data.message);
            return id;
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to delete State");
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

// SLICE
const StateSlice = createSlice({
    name: "state",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            // CREATE
            .addCase(createState.pending, (state) => {
                state.loading = true;
            })
            .addCase(createState.fulfilled, (state, action: PayloadAction<State>) => {
                state.loading = false;
                state.StateList.unshift(action.payload);
            })
            .addCase(createState.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // GET ALL
            .addCase(getAllStates.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllStates.fulfilled, (state, action) => {
                state.loading = false;

                // Correct backend mapping
                state.StateList = action.payload.data.states;
                state.pagination.total = action.payload.data.pagination.total;
                state.pagination.pages = action.payload.data.pagination.pages;
                state.pagination.page = action.payload.data.pagination.page;
            })
            .addCase(getAllStates.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // GET BY ID
            .addCase(getStateById.pending, (state) => {
                state.loading = true;
            })
            .addCase(getStateById.fulfilled, (state, action: PayloadAction<State>) => {
                state.loading = false;
                state.selectedState = action.payload;
            })
            .addCase(getStateById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // UPDATE
            .addCase(updateState.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateState.fulfilled, (state, action: PayloadAction<State>) => {
                state.loading = false;
                state.StateList = state.StateList.map((State) =>
                    State.id === action.payload.id ? action.payload : State
                );
            })
            .addCase(updateState.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // DELETE
            .addCase(deleteState.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteState.fulfilled, (state, action: PayloadAction<number>) => {
                state.loading = false;
                state.StateList = state.StateList.filter((c) => c.id !== action.payload);
            })
            .addCase(deleteState.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default StateSlice.reducer;
