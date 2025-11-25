import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import BASE_URL_JOB from "../../config/config";
import getAuthAdminHeaders from "../../utils/auth";
import { toast } from "react-toastify";

interface EmployeeProfileState {
  loading: boolean;
  data: any | null;
  error: string | null;
  list: string[];
  certificateList: any[];
  employmentList: any[];
}

const initialState: EmployeeProfileState = {
  loading: false,
  data: null,
  error: null,
  list: [],
  certificateList: [],
  employmentList: [],
};

const employeeId = JSON.parse(localStorage.getItem("employee") ?? "{}")?.id;

export const fetchEmployeeProfile = createAsyncThunk(
  "employees/profile",
  async (employeeId: number, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL_JOB}/employees/profile/${employeeId}`, getAuthAdminHeaders());
      return response.data; // {status, message, data}
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch employee profile"
      );
    }
  }
);

export const updatePersonalDetails = createAsyncThunk(
  "employee/updatePersonalDetails",
  async (formData: any, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${BASE_URL_JOB}/employees/updatePersonalDetails`, formData, getAuthAdminHeaders(false),);
      toast.success(response.data.message)
      return response.data; // { status, message, data }
    } catch (err: any) {
      return rejectWithValue(err.response?.data || "Something went wrong");
    }
  }
);

