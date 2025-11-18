
import { createSlice, createAsyncThunk ,PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import BASE_URL_JOB from "../../config/config";
import getAuthAdminHeaders from "../../utils/auth";

export interface NoticePeriod {
  id: number;
  noticePeriodName: string;
  status: number;
  createdBy?: number;
  updatedBy?: number;
  createdAt?: string;
  updatedAt?: string;
  trash?: number;
}

interface NoticePeriodState {
  loading: boolean;
  NoticePeriodList: NoticePeriod[];
  total: number;
  totalPages: number;
  currentPage: number;
  selectedNoticePeriod: NoticePeriod | null;
  error: string | null;
}

const initialState: NoticePeriodState = {
  loading: false,
  NoticePeriodList: [],
  total: 0,
  totalPages: 1,
  currentPage: 1,
  selectedNoticePeriod: null,
  error: null,
};

interface UpdateNoticePeriodPayload {
  id: number;
  updateData: NoticePeriod;
}

export const createNoticePeriod = createAsyncThunk<NoticePeriod, any>(
  "noticeperiods/create",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL_JOB}/noticeperiods/create`, formData, getAuthAdminHeaders(false));
      toast.success(response.data.message);
      return response.data.data;
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Something went wrong");
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

export const getAllNoticePeriods = createAsyncThunk<
  { data: NoticePeriod[]; total: number; totalPages: number; currentPage: number },
  { page?: number; showStatus?: string | number; search?: string } | void
>(
  "noticeperiods/getAll",
  async (params = { page: 1, showStatus: 1, search: "" }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL_JOB}/noticeperiods/list`, params, getAuthAdminHeaders());
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

export const getNoticePeriodById = createAsyncThunk<NoticePeriod, number>(
  "noticeperiods/getById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL_JOB}/noticeperiods/${id}`, getAuthAdminHeaders());
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);


export const updateNoticePeriod = createAsyncThunk<
  NoticePeriod, // Return type
  { id: number; updateData: NoticePeriod } // Argument type
>(
  "noticeperiods/update",
  async ({ id, updateData }: UpdateNoticePeriodPayload, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${BASE_URL_JOB}/noticeperiods/update/${id}`, updateData, getAuthAdminHeaders(false));
      toast.success(response.data.message);
      return response.data.data;
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to update notice periods");
      return rejectWithValue(error.response?.data?.message);
    }
  }
);


export const deleteNoticePeriod = createAsyncThunk<number, number>(
  "noticeperiods/delete",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${BASE_URL_JOB}/noticeperiods/delete/${id}`, getAuthAdminHeaders());
      toast.success(response.data.message);
      return id;
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to delete notice periods");
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

const jobTitleSlice = createSlice({
  name: "noticeperiods",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // CREATE
      .addCase(createNoticePeriod.pending, (state) => {
        state.loading = true;
      })
      .addCase(createNoticePeriod.fulfilled, (state, action:PayloadAction<NoticePeriod>) => {
        state.loading = false;
        state.NoticePeriodList.unshift(action.payload);
      })
      .addCase(createNoticePeriod.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // GET ALL
      .addCase(getAllNoticePeriods.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllNoticePeriods.fulfilled, (state, action) => {
        state.loading = false;
        state.NoticePeriodList = action.payload.data;
        state.total = action.payload.total;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
      })
      .addCase(getAllNoticePeriods.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // GET BY ID
      .addCase(getNoticePeriodById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getNoticePeriodById.fulfilled, (state, action:PayloadAction<NoticePeriod>) => {
        state.loading = false;
        state.selectedNoticePeriod = action.payload;
      })
      .addCase(getNoticePeriodById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // UPDATE
      .addCase(updateNoticePeriod.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateNoticePeriod.fulfilled, (state, action: PayloadAction<NoticePeriod>) => {
        state.loading = false;
        state.NoticePeriodList = state.NoticePeriodList.map((edu) =>
          edu.id === action.payload.id ? action.payload : edu
        );
      })
      .addCase(updateNoticePeriod.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // DELETE
      .addCase(deleteNoticePeriod.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteNoticePeriod.fulfilled, (state, action:PayloadAction<number>) => {
        state.loading = false;
        state.NoticePeriodList = state.NoticePeriodList.filter((edu) => edu.id !== action.payload);
      })
      .addCase(deleteNoticePeriod.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default jobTitleSlice.reducer;
