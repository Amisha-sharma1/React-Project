import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { get } from "superagent";
import axios from "axios";
import { Action } from "@remix-run/router";

// export const DeleteUser = createAsyncThunk("")
export interface usersState {
  users: any[];
  hobby: [] | null;
  loading: boolean;
  error: string | null;
}

const initialState: usersState = {
  users: [],
  hobby: null,
  loading: false,
  error: null,
};

// First, create the thunk
export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response: any = await get("http://localhost:3000/users");
  return response.body;
});

export const addNew = createAsyncThunk("users/addNew", async (data: object) => {
  const response: any = await axios.post("http://localhost:3000/users", data);
  return response.data;
});

export const editUsers = createAsyncThunk(
  "users/editUsers",
  async (data: any) => {
    const response: any = await axios.put(
      `http://localhost:3000/users/${data.id}`,
      data.values
    );
    console.log("response put", response);
    return response.data;
  }
);

export const deleteUsers = createAsyncThunk(
  "users/deleteUsers",
  async (id: any) => {
    const response: any = await axios.delete(
      `http://localhost:3000/users/${id}`
    );
    console.log("response dlt", response);
  }
);

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setHobby: (state, action) => {
      state.hobby = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchUsers.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      console.log("error");
      state.error = "something went wrong";
      state.loading = false;
    });
  },
});
export const {setHobby } = usersSlice.actions;
// Action creators are generated for each case reducer function
export default usersSlice.reducer;
