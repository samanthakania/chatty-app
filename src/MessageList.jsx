import React, { Component } from 'react';
import Message from './Message.jsx';
import Notification from './Notification.jsx'

class MessageList extends Component {
  render() {
    const messages = this.props.messages;
    const getMessages = messages.map((message, index) => {

      if(message.type === "incomingMessage") {
        return <Message message={message} key={index}/>;
      }
      else if(message.type === "postNotification") {
        return <Notification message={message} key={index}/>
      }
    });

    return (
      <main className="messages">{getMessages}</main>
    );
  }
}

export default MessageList;