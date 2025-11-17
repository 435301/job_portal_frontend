
import { createSlice, createAsyncThunk ,PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import BASE_URL_JOB from "../../config/config";
import getAuthAdminHeaders from "../../utils/auth";

export interface Experience {
  id: number;
  experienceName: string;
  status: number;
  createdBy?: number;
  updatedBy?: number;
  createdAt?: string;
  updatedAt?: string;
  trash?: number;
}

interface ExperienceState {
  loading: boolean;
  experienceList: Experience[];
  total: number;
  totalPages: number;
  currentPage: number;
  selectedExperience: Experience | null;
  error: string | null;
}

const initialState: ExperienceState = {
  loading: false,
  experienceList: [],
  total: 0,
  totalPages: 1,
  currentPage: 1,
  selectedExperience: null,
  error: null,
};

interface UpdateExperiencePayload {
  id: number;
  updateData: Experience;
}

export const createExperience = createAsyncThunk<Experience, any>(
  "experiences/create",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL_JOB}/experiences/create`, formData, getAuthAdminHeaders(false));
      toast.success(response.data.message);
      return response.data.data;
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Something went wrong");
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

export const getAllExperiences = createAsyncThunk<
  { data: Experience[]; total: number; totalPages: number; currentPage: number },
  { page?: number; showStatus?: string | number; search?: string } | void
>(
  "experiences/getAll",
  async (params = { page: 1, showStatus: 1, search: "" }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL_JOB}/experiences/list`, params, getAuthAdminHeaders());
      return response.data;
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to fetch experiences");
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

export const getExperienceById = createAsyncThunk<Experience, number>(
  "experiences/getById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL_JOB}/experiences/${id}`, getAuthAdminHeaders());
      return response.data.data;
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to fetch experiences");
      return rejectWithValue(error.response?.data?.message);
    }
  }
);


export const updateExperience = createAsyncThunk<
  Experience, // Return type
  { id: number; updateData: Experience } // Argument type
>(
  "experiences/update",
  async ({ id, updateData }: UpdateExperiencePayload, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${BASE_URL_JOB}/experiences/update/${id}`, updateData, getAuthAdminHeaders(false));
      toast.success(response.data.message);
      return response.data.data;
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to update experiences");
      return rejectWithValue(error.response?.data?.message);
    }
  }
);


export const deleteExperience= createAsyncThunk<number, number>(
  "experiences/delete",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${BASE_URL_JOB}/experiences/delete/${id}`, getAuthAdminHeaders());
      toast.success(response.data.message);
      return id;
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to delete experiences");
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

const experienceSlice = createSlice({
  name: "experience",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // CREATE
      .addCase(createExperience.pending, (state) => {
        state.loading = true;
      })
      .addCase(createExperience.fulfilled, (state, action:PayloadAction<Experience>) => {
        state.loading = false;
        state.experienceList.unshift(action.payload);
      })
      .addCase(createExperience.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // GET ALL
      .addCase(getAllExperiences.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllExperiences.fulfilled, (state, action) => {
        state.loading = false;
        state.experienceList = action.payload.data;
        state.total = action.payload.total;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
      })
      .addCase(getAllExperiences.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // GET BY ID
      .addCase(getExperienceById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getExperienceById.fulfilled, (state, action:PayloadAction<Experience>) => {
        state.loading = false;
        state.selectedExperience = action.payload;
      })
      .addCase(getExperienceById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // UPDATE
      .addCase(updateExperience.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateExperience.fulfilled, (state, action: PayloadAction<Experience>) => {
        state.loading = false;
        state.experienceList = state.experienceList.map((edu) =>
          edu.id === action.payload.id ? action.payload : edu
        );
      })
      .addCase(updateExperience.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // DELETE
      .addCase(deleteExperience.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteExperience.fulfilled, (state, action:PayloadAction<number>) => {
        state.loading = false;
        state.experienceList = state.experienceList.filter((edu) => edu.id !== action.payload);
      })
      .addCase(deleteExperience.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default experienceSlice.reducer;
