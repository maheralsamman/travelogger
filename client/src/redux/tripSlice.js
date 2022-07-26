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
  {
    condition: (_ , { getState }) => {
      const { trips } = getState()
      if (trips.loading || trips.trips.length) {
        return false
      }
    }
  }
);


export const postTrip = createAsyncThunk('postTrip',
  async (formTrip, {getState}) => {
    const {user} = getState();
        const response = await fetch(urlTrips, {
          method: 'POST',
          body: JSON.stringify({...formTrip, userName: user.user.displayName, userId: user.user.uid}),
          headers:{
            'Content-Type': 'application/json',
          }
        });
        const data = await response.json();
          return data.trip;
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

export const updateTrip = createAsyncThunk('updateTrip',
  async (formTrip) => {  
         const response = await fetch(`${urlTrips}/${formTrip._id}`, {
           method: 'PUT',
           body: JSON.stringify(formTrip),
           headers:{
            'Content-Type': 'application/json',
           }
         });
         const { updatedTrip } = await response.json();
          return updatedTrip;
  },
);

export const deleteTrip = createAsyncThunk('deleteTrip',
  async (id) => {
         await fetch(`${urlTrips}/${id}`, {
          method: 'DELETE'
         });
         return id;
  },
);

const initialState = { loading: false, hasError: false, error: '', trips: [], successMsg: '' };

export const tripSlice = createSlice({
  name: 'trips',
  initialState,
  reducers: {
    resetSuccessMsg: (state) => {
      state.successMsg = ''
    }
  },
  extraReducers: builder => {
    builder
      .addCase(getAlltrips.fulfilled, (state, action) => {
        console.log("fulfilled")
        state.trips = action.payload.trips;
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
        state.trips.unshift(action.payload)
        state.successMsg = 'Trip added ✔'
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
      })
      .addCase(updateTrip.fulfilled, (state, action) => {
        console.log("fulfilled", action.payload)
        state.trips = state.trips.filter(trip => trip._id !== action.payload._id)
        state.trips.unshift(action.payload)
        state.successMsg = 'Trip updated ✔'

        state.loading = false;
        state.hasError = false;
      })
      .addCase(updateTrip.rejected, (state, action) => {
        console.log("rejected" , action.payload)
        state.loading = false;
        state.hasError = true;
        state.error = action.error.message;
      })
      .addCase(updateTrip.pending, state => {
        console.log("pending")
        state.loading = true;
      })
      .addCase(deleteTrip.fulfilled, (state, action) => {
        console.log("fulfilled", action.payload)
        state.trips = state.trips.filter(trip => trip._id !== action.payload)
        state.successMsg = 'Trip deleted ✔'

        state.loading = false;
        state.hasError = false;
      })
      .addCase(deleteTrip.rejected, (state, action) => {
        console.log("rejected" , action.payload)
        state.loading = false;
        state.hasError = true;
        state.error = action.error.message;
      })
      .addCase(deleteTrip.pending, state => {
        console.log("pending")
        state.loading = true;
      });
  }, 
})

export const { resetSuccessMsg } = tripSlice.actions

export const selectTrip = id => state => state.trips.trips.find(trip => trip._id === id)

export const selectTrips = searchTerm => state => searchTerm ?  state.trips.trips.filter(trip => {
  const regExp = new RegExp(searchTerm, "gi");
  return regExp.test(trip.country) || regExp.test(trip.userName) || trip.stops.some(stop => regExp.test(stop.city))
}) : state.trips.trips;

// const thisTrip = useSelector(selectTrip(id))

export default tripSlice.reducer