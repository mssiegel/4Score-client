import React, { useEffect } from "react"
import { Link } from "gatsby"

import Layout from "../components/common/Layout"
import SEO from "../components/seo"
import ChatroomPage from "../components/ChatroomPage"
import io from 'socket.io-client'

const Chatroom = () => {
  //Set up socket.io connection to server
  //If client is at 4scorechat domain name, use heroku backend server else use local host backend server
  //const serverUrl = window.location.href === 'https://www.4scorechat.com/' ? 'https://scorechat.herokuapp.com/' : 'http://localhost:8000'
  const serverUrl = 'https://scorechat.herokuapp.com/'
  const socket = io(serverUrl)
  useEffect(()=> {
   return () => {
     socket.disconnect()
   } 
  }, []) 

  const tips = ['feel free to EXAGGERATE your words by using capital letters', 'use your partner for leverage. Together, shoot for the skies', 'for comedy, agree with your peer and dramatize what they say', 'smile because it will make you happier', 'do not keep your peers waiting while you write long pagragraphs. Instead, write shorter lines', 'blank your mind to the past and future. Stay focused on the NOW.', 'choose whatever crazy character tickles your fancy', 'do not enter with a predetermined storyline. Enter with a blank mind. Create the plot with each back-and-forth response', 'try to get better and better. When your chat ends, review it. Look for ways to improve your chatting skills', 'cooperation works wonders. See your peer as your partner in creating a beautiful storyline', "chats can get intense. Come prepared with a box of tissues and a shoulder to lean on...or don't", 'partner with your peer to create deep, intense, emotional storylines']
  const randomTip  = tips[Math.floor(Math.random() * tips.length)]

  return ( 
  <Layout>
    <SEO title="Chatroom" 
      description="Our chatroom where people get paired with each other. Be whomever you want and start start a chat. Have fun and get connected."
    />
    <ChatroomPage socket={socket} randomTip={randomTip}/>

  </Layout>
 )
}

export default Chatroom
