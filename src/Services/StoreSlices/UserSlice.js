import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  IsAuthenticated: undefined,
  Name: "ثبت نشده",
};

export const UserSlice = createSlice({
  name: "UserSlice",
  initialState,
  reducers: {
    SetUserInfo: (state, action) => (state = action.payload),
    SetIsAuthecticated: (state, action) => {
      state.IsAuthenticated = action.payload;
    },
    SetName: (state, action) => {
      state.Name = action.payload;
    },
  },
});

export const { SetUserInfo, SetIsAuthecticated, SetName } = UserSlice.actions;
export const GetUserInfo = (state) => state.user;
export const IsAuthenticated = (state) => state.user.IsAuthenticated;
export const GetUserFullName = (state) => state.user.Name;

export default UserSlice.reducer;
