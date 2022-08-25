import React, {useEffect, useState} from 'react'
import Api from '../../api'
import {useForceUpdate} from '../../utils/utils.js'
import Bucket from '../Bucket/Bucket.js'
import css from './MessageList.module.css'

const MessageList = () => {
  const forceUpdate = useForceUpdate();
  const [error, setError] = useState([])
  const [warning, setWarning] = useState([])
  const [info, setInfo] = useState([])
  const [, setOtherMessages] = useState([])
  const [api, ] = useState(
      new Api({
        messageCallback: (message) => {
          messageCallback(message)
        },
      })
  )

  useEffect(() => {
    api.start()
  }, [api])

  const setMessages = (messageFunc, message) => {
    messageFunc(prevMessages => {
      return [
        ...prevMessages.slice(),
        message,
      ]
    })
  }

  const messageCallback = (message) => {
    switch(message.priority) {
      case 1: // error
        setMessages(setError, message)
        break;
      case 2: // warning
        setMessages(setWarning, message)
        break;
      case 3: // info
        setMessages(setInfo, message)
        break;
      default: // other priority (created this to capture any messages with an unexpected priority)
        setMessages(setOtherMessages, message)
        break;
    }
  }

  const toggleMessageStream = () => {
    const isApiStarted = api.isStarted()
    isApiStarted ? api.stop() : api.start();
    forceUpdate()
  }

  const clearMessages = () => {
    setError([])
    setWarning([])
    setInfo([])
    setOtherMessages([])
  }

  return <div id={css['wrapper']}>
    <div id={css['controls']}>
      <button onClick={() => {toggleMessageStream()}}>
        {api.isStarted() ? 'STOP' : 'START'}
      </button>
      <button onClick={() => {clearMessages()}}>
        CLEAR
      </button>
    </div>
    <div id={css['messages']}>
      <Bucket title="Error Type 1" messages={error} messagesSetter={setError} messageOptions={{className: 'error'}} />
      <Bucket title="Warning Type 2" messages={warning} messagesSetter={setWarning} messageOptions={{className: 'warning'}} />
      <Bucket title="Info Type 3" messages={info} messagesSetter={setInfo} messageOptions={{className: 'info'}} />
    </div>
  </div>
}

export default MessageList
