import { createSlice } from "@reduxjs/toolkit";

const requestsSlice = createSlice({
  name : 'requests',
  initialState : null,
  reducers : {
    addRequests : ( state , action )=>{
      return action.payload ;
    },
    removeRequest : ( state , action)=>{
      return state.filter((request)=>{
        return action.payload !== request.requestId ;
      })
    },
    removeAllRequest: ( state , actions )=>{
      return null ;
    }
  }
});

export default requestsSlice.reducer ;
export const { addRequests , removeRequest , removeAllRequest } = requestsSlice.actions ;