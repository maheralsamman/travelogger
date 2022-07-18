import { createSlice } from '@reduxjs/toolkit'

const initialState = [];

export const tripSlice = createSlice({
  name: 'trips',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    },
  },
})

export const { increment, decrement, incrementByAmount } = tripSlice.actions

export default tripSlice.reducer