import React, { useState } from 'react'
import UserCard from './UserCard'
import { BASE_URL } from '../utils/constants';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const EditProfile = ({ user }) => {

  const [firstName, setFistName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [gender, setGender] = useState(user.gender);
  const [age, setAge] = useState(user.age);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);

  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const dispatch = useDispatch();

  const editSubmitHandler = async () => {
    try {
      const response = await axios.patch(BASE_URL + '/profile',
        {
          firstName,
          lastName,
          gender,
          photoUrl,
          age
        },
        { withCredentials: true }
      );
      console.log(response);
      dispatch(addUser({user :response?.data?.user}));
      setSuccessMsg(response?.data?.message);
      setTimeout(() => setSuccessMsg(false), 1500);
    }
    catch (err) {
      console.log(err);
      setErrorMsg('Something Went wrong');
      setTimeout(() => setErrorMsg(''), 1500);
    }
  }

  return (
    <div className='flex gap-10 justify-center mt-10 items-center'>
      <div className='flex flex-col gap-4'>
        <label className="input input-bordered flex items-center gap-2">
          First Name
          <input type="text" className="grow" value={firstName} onChange={(e) => setFistName(e.target.value)} />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          Last Name
          <input type="text" className="grow" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          Age
          <input type="number" className="grow" value={age} onChange={(e) => setAge(e.target.value)} />
        </label>
        <label className='input input-bordered flex items-center gap-2'>
          Gender
          <select className="h-full bg-inherit w-full max-w-xs" value={gender} onChange={(e) => setGender(e.target.value)}>
            <option>male</option>
            <option>female</option>
          </select>
        </label>
        <label className="input input-bordered flex items-center gap-2">
          Add Photo Url
          <input type="text" className="grow" value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)} />
        </label>
      </div>
      <div className='flex flex-col gap-4'>
        <UserCard user={{ firstName, lastName, gender, photoUrl, age }} />
        <button className='btn btn-primary' onClick={editSubmitHandler}>Submit</button>
      </div>
      <div className="toast toast-end toast-middle">
        {
          errorMsg !='' &&
          <div className="alert alert-info">
            <span>{errorMsg}</span>
          </div>
        }
        {
          successMsg != '' &&
          <div className="alert alert-success">
            <span>{successMsg}</span>
          </div>
        }
      </div>
    </div>
  )
}

export default EditProfile