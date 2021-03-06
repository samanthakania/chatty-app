import React, {Component} from 'react';


class ChatBar extends Component {


newMessageHandler = (event) =>{
  if(event.key === 'Enter'){
    this.props.addMessage(event.target.value)
    event.target.value = ''
    }
  }

newUserHandler = (event) =>{
  if(event.key === 'Enter'){
    this.props.changeUsername(event.target.value)
    }
  }


  render() {
    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder="Your Name (Optional)" defaultValue={this.props.currentUser} onKeyUp={this.newUserHandler} />
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyUp={this.newMessageHandler} />
      </footer>
    )
  }
}

export default ChatBar;