import React,{ useEffect,useState } from "react";
import "./App.css";
import Chat from "./chat";
import Sidebar from "./sidebar";
import Pusher from "pusher-js";
import axios from "./axios";

function App() {

  const [messages,setMessages]= useState([]);

  useEffect(()=>{
    axios.get('/messages/sync')
    .then(response=>{
      setMessages(response.data);
    })
  },[]);

  useEffect(() =>  {
  const pusher = new Pusher('86a92e3324d0040be2d5', {
    cluster: 'ap2'
  });

  const channel = pusher.subscribe('messages');
  channel.bind('inserted', (newMessage)=> {
   
    setMessages([...messages,newMessage]);
  });

  return ()=>{
    channel.unbind_all();
    channel.unsubscribe();
  };

},[messages]); 

  return (
    <div className="App">
      <div className="app_body">
        <Sidebar />
        <Chat messages={messages}/>
      </div>
    </div>
  );
}

export default App;
