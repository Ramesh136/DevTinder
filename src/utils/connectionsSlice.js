import { createSlice } from "@reduxjs/toolkit";

const connectionsSlice = createSlice({
  name : 'connections',
  initialState : null,
  reducers : {
    addConnections : (state , action)=>{
      return action.payload
    },
    removeAllConnections : (state , action)=>{
      return null;
    }
  }
});

export default connectionsSlice.reducer ;
export const { addConnections , removeAllConnections } = connectionsSlice.actions; 