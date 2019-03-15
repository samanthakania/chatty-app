import React, { Component } from 'react';


class Notification extends Component {
  render(){
    return(
      <div className="message system">
        <span className="content">{this.props.message.content}</span>
      </div>
    )
  }
}

export default Notification;