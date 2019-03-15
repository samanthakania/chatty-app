import React, {Component} from 'react';
import ChatBar from "./Chatbar.jsx";
import MessageList from "./MessageList.jsx";
import NavBar from "./NavBar.jsx";
const uuidv1 = require('uuid/v1');

class App extends Component {
  constructor(props){
    super(props);
    this.state =
    {
      currentUser: {name: "Anonymous"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [],
      userCount: 0
    };
  }

  addMessage = (message) =>{
    const newMessage = {
      id: uuidv1(),
      username: this.state.currentUser.name,
      content: message,
      type: "incomingMessage"
    }
    this.socket.send(JSON.stringify(newMessage))
  }



  changeUsername = (username) => {
    const oldUsername = this.state.currentUser.name;
    this.setState({
      currentUser: {name: username}
    })
    const usernameData = {
      id: uuidv1(),
      content: `${oldUsername} has changed their name to ${username}`,
      username: username,
      type: "postNotification"
    }

    this.socket.send(JSON.stringify(usernameData))

  }

  componentDidMount() {
    this.socket = new WebSocket("ws://localhost:3001");
    // Listen for messages

    this.socket.onmessage = (event) => {
      let message = JSON.parse(event.data);
      //console.log(message)

      if(message.type === "incomingMessage") {
        this.setState(state => {
          return {
            messages:[...state.messages, message]
          }
        })
      }

      if(message.type === "postNotification"){
        this.setState(state => {
          return {
            messages:[...state.messages, message]
          }
        })
      }

      if(message.type === "incomingUser"){
        this.setState(state =>{
          return{
            userCount: message.connections
          }
        })
      }
    }
  }

  render() {
    return (
      <div>
        <NavBar userCount = {this.state.userCount} />
        <MessageList
        messages={this.state.messages}/>
        <ChatBar
        currentUser={this.state.currentUser.name}
        addMessage={this.addMessage}
        changeUsername={this.changeUsername}
         />
      </div>
    );
  }
}


export default App;
