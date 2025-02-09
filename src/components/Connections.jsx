import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios';
import { addConnections } from '../utils/connectionsSlice';

const Connections = () => {

  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);

  const getConnections = async () => {
    try {
      const response = await axios.get(BASE_URL + '/user/connections', { withCredentials: true });
      console.log(response);
      dispatch(addConnections(response?.data?.data?.connections))
    }
    catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    // if (!connections) {
      getConnections();
    // }
    // else {
    //   console.log('connections already exist in store');
    // }
  }, [])

  if (!connections) {
    return
  }

  if (connections.length === 0) {
    return <h1 className='text-3xl text-center text-white'>No connections found</h1>
  }

  return (
    <div className='flex flex-col items-center'>
      <h1 className='text-3xl text-center my-4 text-white'>Your Connections</h1>
      {connections.map((connection) => {
        const { firstName, lastName, age, gender, skills, about, id, photoUrl } = connection;
        return (
            <div className='flex gap-4 items-center justify-center bg-base-300 w-fit p-4 mt-4 rounded-md' key={id}>
              <div>
                <img src={photoUrl} alt="profileImage" className='w-[150px] h-[150px] object-cover rounded-full' />
              </div>
              <div className='flex flex-col gap-2'>
                <h2 className='text-2xl font-bold'>{firstName + " " + lastName}</h2>
                {age && gender && <p>{age + " , " + gender}</p>}
                <p>{about}</p>
              </div>
            </div>
        )
      })}
    </div>
  )
}

export default Connections