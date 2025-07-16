import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import EditProfile from './EditProfile';

const Profile = () => {

  const data = useSelector((store) => store.user);

  if (!data) {
    return <div></div>
  }

  console.log(data)

  if(!data){
    return 'loading..'
  }

  return (
    <div className='px-4'>
      <EditProfile user={data.user}/>
    </div>
  )
}

export default Profile