import { configureStore } from "@reduxjs/toolkit";
import userSlice from './userSlice';
import feedSlice from './feedSlice';
import requestsSlice from './requestsSlice';
import connectionsSlice from './connectionsSlice';

const store = configureStore({
 reducer : {
    user : userSlice,
    feed : feedSlice,
    requests : requestsSlice,
    connections : connectionsSlice
 }
})

export default store ;