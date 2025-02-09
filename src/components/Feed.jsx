import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BASE_URL } from '../utils/constants';
import axios from 'axios';
import { addFeed } from '../utils/feedSlice';
import UserCard from '../components/UserCard';

const Feed = () => {

  const feed = useSelector((store)=>store.feed);
  const dispath = useDispatch();

  const getFeed = async ()=>{
    try{
      const response = await axios.get(BASE_URL+'/user/feed' , { withCredentials : true});
      const feedData = response?.data?.data?.feed ;
      dispath(addFeed(feedData));
    }
    catch(err){
      console.log(err);
    }
  }

  useEffect(()=>{
    getFeed();  
  },[])

  if(!feed){
    return 'loading...'
  }

  return (
    <div className='flex items-center flex-col justify-center mt-4 gap-10'>
      <h1 className='text-3xl'>Explore near you</h1>
      <UserCard user={feed[0]} />
    </div>
  )
}

export default Feed