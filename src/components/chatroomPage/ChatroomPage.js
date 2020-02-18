import React, {useState, useEffect} from "react"
import "./ChatroomPage.css"
import Chatbox from '../chatbox/Chatbox'
import SuggestCharacterButton from './SuggestCharacterButton'
import ChooseCharacterDiv from './ChooseCharacterDiv'
import StartChatButton from './StartChatButton'
import WaitingForPeerMessage from './WaitingForPeerMessage'

const ChatroomPage = ({socket, randomTip}) => {
  const [isInternet, setIsInternet] = useState(true)
  const [waitingForPeer, setWaitingForPeer] = useState(false)
  const [chatInSession, setChatInSession] = useState(false)
  const [chat, setChat] = useState({title: '', you: '', peer: '', conversation: []})

  useEffect(() => {
    socket.on('chat start', peersName => {
      const currentTime = () => new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })

      setChat(chat => ({...chat, peer: peersName, startTime: currentTime()}))
      setWaitingForPeer(false)
      setChatInSession(true)
    })

    return () => {
      if (socket) socket.off('chat start')
    }
  }, [])

  function cancelSearch(){
    setWaitingForPeer(false)
    socket.emit('leave chatQueue')
    //emit 'end chat' in case of race conditions where server had already started a chat a nanosecond earlier
    socket.emit('end chat')
  }

  return (
    <>
      <section className="chatroom-page-wrapper">
        <h1 className="page-title">Chatroom</h1>
        <p id="tip">Add to your calendar!! &nbsp;<span className="tip-best-time">Sunday 8:00pm EST</span>. Guaranteed to be people online at that time, every Sunday.</p>
        {/* Have temporarily replaced randomTip with Best Chatting Time    Tip: {randomTip}*/}

        {!chatInSession &&
          <>
            <SuggestCharacterButton waitingForPeer={waitingForPeer} setChat={setChat} chat={chat}/>
            <ChooseCharacterDiv waitingForPeer={waitingForPeer} chat={chat} setChat={setChat}/>
          </>
        }
        {(!waitingForPeer && !chatInSession) &&
          <StartChatButton chat={chat} setIsInternet={setIsInternet} setWaitingForPeer={setWaitingForPeer} socket={socket}/>  
        }
        {!isInternet &&
          <p className='no-internet'>Could not connect. Please check your internet connection and try again.</p>
        }
        {waitingForPeer && <WaitingForPeerMessage cancelSearch={cancelSearch}/>}
      </section>
      {chatInSession &&
        <div className="center-chatbox">
          <Chatbox chat={chat} chatInSession={chatInSession} setChat={setChat} setChatInSession={setChatInSession} socket={socket}/>
        </div>
      }
    </>
  )
}

export default ChatroomPage