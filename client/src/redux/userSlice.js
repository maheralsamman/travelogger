import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: {},
    onboarded: false
  },
  reducers: {
    setUser: (state, action) => {
        state.user = action.payload
    },
    onboard: (state) => {
      state.onboarded = true;
    }
  },
})

export const { setUser, onboard } = userSlice.actions
export const selectUser = state => state.user

export default userSlice.reducer