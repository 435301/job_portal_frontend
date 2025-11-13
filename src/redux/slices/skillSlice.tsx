
import { createSlice, createAsyncThunk ,PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import BASE_URL_JOB from "../../config/config";
import getAuthAdminHeaders from "../../utils/auth";

export interface Skill {
  id: number;
  skillName: string;
  status: number;
  createdBy?: number;
  updatedBy?: number;
  createdAt?: string;
  updatedAt?: string;
  trash?: number;
}

interface SkillState {
  loading: boolean;
  skillList: Skill[];
  total: number;
  totalPages: number;
  currentPage: number;
  selectedSkill: Skill | null;
  error: string | null;
}

const initialState: SkillState = {
  loading: false,
  skillList: [],
  total: 0,
  totalPages: 1,
  currentPage: 1,
  selectedSkill: null,
  error: null,
};

interface UpdateSkillPayload {
  id: number;
  updateData: Skill;
}

export const createSkill = createAsyncThunk<Skill, any>(
  "skills/create",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL_JOB}/skills/create`, formData, getAuthAdminHeaders(false));
      toast.success(response.data.message);
      return response.data.data;
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Something went wrong");
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

export const getAllSkills = createAsyncThunk<
  { data: Skill[]; total: number; totalPages: number; currentPage: number },
  { page?: number; showStatus?: string | number; search?: string } | void
>(
  "skills/getAll",
  async (params = { page: 1, showStatus: 1, search: "" }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL_JOB}/skills/list`, params, getAuthAdminHeaders());
      return response.data;
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to fetch skills");
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

export const getSkillById = createAsyncThunk<Skill, number>(
  "skills/getById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL_JOB}/skills/${id}`, getAuthAdminHeaders());
      return response.data.data;
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to fetch skills");
      return rejectWithValue(error.response?.data?.message);
    }
  }
);


export const updateSkill = createAsyncThunk<
  Skill, // Return type
  { id: number; updateData: Skill } // Argument type
>(
  "skills/update",
  async ({ id, updateData }: UpdateSkillPayload, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${BASE_URL_JOB}/skills/update/${id}`, updateData, getAuthAdminHeaders(false));
      toast.success(response.data.message);
      return response.data.data;
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to update skills");
      return rejectWithValue(error.response?.data?.message);
    }
  }
);


export const deleteSkill = createAsyncThunk<number, number>(
  "skills/delete",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${BASE_URL_JOB}/skills/delete/${id}`, getAuthAdminHeaders());
      toast.success(response.data.message);
      return id;
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to delete skills");
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

const skillSlice = createSlice({
  name: "skill",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // CREATE
      .addCase(createSkill.pending, (state) => {
        state.loading = true;
      })
      .addCase(createSkill.fulfilled, (state, action:PayloadAction<Skill>) => {
        state.loading = false;
        state.skillList.unshift(action.payload);
      })
      .addCase(createSkill.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // GET ALL
      .addCase(getAllSkills.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllSkills.fulfilled, (state, action) => {
        state.loading = false;
        state.skillList = action.payload.data;
        state.total = action.payload.total;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
      })
      .addCase(getAllSkills.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // GET BY ID
      .addCase(getSkillById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSkillById.fulfilled, (state, action:PayloadAction<Skill>) => {
        state.loading = false;
        state.selectedSkill = action.payload;
      })
      .addCase(getSkillById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // UPDATE
      .addCase(updateSkill.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateSkill.fulfilled, (state, action: PayloadAction<Skill>) => {
        state.loading = false;
        state.skillList = state.skillList.map((edu) =>
          edu.id === action.payload.id ? action.payload : edu
        );
      })
      .addCase(updateSkill.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // DELETE
      .addCase(deleteSkill.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteSkill.fulfilled, (state, action:PayloadAction<number>) => {
        state.loading = false;
        state.skillList = state.skillList.filter((edu) => edu.id !== action.payload);
      })
      .addCase(deleteSkill.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default skillSlice.reducer;
