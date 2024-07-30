import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  role: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (prevState, action) => {
      prevState.email = action.payload.email;
      prevState.role = action.payload.role;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
