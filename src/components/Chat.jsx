
import Cam from "../../public/assets/cam.png"
import Add from "../../public/assets/add.png"
import More from "../../public/assets/more.png"
import Messages from "./Messages"
import Input from "./Input"
import { useContext } from "react"
import { ChatContext } from "../context/ChatContext"

const Chat = () => {
  const { data } = useContext(ChatContext);



  return (
    <div className="chat">
      <div className="chatInfo">
        <span>{data.user?.displayName}</span>
        <div className="chatIcons">
          <img src={Cam} alt="" />
          <img src={Add} alt="" />
          <img src={More} alt="" />
        </div>
      </div>
        <Messages/>
        <Input/>
    </div>
  )
}

export default Chat