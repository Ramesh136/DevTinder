import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('male');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isLogginForm, setIsLoginForm] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginHandler = async () => {

    try {
      const response = await axios.post(BASE_URL + "/login", {
        emailId: email,
        password: password
      }, { withCredentials: true });
      dispatch(addUser(response.data));
      navigate('/feed');
      console.log(response);
    }
    catch (err) {
      if (err?.response?.data) {
        setError(err?.response?.data);
        setTimeout(() => setError(''), 2000)
      }
      else {
        setError(err.message);
        setTimeout(() => setError(''), 2000)
      }
    }
  }

  const signUpHandler = async () => {

    try {
      const response = await axios.post(BASE_URL + "/signup", {
        firstName ,
        lastName,
        emailId: email,
        password,
        age,
        gender
      }, { withCredentials: true });
      dispatch(addUser(response.data));
      console.log(response);
      navigate('/feed');
    }
    catch (err) {
      if (err?.response?.data) {
        setError(err?.response?.data);
        setTimeout(() => setError(''), 2000)
      }
      else {
        setError(err.message);
        setTimeout(() => setError(''), 2000)
      }
    }
  }

  return (
    <div className='pt-4 max-w-[300px] mx-auto'>
      <h1 className='text-center mb-4 text-2xl'>{isLogginForm ? "Login" : "Signup"}</h1>
      <div className='flex flex-col gap-y-4 items-center'>
        {!isLogginForm &&
          <>
            <label className="input input-bordered flex items-center gap-2">
              <span className='font-bold whitespace-nowrap'>First Name :</span>
              <input type="text" className="grow" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            </label>
            <label className="input input-bordered flex items-center gap-2">
              <span className='font-bold whitespace-nowrap'>Last Name :</span>
              <input type="text" className="grow" value={lastName} onChange={(e) => setLastName(e.target.value)} />
            </label>
            <label className="input input-bordered flex items-center gap-2 w-full">
              <span className='font-bold whitespace-nowrap'>Age :</span>
              <input type="number" className="grow" value={age} onChange={(e) => setAge(e.target.value)} />
            </label>
            <label className='input input-bordered flex items-center gap-2 w-full'>
              <span className='font-bold whitespace-nowrap'>Gender :</span>
              <select className="h-full bg-inherit w-full max-w-xs" value={gender} onChange={(e) => setGender(e.target.value)}>
                <option >male</option>
                <option>female</option>
              </select>
            </label>
          </>
        }
        <label className="input input-bordered flex items-center gap-2 w-full">
          <span className='font-bold whitespace-nowrap'>Email :</span>
          <input type="text" className="grow" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        </label>

        <label className="input input-bordered flex items-center gap-2 w-full">
          <span className='font-bold whitespace-nowrap'>Password :</span>
          <input type="password" className="grow" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>

        <button className="btn btn-active btn-primary w-full mt-2"
          onClick={() => {
            if (isLogginForm) {
              loginHandler();
            }
            else {
              signUpHandler();
            }
          }}
        >
          {isLogginForm ? "Login" : "Signup"}</button>
        <p 
        className='mx-auto cursor-pointer' 
        onClick={() => isLogginForm ? setIsLoginForm(false) : setIsLoginForm(true)}
        >{isLogginForm ? "New user ? Signup Now" : "Already a user ? Login now"}</p>
        <div className='text-red-400'>{error}</div>
      </div>
    </div>
  )
}

export default Login