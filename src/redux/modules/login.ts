import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { get } from "superagent";

// First, create the thunk
export const postUsers = createAsyncThunk(
  "userslogin/postUsers",
  async (data: object) => {
    const response: any = await axios.post(
      "http://localhost:3000/userslogin",
      data
    );
    return response.data;
  }
);

export const fetchVerified = createAsyncThunk(
  "userslogin/fetchVerified",
  async () => {
    const response: any = await get("http://localhost:3000/userslogin");
    return response.body;
  }
)

export interface usersState {
  users: any;
  userslogin: any[];
  loading: boolean;
  error: string | null;
}

const initialState: usersState = {
  userslogin: [],
  loading: false,
  error: null,
  users: undefined
};

export const usersSlice = createSlice({
  name: "userslogin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(postUsers.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(postUsers.fulfilled, (state, action) => {
      state.loading = false;
      // state.userslogin = action.payload;
    });
    builder.addCase(postUsers.rejected, (state, action) => {
      console.log("error");
      state.error = "something went wrong";
      state.loading = false;
    });
    builder.addCase(fetchVerified.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchVerified.fulfilled, (state, action) => {
      state.loading = false;
      state.userslogin = action.payload;
    });
    builder.addCase(fetchVerified.rejected, (state, action) => {
      console.log("error");
      state.error = "something went wrong";
      state.loading = false;
    });
  },
});

// Action creators are generated for each case reducer function

export default usersSlice.reducer;
