"use client";

import {
  MinChatUiProvider,
  MainContainer,
  MessageInput,
  MessageContainer,
  MessageList,
  MessageHeader
} from "@minchat/react-chat-ui";
import { useState } from "react";
import axios from "axios";

type Message = {
  text: string;
  user: {
    id: string;
    name: string;
  };
};

function Chat({token}:{token: string}) {

    let userName: any;
    if (typeof window !== 'undefined') {
        userName = localStorage.getItem('userName');
    }   
  
    const [isLoading, setIsLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      text: `Hello ${userName}, How can I help you today?`,
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
          <MessageInput showSendButton={true} onSendMessage={async (text)=>{
            setIsLoading(true);

            const newMessages = [
                ...messages, 
                { 
                    text, 
                    user: {
                        id: 'abc',
                        name: 'Shawon Majid'
                    }
                }
            ];

            setMessages(newMessages);

            const response = await axios.post('http://localhost:3000/expense/chat', {text},{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setMessages([
              ...newMessages,
              {
                text: response.data.reply,
                user: {
                  id: 'ai',
                  name: 'Expense Manager'
                }
              }
            ])

            setIsLoading(false);


          }} placeholder="Type message here" />
        </MessageContainer>
      </MainContainer>
    </MinChatUiProvider>
  )
}

export default Chat
