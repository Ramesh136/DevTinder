import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { createSocketConnection } from '../utils/socket';
import { useSelector } from 'react-redux';
import { BASE_URL } from '../utils/constants';
import axios from 'axios';

const Chat = () => {
  const targetUserId = useParams();
  const [messages, setMessages] = useState([]);
  const [targetUser , setTargetUser] = useState()
  const [inputMessage, setInputMessage] = useState("");
  const chatBodyRef = useRef(); 
  const user = useSelector((store) => store.user);
  const userId =  user?.user?.id;

  const fetchChats = async ()=>{
    const response = await axios.get(BASE_URL+`/chat/${targetUserId.targetUserId}`,{ withCredentials:true});
    const targetUserName = response.data.targetUser.firstName + " " + response.data.targetUser.lastName ;

    if(response.data.chats){
      let responseChats = response.data.chats.messages.map((message)=>{
        return {
          senderId: message.from,
          message : message.message,
          sender : message.from === userId ? user.user.firstName + " " + user.user.lastName : targetUserName
        }
      })
      // console.log(responseChats,"responseChats");
      setMessages(responseChats);
    }
    setTargetUser(response.data.targetUser);
  }

  useEffect(()=>{
    if(!user){
      return ;
    }
    fetchChats();
  },[user])

  useEffect(()=>{
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight ;      
  },[messages])

  useEffect(() => {  
    window.socket = null;
    if(user && targetUserId && targetUserId.targetUserId){
      window.socket = createSocketConnection();
  
      socket.on('connect', () => {
        console.log('Connected to the server',socket);
      });
  
      socket.emit('joinRoom', { userId : userId , targetUserId: targetUserId.targetUserId , userName : user?.user?.firstName + " " + user?.user?.lastName });

      socket.on("receiveMessage",({userId, targetUserId, message , userName})=>{
        console.log("Received message:", userId, targetUserId, message, userName);
        
        setMessages((prevMessages) => [
          ...prevMessages, 
          {
            senderId: userId,
            message: message,
            sender: userName
          } 
        ])
      })
    }

    return () => {
      if (socket) {
        socket.disconnect();
        console.log('Disconnected from the server');
      }
    }
  }, [user , targetUserId])

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    socket.emit('sendMessage', {
      userName : user?.user?.firstName + " " + user?.user?.lastName,
      userId: userId,
      targetUserId: targetUserId.targetUserId,
      message: inputMessage,
    })
    setInputMessage("");
  }


  return (
    <div className='w-[85%] mx-auto my-5 h-[70vh] border border-gray-700 rounded-md bg-base-200 flex flex-col'>
      <div className='chat--header flex items-center justify-between p-4 border-b border-gray-700'>
        <h1 className='text-2xl'>Chat</h1>
        <div className='flex items-center gap-4'>
          <h2 className='text-xl font-bold'>{targetUser ? targetUser.firstName + " " + targetUser.lastName : "Loading.."}</h2>
          <img src={ targetUser?.photoUrl ? targetUser.photoUrl : ""} alt="profileImage" className='w-[50px] h-[50px] object-cover rounded-full' />
        </div>
      </div>
      <div className='chat--body overflow-auto flex-1 px-4 py-4' ref={chatBodyRef}>
        {
          messages.map((message, index) => {
            const { senderId, message: msg, time, sender } = message;
            return (
              <div className={`chat ${senderId !== targetUserId.targetUserId  ? 'chat-end' : 'chat-start'}`} key={index}>
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full bg-red-300 !flex items-center justify-center text-black text-lg font-[500]">
                    {sender.split("")[0]}
                  </div>
                </div>
                <div className="chat-header mb-1">
                  {/* {sender} */}
                  {/* <time className="text-xs opacity-50">{time}</time> */}
                </div>
                <div className="chat-bubble">{msg}</div>
              </div>
            )
          })
        }
      </div>
      <div className='chat--foter flex items-center justify-between p-4 border-t border-gray-700 gap-4'>
        <input type="text" className='input input-bordered w-full' placeholder='Type your message...' value={inputMessage} onChange={(e)=>setInputMessage(e.target.value)} />
        <button onClick={handleSendMessage} className='btn btn-primary'>Send</button>
      </div>
    </div>
  )
}

export default Chat