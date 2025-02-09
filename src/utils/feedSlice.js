import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name:'feed',
  initialState: null,
  reducers : {
    addFeed: (state, action) => {
      return action.payload ;
    },
    removeFeed : (state , action)=>{
      return state.filter((feed)=>{
        return action.payload !== feed._id ;
      })
    },
    removeAllFeed: (state, action) => {
      return null;
    },
  }
})

export const { addFeed , removeFeed , removeAllFeed } = feedSlice.actions;

export default feedSlice.reducer;