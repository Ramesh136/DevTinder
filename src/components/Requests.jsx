import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addRequests, removeRequest } from '../utils/requestsSlice';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';

const Requests = () => {

  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);

  const getRequests = async () => {
    try {
      const response = await axios.get(BASE_URL + '/user/requests/recieved', { withCredentials: true });
      console.log(response);
      dispatch(addRequests(response?.data?.data?.requests))
    }
    catch (err) {
      console.log(err)
    }
  }

  const reviewHandler= async (reviewType , id , element)=>{
    element.classList.add('load');
    try{
      const response = await axios.post(BASE_URL + '/review'+'/'+reviewType+'/'+id , {} , { withCredentials:true});
      console.log(response);
      element.classList.remove('load');
      dispatch(removeRequest(id))
      setTimeout(()=>element.classList.remove('load'),1000)
    }
    catch(err){
      console.log(err);
      setTimeout(()=>element.classList.remove('load'),1000)
      
    }
  }

  useEffect(() => {
    // if (!requests) {
      getRequests();
    // }
    // else {
    //   console.log('requests already exist in store');
    // }
  }, [])

  if (!requests) {
    return
  }

  if (requests.length === 0) {
    return <h1 className='text-3xl text-center my-4'>No requests</h1>
  }

  return (
    <div className='flex flex-col items-center'>
      <h1 className='text-3xl text-center my-4'>Your Requests</h1>
      {requests.map((request) => {
        const { firstName, lastName, age, gender, skills, about, id, photoUrl, requestId } = request;
        return (
            <div className='flex gap-4 items-center justify-center bg-base-300 w-fit p-4 mt-4 rounded-md ' key={id}>
              <div>
                <img src={photoUrl} alt="profileImage" className='w-[150px] h-[150px] object-cover rounded-full' />
              </div>
              <div className='flex flex-col gap-2'>
                <h2 className='text-2xl font-bold'>{firstName + " " + lastName}</h2>
                {age && gender && <p>{age + " , " + gender}</p>}
                <p>{about}</p>
              </div>
              <div className='flex gap-4'>
                <button className='btn btn-primary relative box-border' onClick={(event)=>reviewHandler('accepted',requestId,event.currentTarget)}><span className='btn-message'>Accept </span><span className="loading loading-dots loading-md absolute z-[-1]"></span></button>
                <button className='btn btn-secondary relative' onClick={(event)=>reviewHandler('rejected',requestId,event.currentTarget)}><span className='btn-message'>Reject</span><span className="loading loading-dots loading-md absolute z-[-1]"></span></button>
              </div>
            </div>
        )
      })}
    </div>
  )
}

export default Requests