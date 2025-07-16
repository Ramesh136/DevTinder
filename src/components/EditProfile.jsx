import React, { useState } from 'react'
import UserCard from './UserCard'
import { BASE_URL } from '../utils/constants';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const EditProfile = ({ user }) => {

  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [gender, setGender] = useState(user.gender);
  const [about, setAbout] = useState(user.about);
  const [age, setAge] = useState(user.age);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);

  const [loading , setLoading] = useState(false)

  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const dispatch = useDispatch();

  const editSubmitHandler = async () => {
    setLoading(true);
    try {
      const response = await axios.patch(BASE_URL + '/profile',
        {
          firstName,
          lastName,
          gender,
          photoUrl,
          age,
          about
        },
        { withCredentials: true }
      );
      console.log(response);
      dispatch(addUser({user :response?.data?.user}));
      setSuccessMsg(response?.data?.message);
      setTimeout(() => {
        setLoading(false)
        setSuccessMsg(false)
      }, 1500);
      
    }
    catch (err) {
      console.log(err);
      setErrorMsg('Something Went wrong');
      setTimeout(() => {
        setErrorMsg('')
        setLoading(false)
      }, 1500);
    }
  }

  return (
    <div className='lg:flex my-10  gap-10 justify-center mt-10 items-center'>
      <div className='flex flex-col gap-4 mb-10'>
        <label className="input input-bordered flex items-center gap-2">
          <span className='font-bold whitespace-nowrap'>First Name :</span>
          <input type="text" className="grow" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <span>Last Name :</span>
          <input type="text" className="grow" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <span className='font-bold whitespace-nowrap'>Age :</span>
          <input type="number" className="grow" value={age} onChange={(e) => setAge(e.target.value)} />
        </label>
        <label className='input input-bordered flex items-center gap-2'>
          <span className='font-bold whitespace-nowrap'>Gender :</span>
          <select className="h-full bg-inherit w-full max-w-xs" value={gender} onChange={(e) => setGender(e.target.value)}>
            <option>male</option>
            <option>female</option>
          </select>
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <span className='font-bold whitespace-nowrap'>Add Photo Url :</span>
          <input type="text" className="grow" value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)} />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <span className='font-bold whitespace-nowrap'>About :</span>
          <input type="text" className="grow" value={about} onChange={(e) => setAbout(e.target.value)} />
        </label>
      </div>
      <div className='flex flex-col items-center gap-4'>
        <UserCard user={{ firstName, lastName, gender, photoUrl, age , about }} type={'userCard'}/>
        <button className='btn btn-primary w-[90%]' onClick={editSubmitHandler}>{ loading ? <span className="loading loading-dots loading-sm"></span> : 'Submit'}</button>
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