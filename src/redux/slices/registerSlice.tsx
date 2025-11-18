import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import BASE_URL_JOB from "../../config/config";

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
}

const initialState: RegisterState = {
    loading: false,
    emailVerified: false,
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
        return response.data;
    } catch (error: any) {
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
        return rejectWithValue(error.response?.data?.message || "Email verification failed");
    }
});


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
            .addCase(registerEmployee.pending, (state) => {
                state.loading = true;
                state.error = undefined;
                state.message = undefined;
            })
            .addCase(
                registerEmployee.fulfilled,
                (state, action: PayloadAction<RegisterResponse>) => {
                    state.loading = false;
                    state.employee = action.payload.data;
                    state.verificationCode = action.payload.verificationCode;
                    state.message = action.payload.message;
                }
            )
            .addCase(registerEmployee.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Something went wrong";
            });
        // Email Verification
        builder
            .addCase(verifyEmail.pending, (state) => {
                state.loading = true;
                state.error = undefined;
                state.message = undefined;
            })
            .addCase(verifyEmail.fulfilled, (state, action: PayloadAction<VerifyEmailResponse>) => {
                state.loading = false;
                state.emailVerified = true;
                state.message = action.payload.message;
            })
            .addCase(verifyEmail.rejected, (state, action) => {
                state.loading = false;
                state.emailVerified = false;
                state.error = action.payload || "Email verification failed";
            });
    },
});

export const { clearRegisterState } = registerSlice.actions;
export default registerSlice.reducer;
