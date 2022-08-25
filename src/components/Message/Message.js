import React from 'react'
import css from './Message.module.css'

const Message = ({message, messagesSetter, messageOptions, index}) => {
    return <div className={`${css.message} ${css[messageOptions.className]}`}>
        <div className={css.text}>
            <p>Notification</p>
            <p>{message.message}</p>
        </div>
        <button onClick={() => {
            messagesSetter((prevMessages) => {
                const arr = prevMessages.slice()
                arr.splice(index, 1)
                return arr
            })
        }}>Clear</button>
    </div>
}

export default Message