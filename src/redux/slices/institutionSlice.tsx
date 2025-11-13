
import { createSlice, createAsyncThunk ,PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import BASE_URL_JOB from "../../config/config";
import getAuthAdminHeaders from "../../utils/auth";

export interface Institution {
  id: number;
  institutionName: string;
  status: number;
  createdBy?: number;
  updatedBy?: number;
  createdAt?: string;
  updatedAt?: string;
  trash?: number;
}

interface InstitutionState {
  loading: boolean;
  institutionList: Institution[];
  total: number;
  totalPages: number;
  currentPage: number;
  selectedInstitution: Institution | null;
  error: string | null;
}

const initialState: InstitutionState = {
  loading: false,
  institutionList: [],
  total: 0,
  totalPages: 1,
  currentPage: 1,
  selectedInstitution: null,
  error: null,
};

interface UpdateInstitutionPayload {
  id: number;
  updateData: Institution;
}

export const createInstitution = createAsyncThunk<Institution, any>(
  "institutions/create",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL_JOB}/institutions/create`, formData, getAuthAdminHeaders(false));
      toast.success(response.data.message);
      return response.data.data;
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Something went wrong");
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

export const getAllInstitutions = createAsyncThunk<
  { data: Institution[]; total: number; totalPages: number; currentPage: number },
  { page?: number; showStatus?: string | number; search?: string } | void
>(
  "institutions/getAll",
  async (params = { page: 1, showStatus: 1, search: "" }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL_JOB}/institutions/list`, params, getAuthAdminHeaders());
      return response.data;
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to fetch institutions");
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

export const getInstitutionById = createAsyncThunk<Institution, number>(
  "institutions/getById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL_JOB}/institutions/${id}`, getAuthAdminHeaders());
      return response.data.data;
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to fetch institutions");
      return rejectWithValue(error.response?.data?.message);
    }
  }
);


export const updateInstitution = createAsyncThunk<
  Institution, // Return type
  { id: number; updateData: Institution } // Argument type
>(
  "institutions/update",
  async ({ id, updateData }: UpdateInstitutionPayload, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${BASE_URL_JOB}/institutions/update/${id}`, updateData, getAuthAdminHeaders(false));
      toast.success(response.data.message);
      return response.data.data;
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to update institutions");
      return rejectWithValue(error.response?.data?.message);
    }
  }
);


export const deleteInstitution = createAsyncThunk<number, number>(
  "institutions/delete",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${BASE_URL_JOB}/institutions/delete/${id}`, getAuthAdminHeaders());
      toast.success(response.data.message);
      return id;
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to delete institutions");
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

const InstitutionSlice = createSlice({
  name: "institutions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // CREATE
      .addCase(createInstitution.pending, (state) => {
        state.loading = true;
      })
      .addCase(createInstitution.fulfilled, (state, action:PayloadAction<Institution>) => {
        state.loading = false;
        state.institutionList.unshift(action.payload);
      })
      .addCase(createInstitution.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // GET ALL
      .addCase(getAllInstitutions.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllInstitutions.fulfilled, (state, action) => {
        state.loading = false;
        state.institutionList = action.payload.data;
        state.total = action.payload.total;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
      })
      .addCase(getAllInstitutions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // GET BY ID
      .addCase(getInstitutionById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getInstitutionById.fulfilled, (state, action:PayloadAction<Institution>) => {
        state.loading = false;
        state.selectedInstitution = action.payload;
      })
      .addCase(getInstitutionById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // UPDATE
      .addCase(updateInstitution.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateInstitution.fulfilled, (state, action: PayloadAction<Institution>) => {
        state.loading = false;
        state.institutionList = state.institutionList.map((edu) =>
          edu.id === action.payload.id ? action.payload : edu
        );
      })
      .addCase(updateInstitution.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // DELETE
      .addCase(deleteInstitution.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteInstitution.fulfilled, (state, action:PayloadAction<number>) => {
        state.loading = false;
        state.institutionList = state.institutionList.filter((edu) => edu.id !== action.payload);
      })
      .addCase(deleteInstitution.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default InstitutionSlice.reducer;
