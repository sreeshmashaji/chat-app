import React, { useEffect, useRef } from 'react'
import Message from './Message'
import userGetMessages from '../../hooks/userGetMessages'
import MessageSkeleton from '../skeletons/MessageSkeleton';
import useListenMessages from '../../hooks/useListenMessages';

function Messages() {
  const{messages,loading}=userGetMessages();
  useListenMessages()
  const lastMessageRef=useRef()
  
  useEffect(() => {
		setTimeout(() => {
			lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
		}, 100);
	}, [messages]);
  
  return (
    <div className='px-4 flex-1 overflow-auto'>
      {!loading &&
				messages.length > 0 &&
				messages.map((message) => (
					<div key={message._id} ref={lastMessageRef}>
						<Message message={message} />
					</div>
				))}
      
       {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
       {!loading && messages.length === 0 && (
				<p className='text-center text-gray-300'>Send a message to start the conversation</p>
			)}



    </div>
  )
}

export default Messages