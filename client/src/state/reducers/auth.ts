import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserInfo } from "../interfaces";
interface tokenState {
  isLoggedIn: boolean;
  user: UserInfo | null;
}
const initialState: tokenState = {
  isLoggedIn: false,
  user: null,
};

const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    changeAuthStatus(state, action: PayloadAction<boolean>) {
      state.isLoggedIn = action.payload;
    },
    setUser(state, action: PayloadAction<UserInfo>) {
      state.user = action.payload;
    },
  },
});

export const { changeAuthStatus, setUser } = auth.actions;
export default auth.reducer;
