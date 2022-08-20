import './App.css';
import io from 'socket.io-client'
import {useState} from "react"
import Chats from './Chats'

const socket = io.connect('http://localhost:3001')


function App() {
  const [username,setUsername]=useState("")
  const [room,setRoom]=useState("")
  const [showChat,setShowChat]=useState(false)
 


  const joinRoom = ()=>{
    if(username!=="" && room!=="" ){
      socket.emit('join_room',room)
      setShowChat(true)
    }
  }

  return (
    <div className="App">
      {showChat  
      ? <Chats socket={socket} username={username} room={room}/>   
      
      
      : <div className='joinChatContainer' >
      <h3>JOIN A CHAT</h3>
      <input type="text" placeholder="yahia..." onChange={(e)=>{setUsername(e.target.value)}} />
      <input type="text" placeholder="room id..." onChange={(e)=>{setRoom(e.target.value)}}  />  
      <button onClick={joinRoom} >join</button>    
      </div> 
      
      
      }
      
      
    </div>
  );
}

export default App;
