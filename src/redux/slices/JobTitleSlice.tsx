
import { createSlice, createAsyncThunk ,PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import BASE_URL_JOB from "../../config/config";
import getAuthAdminHeaders from "../../utils/auth";

export interface JobTitle {
  id: number;
  jobTitleName: string;
  status: number;
  createdBy?: number;
  updatedBy?: number;
  createdAt?: string;
  updatedAt?: string;
  trash?: number;
}

interface JobTitleState {
  loading: boolean;
  JobTitleList: JobTitle[];
  total: number;
  totalPages: number;
  currentPage: number;
  selectedJobTitle: JobTitle | null;
  error: string | null;
}

const initialState: JobTitleState = {
  loading: false,
  JobTitleList: [],
  total: 0,
  totalPages: 1,
  currentPage: 1,
  selectedJobTitle: null,
  error: null,
};

interface UpdateJobTitlePayload {
  id: number;
  updateData: JobTitle;
}

export const createJobTitle = createAsyncThunk<JobTitle, any>(
  "jobTitles/create",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL_JOB}/jobTitles/create`, formData, getAuthAdminHeaders(false));
      toast.success(response.data.message);
      return response.data.data;
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Something went wrong");
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

export const getAllJobTitle = createAsyncThunk<
  { data: JobTitle[]; total: number; totalPages: number; currentPage: number },
  { page?: number; showStatus?: string | number; search?: string } | void
>(
  "jobTitles/getAll",
  async (params = { page: 1, showStatus: 1, search: "" }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL_JOB}/jobTitles/list`, params, getAuthAdminHeaders());
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

export const getJobTitleById = createAsyncThunk<JobTitle, number>(
  "jobTitles/getById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL_JOB}/jobTitles/${id}`, getAuthAdminHeaders());
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);


export const updateJobTitle = createAsyncThunk<
  JobTitle, // Return type
  { id: number; updateData: JobTitle } // Argument type
>(
  "jobTitles/update",
  async ({ id, updateData }: UpdateJobTitlePayload, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${BASE_URL_JOB}/jobTitles/update/${id}`, updateData, getAuthAdminHeaders(false));
      toast.success(response.data.message);
      return response.data.data;
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to update jobTitles");
      return rejectWithValue(error.response?.data?.message);
    }
  }
);


export const deleteJobTitle = createAsyncThunk<number, number>(
  "jobTitles/delete",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${BASE_URL_JOB}/jobTitles/delete/${id}`, getAuthAdminHeaders());
      toast.success(response.data.message);
      return id;
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to delete jobTitles");
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

const jobTitleSlice = createSlice({
  name: "jobTitles",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // CREATE
      .addCase(createJobTitle.pending, (state) => {
        state.loading = true;
      })
      .addCase(createJobTitle.fulfilled, (state, action:PayloadAction<JobTitle>) => {
        state.loading = false;
        state.JobTitleList.unshift(action.payload);
      })
      .addCase(createJobTitle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // GET ALL
      .addCase(getAllJobTitle.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllJobTitle.fulfilled, (state, action) => {
        state.loading = false;
        state.JobTitleList = action.payload.data;
        state.total = action.payload.total;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
      })
      .addCase(getAllJobTitle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // GET BY ID
      .addCase(getJobTitleById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getJobTitleById.fulfilled, (state, action:PayloadAction<JobTitle>) => {
        state.loading = false;
        state.selectedJobTitle = action.payload;
      })
      .addCase(getJobTitleById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // UPDATE
      .addCase(updateJobTitle.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateJobTitle.fulfilled, (state, action: PayloadAction<JobTitle>) => {
        state.loading = false;
        state.JobTitleList = state.JobTitleList.map((edu) =>
          edu.id === action.payload.id ? action.payload : edu
        );
      })
      .addCase(updateJobTitle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // DELETE
      .addCase(deleteJobTitle.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteJobTitle.fulfilled, (state, action:PayloadAction<number>) => {
        state.loading = false;
        state.JobTitleList = state.JobTitleList.filter((edu) => edu.id !== action.payload);
      })
      .addCase(deleteJobTitle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default jobTitleSlice.reducer;
