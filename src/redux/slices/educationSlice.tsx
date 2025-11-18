
import { createSlice, createAsyncThunk ,PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import BASE_URL_JOB from "../../config/config";
import getAuthAdminHeaders from "../../utils/auth";

export interface Education {
  id: number;
  educationName: string;
  status: number;
  createdBy?: number;
  updatedBy?: number;
  createdAt?: string;
  updatedAt?: string;
  trash?: number;
}

interface EducationState {
  loading: boolean;
  educationList: Education[];
  total: number;
  totalPages: number;
  currentPage: number;
  selectedEducation: Education | null;
  error: string | null;
}

const initialState: EducationState = {
  loading: false,
  educationList: [],
  total: 0,
  totalPages: 1,
  currentPage: 1,
  selectedEducation: null,
  error: null,
};

interface UpdateEducationPayload {
  id: number;
  updateData: Education;
}

export const createEducation = createAsyncThunk<Education, any>(
  "education/create",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL_JOB}/educations/create`, formData, getAuthAdminHeaders(false));
      toast.success(response.data.message);
      return response.data.data;
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Something went wrong");
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

export const getAllEducations = createAsyncThunk<
  { data: Education[]; total: number; totalPages: number; currentPage: number },
  { page?: number; showStatus?: string | number; search?: string } | void
>(
  "education/getAll",
  async (params = { page: 1, showStatus: 1, search: "" }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL_JOB}/educations/list`, params, getAuthAdminHeaders());
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

export const getEducationById = createAsyncThunk<Education, number>(
  "education/getById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL_JOB}/educations/${id}`, getAuthAdminHeaders());
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);


export const updateEducation = createAsyncThunk<
  Education, // Return type
  { id: number; updateData: Education } // Argument type
>(
  "education/update",
  async ({ id, updateData }: UpdateEducationPayload, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${BASE_URL_JOB}/educations/update/${id}`, updateData, getAuthAdminHeaders(false));
      toast.success(response.data.message);
      return response.data.data;
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to update education");
      return rejectWithValue(error.response?.data?.message);
    }
  }
);


export const deleteEducation = createAsyncThunk<number, number>(
  "education/delete",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${BASE_URL_JOB}/educations/delete/${id}`, getAuthAdminHeaders());
      toast.success(response.data.message);
      return id;
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to delete education");
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

const educationSlice = createSlice({
  name: "education",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // CREATE
      .addCase(createEducation.pending, (state) => {
        state.loading = true;
      })
      .addCase(createEducation.fulfilled, (state, action:PayloadAction<Education>) => {
        state.loading = false;
        state.educationList.unshift(action.payload);
      })
      .addCase(createEducation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // GET ALL
      .addCase(getAllEducations.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllEducations.fulfilled, (state, action) => {
        state.loading = false;
        state.educationList = action.payload.data;
        state.total = action.payload.total;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
      })
      .addCase(getAllEducations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // GET BY ID
      .addCase(getEducationById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getEducationById.fulfilled, (state, action:PayloadAction<Education>) => {
        state.loading = false;
        state.selectedEducation = action.payload;
      })
      .addCase(getEducationById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // UPDATE
      .addCase(updateEducation.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateEducation.fulfilled, (state, action: PayloadAction<Education>) => {
        state.loading = false;
        state.educationList = state.educationList.map((edu) =>
          edu.id === action.payload.id ? action.payload : edu
        );
      })
      .addCase(updateEducation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // DELETE
      .addCase(deleteEducation.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteEducation.fulfilled, (state, action:PayloadAction<number>) => {
        state.loading = false;
        state.educationList = state.educationList.filter((edu) => edu.id !== action.payload);
      })
      .addCase(deleteEducation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default educationSlice.reducer;