export const updateProfileTitle = createAsyncThunk(
  "employee/updateProfileTitle",
  async (newTitle: string, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL_JOB}/employees/updateProfileTitle`, {
        profileTitle: newTitle
      }, getAuthAdminHeaders(false),);
      toast.success(response.data.message)
      return { newTitle };
    } catch (err: any) {
      return rejectWithValue(err.response?.data || "Something went wrong");
    }
  }
);

export const addKeySkills = createAsyncThunk(
  "employee/addKeySkills",
  async (skillIds: number[], { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.post(`${BASE_URL_JOB}/employees/addKeySkills`, { skillIds }, getAuthAdminHeaders(false));
      toast.success(response.data.message);
      if (employeeId) {
        await dispatch(fetchEmployeeProfile(employeeId));
      }
      return {
        addedSkills: skillIds,
        message: response.data.message
      };
    } catch (err: any) {
      return rejectWithValue(err.response?.data || "Something went wrong");
    }
  }
);

export const removeKeySkill = createAsyncThunk(
  "employee/removeKeySkill",
  async (skillId: number, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.delete(`${BASE_URL_JOB}/employees/removeKeySkill/${skillId}`,
        getAuthAdminHeaders(false)
      );
      toast.success(response.data.message);
      const employeeId = JSON.parse(localStorage.getItem("employee") ?? "{}")?.id;
      if (employeeId) {
        await dispatch(fetchEmployeeProfile(employeeId));
      }
      return { removedSkillId: skillId };
    } catch (err: any) {
      return rejectWithValue(err.response?.data || "Something went wrong");
    }
  }
);

export const addITSkill = createAsyncThunk(
  "employee/addITSkill",
  async (data: {
    skillId: number;
    version?: string;
    lastUsedYear?: number;
    expYears: number;
    expMonths: number;
  }, { rejectWithValue, dispatch }) => {
    try {
      const res = await axios.post(`${BASE_URL_JOB}/employees/addITSkill`, data, getAuthAdminHeaders(false));
      toast.success(res.data.message);
      if (employeeId) {
        await dispatch(fetchEmployeeProfile(employeeId));
      }
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || "Something went wrong");
    }
  }
);

export const updateITSkill = createAsyncThunk(
  "employee/updateITSkill",
  async (
    {
      id,
      payload,
    }: {
      id: number;
      payload: {
        version?: string;
        lastUsedYear?: number | string;
        expYears: number;
        expMonths: number;
      };
    },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const res = await axios.put(`${BASE_URL_JOB}/employees/updateITSkill/${id}`, payload, getAuthAdminHeaders(false));
      toast.success(res.data.message);
      if (employeeId) {
        await dispatch(fetchEmployeeProfile(employeeId));
      }
      return res.data.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || "Something went wrong");
    }
  }
);
//ceriticate 
export const addCertificate = createAsyncThunk(
  "employees/addCertificate",
  async (payload: { certificateName: string; issuedBy: string }, { rejectWithValue, dispatch }) => {
    try {
      const res = await axios.post(`${BASE_URL_JOB}/employees/addCertificate`, payload, getAuthAdminHeaders(false));
      toast.success(res.data.message);
      if (employeeId) {
        await dispatch(fetchEmployeeProfile(employeeId));
      }
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const updateCertificate = createAsyncThunk(
  "employees/editCertificate",
  async (
    { id, payload }: { id: number; payload: { certificateName: string; issuedBy: string }, },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const res = await axios.put(`${BASE_URL_JOB}/employees/editCertificate/${id}`, payload, getAuthAdminHeaders(false));
      toast.success(res.data.message);
      if (employeeId) {
        await dispatch(fetchEmployeeProfile(employeeId));
      }
      return res.data.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const deleteCertificate = createAsyncThunk(
  "certificates/delete",
  async (id: number, { rejectWithValue, dispatch }) => {
    try {
      const res = await axios.delete(`${BASE_URL_JOB}/employees/deleteCertificate/${id}`, getAuthAdminHeaders());
      toast.success(res.data.message);
      if (employeeId) {
        await dispatch(fetchEmployeeProfile(employeeId));
      }
      return id;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

//employement 
export const addEmployment = createAsyncThunk(
  "employees/addEmployment",
  async (payload: any, { rejectWithValue, dispatch }) => {
    try {
      const res = await axios.post(`${BASE_URL_JOB}/employees/addEmployment`, payload, getAuthAdminHeaders(false));
      toast.success(res.data.message);
      if (employeeId) {
        await dispatch(fetchEmployeeProfile(employeeId));
      }
      return res.data.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const updateEmployment = createAsyncThunk(
  "employees/editEmployment",
  async (
    { id, payload }: { id: number; payload: any },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const res = await axios.put(`${BASE_URL_JOB}/employees/editEmployment/${id}`, payload, getAuthAdminHeaders(false));
      toast.success(res.data.message);
      if (employeeId) {
        await dispatch(fetchEmployeeProfile(employeeId));
      }
      return res.data.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const deleteEmployment = createAsyncThunk(
  "deleteEmployment/delete",
  async (id: number, { rejectWithValue, dispatch }) => {
    try {
      const res = await axios.delete(`${BASE_URL_JOB}/employees/deleteEmployment/${id}`, getAuthAdminHeaders());
      toast.success(res.data.message);
      if (employeeId) {
        await dispatch(fetchEmployeeProfile(employeeId));
      }
      return id;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);
const employeeProfileSlice = createSlice({
  name: "employeeProfile",
  initialState,
  reducers: {
    clearEmployeeProfile(state) {
      state.data = null;
      state.error = null;
      state.loading = false;
    }
  },
  extraReducers: (builder) => {
    //fetch profile details
    builder
      .addCase(fetchEmployeeProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmployeeProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
      })
      .addCase(fetchEmployeeProfile.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      });

    //update profile details
    builder
      .addCase(updatePersonalDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePersonalDetails.fulfilled, (state, action) => {
        state.loading = false;
        if (state.data) {
          state.data.personalDetails = {
            ...state.data.personalDetails,
            ...action.payload.data,
          };
        }
      })
      .addCase(updatePersonalDetails.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      });
    //update profile title
    builder
      .addCase(updateProfileTitle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfileTitle.fulfilled, (state, action) => {
        state.loading = false;
        if (state.data && state.data.profileTitle?.length > 0) {
          state.data.profileTitle[0].title = action.payload.newTitle;
        }
      })
      .addCase(updateProfileTitle.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      });
    //edit skills
    builder
      .addCase(addKeySkills.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addKeySkills.fulfilled, (state, action) => {
        state.loading = false;
        const newSkillIds = action.payload.addedSkills;
        if (state.data && state.data.keySkills) {
          const existingSkillIds = state.data.keySkills.map((s: any) => s.skillId);
          newSkillIds.forEach((id) => {
            if (!existingSkillIds.includes(id)) {
              state.data.keySkills.push({
                skillId: id,
                skillName: "", // You can fill after fetching skills master
              });
            }
          });
        }
      })
      .addCase(addKeySkills.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      });
    // delete skill
    builder
      .addCase(removeKeySkill.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeKeySkill.fulfilled, (state, action) => {
        state.loading = false;
        if (state.data?.keySkills) {
          state.data.keySkills = state.data.keySkills.filter(
            (item: any) => item.skillId !== action.payload.removedSkillId
          );
        }
      })
      .addCase(removeKeySkill.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      });
    builder
      // ADD  IT skills
      .addCase(addITSkill.pending, (state) => {
        state.loading = true;
      })
      .addCase(addITSkill.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addITSkill.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      })
    builder
      // UPDATE It skills
      .addCase(updateITSkill.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateITSkill.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload; // replace list with server updated list
      })
      .addCase(updateITSkill.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      });
    builder
      .addCase(addCertificate.pending, (state) => {
        state.loading = true;
      })
      .addCase(addCertificate.fulfilled, (state, action: any) => {
        state.loading = false;
        state.certificateList = action.payload;

      })
      .addCase(addCertificate.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      });
    builder
      .addCase(updateCertificate.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCertificate.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.certificateList = action.payload;
        }
      })
      .addCase(updateCertificate.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      });
    builder
      .addCase(deleteCertificate.fulfilled, (state, action: any) => {
        state.loading = false;
        state.certificateList = state.certificateList.filter((item) => item.id !== action.payload);
      });
    builder
      // ADD Employment
      .addCase(addEmployment.pending, (state) => {
        state.loading = true;
      })
      .addCase(addEmployment.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addEmployment.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      });
    builder
      .addCase(updateEmployment.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateEmployment.fulfilled, (state, action: any) => {
        state.loading = false;
        const updated = action.payload.data;
        state.employmentList = state.employmentList.map((item) =>
          item.id === updated.id ? updated : item
        );
      })
      .addCase(updateEmployment.rejected, (state, action: any) => {
        state.error = action.payload;
      })
    builder
      .addCase(deleteEmployment.fulfilled, ((state, action: any) => {
        state.employmentList = state.employmentList.filter((item) => item.id! = action.payload);
      }))
  },
});

export const { clearEmployeeProfile } = employeeProfileSlice.actions;

export default employeeProfileSlice.reducer;
