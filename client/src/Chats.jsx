import React,{useState,useEffect} from 'react'
import ScrollToBottom from "react-scroll-to-bottom"

function Chats({socket,username,room}) {
    const [currentMsg,setCurrentMsg]= useState("")
    const [msgList,setMsgList]=useState([])
    
    const [msgCount,setMsgCount]= useState(0)
    const sendMsg = async () => {
        if(currentMsg!==""){
            const msgData={
                room:room,
                author:username,
                message:currentMsg,
                time:new  Date(Date.now()).getHours()+":"+ new  Date(Date.now()).getMinutes()
            }
           await socket.emit('send_message',msgData)
           setMsgList(list=>[...list,msgData])
           setMsgCount(msgCount+1)
           setCurrentMsg("")
        }
    }

    useEffect(()=>{
       
       socket.off("recieve_message").on("recieve_message",(data)=>{
            console.log(data)
            setMsgList(list=>[...list,data])

        })
    },[socket])
  return (
    <div className='chat-window' >
        <div className='chat-header' >
            <p>Live Chat</p>
        </div>
        <div className='chat-body' >
            <ScrollToBottom className='message-container' >
            {msgList.map(item=>(
                <div className='message' id={ username===item.author ? 'you'    : 'other' } >
                   <div>
                    <div className='message-content' >
                        <p>{item.message}</p>
                    </div>
                    <div className='message-meta' >
                        <p id='time' >{item.time}</p>
                        <p id='author'>{item.author}</p>
                    </div>
                   </div>
                </div>
            ))}
                </ScrollToBottom>
        </div>
        
        <div className='chat-footer' >
            <input type="text" placeholder='Hey...' onKeyPress={(e)=>{e.key==='Enter' && sendMsg()}} 
            onChange={(e)=>setCurrentMsg(e.target.value)} />
            <button onClick={sendMsg} >&#9658;</button>
        </div>
    </div>
  )
}

export default Chats