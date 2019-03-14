import React, { Component } from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    const messages = this.props.messages;
    const getMessages = messages.map((message, index) =>
      <Message message={message} key={index}/>);

    return (
      <main className="messages">{getMessages}</main>
    );
  }
}

export default MessageList;