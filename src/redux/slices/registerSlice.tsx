import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import BASE_URL_JOB from "../../config/config";
import { toast } from "react-toastify";

// Types
export interface EmployeeData {
    id: number;
    selfOrOther: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    emailVerification: number;
    verificationCode: string;
    captcha: string;
    city: string;
    ipAddress: string;
    createdAt: string;
    updatedAt: string;
    status: number;
    trash: number;
}

export interface RegisterState {
    loading: boolean;
    employee?: EmployeeData;
    verificationCode?: string;
    message?: string;
    error?: string;
    emailVerified?: boolean;
    verificationData: any;
    verificationDataEmployer: any;
}

const initialState: RegisterState = {
    loading: false,
    emailVerified: false,
    verificationData: null,
    verificationDataEmployer:null,
};

// Request body type
interface RegisterPayload {
    selfOrOther: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    captcha: string;
    city: string;
    ipAddress: string;
}

interface VerifyEmailPayload {
    code: string;
}

// Response type
interface RegisterResponse {
    status: boolean;
    message: string;
    data: EmployeeData;
    verificationCode: string;
}

interface VerifyEmailResponse {
    status: boolean;
    message: string;
}


// Async thunk
export const registerEmployee = createAsyncThunk<
    RegisterResponse,
    RegisterPayload,
    { rejectValue: string }
>("employee/registerEmployee", async (payload, { rejectWithValue }) => {
    try {
        const response = await axios.post<RegisterResponse>(
            `${BASE_URL_JOB}/employees/register`,
            payload
        );
        toast.success(response.data.message);
        return response.data;
    } catch (error: any) {
        toast.error(error.response?.data?.message);
        return rejectWithValue(error.response?.data?.message || "Registration failed");
    }
});

// Verify Email
export const verifyEmail = createAsyncThunk<
    VerifyEmailResponse,
    VerifyEmailPayload,
    { rejectValue: string }
>("employee/verifyEmail", async (payload, { rejectWithValue }) => {
    try {
        const response = await axios.post<VerifyEmailResponse>(`${BASE_URL_JOB}/employees/verify-email`, payload);
        return response.data;
    } catch (error: any) {
        toast.error(error.response?.data?.message);
        return rejectWithValue(error.response?.data?.message || "Email verification failed");
    }
});

export const registerEmployer = createAsyncThunk<
    RegisterResponse,
    RegisterPayload,
    { rejectValue: string }
>("employer/registerEmployee", async (payload, { rejectWithValue }) => {
    try {
        const response = await axios.post<RegisterResponse>(
            `${BASE_URL_JOB}/employer/register`,
            payload
        );
        toast.success(response.data.message);
        return response.data;
    } catch (error: any) {
        toast.error(error.response?.data?.message);
        return rejectWithValue(error.response?.data?.message || "Registration failed");
    }
});

export const sendVerificationEmail = createAsyncThunk(
    "employees/resendLink",
    async (email: string, { rejectWithValue }) => {
        try {
            const res = await axios.post<RegisterResponse>(
                `${BASE_URL_JOB}/employees/resendLink`,
                { email }
            );
            toast.success(res.data.message)
            return res.data;
        } catch (error: any) {
            toast.error(error.response?.data?.message);
            return rejectWithValue(error.response?.data?.message || "Something went wrong");
        }
    }
);

export const sendVerificationEmailEmployer = createAsyncThunk(
    "employer/resendLink",
    async (email: string, { rejectWithValue }) => {
        try {
            const res = await axios.post<RegisterResponse>(
                `${BASE_URL_JOB}/employer/resendLink`,
                { email }
            );
            toast.success(res.data.message)
            return res.data;
        } catch (error: any) {
            toast.error(error.response?.data?.message);
            return rejectWithValue(error.response?.data?.message || "Something went wrong");
        }
    }
);

const registerSlice = createSlice({
    name: "register",
    initialState,
    reducers: {
        clearRegisterState(state) {
            state.loading = false;
            state.employee = undefined;
            state.verificationCode = undefined;
            state.message = undefined;
            state.error = undefined;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerEmployer.pending, (state) => {
                state.loading = true;
                state.error = undefined;
                state.message = undefined;
            })
            .addCase(
                registerEmployer.fulfilled,
                (state, action: PayloadAction<RegisterResponse>) => {
                    state.loading = false;
                    state.employee = action.payload.data;
                    state.verificationCode = action.payload.verificationCode;
                    state.message = action.payload.message;
                }
            )
            .addCase(registerEmployer.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Something went wrong";
            });
        builder
            .addCase(sendVerificationEmail.pending, (state) => {
                state.loading = true;
            })
            .addCase(sendVerificationEmail.fulfilled, (state, action) => {
                state.loading = false;
                state.verificationData = action.payload;
            })
            .addCase(sendVerificationEmail.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
        builder
            .addCase(sendVerificationEmailEmployer.pending, (state) => {
                state.loading = true;
            })
            .addCase(sendVerificationEmailEmployer.fulfilled, (state, action) => {
                state.loading = false;
                state.verificationDataEmployer = action.payload;
            })
            .addCase(sendVerificationEmailEmployer.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { clearRegisterState } = registerSlice.actions;
export default registerSlice.reducer;
