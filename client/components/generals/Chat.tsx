"use client";

import {
  MinChatUiProvider,
  MainContainer,
  MessageInput,
  MessageContainer,
  MessageList,
  MessageHeader
} from "@minchat/react-chat-ui";
import { message } from "antd";
import { useState } from "react";
import { myColorSet } from "../utils/chatColorSet";

type Message = {
  text: string;
  user: {
    id: string;
    name: string;
  };
};

function Chat() {
  
    const [isLoading, setIsLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Hello Shawon Majid, How can I help you today?",
      user: {
        id: "ai",
        name: "Expense Manager"
      }
    },
  ]);



  return (
    <MinChatUiProvider theme="#6ea9d7">
      <MainContainer style={{ height: '70vh', width: '50vw',maxWidth: '500px', minWidth: '350px'  }}>
        <MessageContainer>
          <MessageHeader />
          <MessageList
            currentUserId='abc'
            messages={messages}
            showTypingIndicator={isLoading}
            
          />
          <MessageInput showSendButton={true} onSendMessage={(text)=>{
            setIsLoading(true);
            setMessages([
              ...messages,
              {
                text,
                user: {
                  id: 'abc',
                  name: 'Shawon Majid'
                }
              }
            ])
          }} placeholder="Type message here" />
        </MessageContainer>
      </MainContainer>
    </MinChatUiProvider>
  )
}

export default Chat
