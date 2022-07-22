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

export const updateTrip = createAsyncThunk('updateTrip',
  async ({id, updatedTrip}) => {
    console.log("here", id, updatedTrip);
         const trip = await fetch(`${urlTrips}/${id}`, {
           method: 'PUT',
           body: JSON.stringify(updatedTrip),
           headers:{
            'Content-Type': 'application/json',
           }
         });
         const data = await trip.json();
           return {id, data};
  },
);

export const deleteTrip = createAsyncThunk('deleteTrip',
  async (id) => {
    //console.log("here", id, updatedTrip);
         await fetch(`${urlTrips}/${id}`, {
          method: 'DELETE'
         });
  },
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
      })
      .addCase(updateTrip.fulfilled, (state, action) => {
        console.log("fulfilled", action.payload)
        state.trips.filter(trip => trip._id !== action.payload.id)
        state.trips.push(action.payload.data.updatedTrip)
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
        state.trips.filter(trip => trip._id !== action.payload.id)
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

//export const { increment, decrement, incrementByAmount } = tripSlice.actions

export const selectTrip = id => state => state.trips.trips.find(trip => trip._id === id)

export const selectTrips = searchTerm => state => state.trips.trips.filter(trip => {
  const regExp = new RegExp(searchTerm, "gi");
  return regExp.test(trip.country) || regExp.test(trip.username)
})

// const thisTrip = useSelector(selectTrip(id))

export default tripSlice.reducer