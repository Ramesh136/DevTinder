import axios from "axios";
import { removeFeed } from "../utils/feedSlice";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constants";

const UserCard = ({ user , type }) => {
  const { firstName, lastName, photoUrl, age, gender, about , _id } = user;

  const dispatch = useDispatch();


  const reviewHandler= async (requestType , id , element)=>{

    if(type === 'userCard'){
      return ;
    }
    console.log(requestType , id , element)
    element.classList.add('load');
    // return
    try{
      const response = await axios.post(BASE_URL + '/request'+'/'+requestType+'/'+id , {} , { withCredentials:true});
      console.log(response);
      element.classList.remove('load');
      dispatch(removeFeed(id));
      setTimeout(()=>element.classList.remove('load'),1000)
    }
    catch(err){
      console.log(err);
      setTimeout(()=>element.classList.remove('load'),1000)
      
    }
  }
  return (
    <div className="card bg-base-300 w-96 shadow-xl py-4">
      <figure>
        <img src={photoUrl} alt="photo" className="w-[250px] h-[250px] object-cover rounded-[50%]"/>
      </figure>
      <div className="card-body items-center">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {age && gender && <p>{age + ", " + gender}</p>}
        <p>{about}</p>
        <div className="card-actions justify-center my-4">
          <button className="btn btn-primary relative" onClick={(event)=>reviewHandler('ignored',_id,event.currentTarget)}><span className='btn-message'>Ignore </span><span className="loading loading-dots loading-md absolute z-[-1]"></span></button>
          <button className="btn btn-secondary relative" onClick={(event)=>reviewHandler('interested',_id,event.currentTarget)}><span className='btn-message'>Interested </span><span className="loading loading-dots loading-md absolute z-[-1]"></span></button>
        </div>
      </div>
    </div>
  );
};
export default UserCard;