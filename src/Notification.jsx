import React, { Component } from 'react';


class Notification extends Component {
  render(){
    return(
      <div className="notification">
        <span className="notification-content">{this.props.message.content}</span>
      </div>
    )
  }
}

export default Notification;