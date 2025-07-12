import axios from 'axios';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BASE_URL } from '../utils/constants';
import { removeUser } from '../utils/userSlice';
import { Link, useNavigate } from 'react-router-dom';

const NavBar = () => {

  const data = useSelector((store)=>store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async ()=>{
    try{
      const response = await axios.post(BASE_URL+'/logout',{},{withCredentials:true});
      dispatch(removeUser());
      navigate('/login');
      console.log(response);
    }
    catch(err){
      console.error(err?.response?.data)
    }
  }
  return (
    <header className='bg-base-300 w-full'>
      <div className="navbar max-w-[1440px] mx-auto">
        <div className="flex-1">
          <Link to={'/'} className="btn btn-ghost text-xl">👩‍💻DevTinder</Link>
        </div>
        {
          data ?
          <div className="flex-none gap-2">
            <div className="form-control">
              { data && <p>Hey , {data?.user?.firstName}</p>}
            </div>
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src={data?.user?.photoUrl} />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-200 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                <li>
                  <Link to={"/profile"} className="justify-between">
                    Profile
                  </Link>
                </li>
                <li>
                  <Link to={"/feed"}>Feed</Link>
                </li>
                <li>
                  <Link to={"/requests"}>Requests</Link>
                </li>
                <li>
                  <Link to={"/connections"}>Connections</Link>
                </li>
                <li onClick={logoutHandler}><a>Logout</a></li>
              </ul>
            </div>
          </div> : 
          <div className='pr-4'><Link to={"/login"}>Login</Link></div>
        }
      </div>
    </header>
  )
}

export default NavBar