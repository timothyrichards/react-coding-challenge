import React from 'react'
import Message from '../Message/Message.js'
import css from './Bucket.module.css'

const Bucket = ({title, messages, messagesSetter, messageOptions}) => {
    const sortedMessages = messages.slice();
    sortedMessages.reverse()
    return <div className={css.bucket}>
        <h2>{title}</h2>
        <p>Count {messages.length}</p>
        <div className={css.message_stream}>
            {sortedMessages.map((message) => {
                const index = messages.indexOf(message);
                return <Message key={message.id} message={message} messagesSetter={messagesSetter} messageOptions={messageOptions} index={index}/>
            })}
        </div>
    </div>
}

export default Bucket