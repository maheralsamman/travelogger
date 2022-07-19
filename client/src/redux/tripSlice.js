import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const urlTrips = "http://localhost:3001/api/trips"

export const getAlltrips = createAsyncThunk(
  'getAlltrips',
  async () => {
        const data = await fetch(urlTrips);
        const trips = await data.json()
        if (Object.keys(trips).length) {
          return trips;
        }
  },
);


export const postTrip = createAsyncThunk('postTrip',
  async (trip) => {
        const trips = await fetch(urlTrips, {
          method: 'POST',
          body: JSON.stringify(trip),
          headers:{
            'Content-Type': 'application/json',
          }
        });
        const data = await trips.json();
          return data;
  },
  {
    condition: (_ , { getState }) => {
      const { trips } = getState()
      if (trips.loading) {
        return false
      }
    }
  }
);


const initialState = { loading: false, hasError: false, error: '', trips: [] };

export const tripSlice = createSlice({
  name: 'trips',
  initialState,
  reducers: {
  },
  extraReducers: builder => {
    builder
      .addCase(getAlltrips.fulfilled, (state, action) => {
        console.log("fulfilled")
        state.trips = action.payload;
        state.loading = false;
        state.hasError = false;
      })
      .addCase(getAlltrips.rejected, (state, action) => {
        console.log("rejected")
        state.loading = false;
        state.hasError = true;
        state.error = action.error.message;
      })
      .addCase(getAlltrips.pending, state => {
        console.log("pending")
        state.loading = true;
      })
      .addCase(postTrip.fulfilled, (state, action) => {
        console.log("fulfilled", action.payload)
        state.trips.push(action.payload)
        state.loading = false;
        state.hasError = false;
      })
      .addCase(postTrip.rejected, (state, action) => {
        console.log("rejected" , action.payload)
        state.loading = false;
        state.hasError = true;
        state.error = action.error.message;
      })
      .addCase(postTrip.pending, state => {
        console.log("pending")
        state.loading = true;
      });
  }, 
})

//export const { increment, decrement, incrementByAmount } = tripSlice.actions

export default tripSlice.reducer