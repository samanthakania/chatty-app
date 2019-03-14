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
      currentUser: {name: "Harambe"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: []
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

  componentDidMount() {
    this.socket = new WebSocket("ws://localhost:3001");
    // Listen for messages

    this.socket.onmessage = (event) => {
      let message = JSON.parse(event.data);
        console.log(message)
      if(message.type === "incomingMessage")
      this.setState( state => {
        return {
          messages:[...state.messages, message]
        }
      });
    }
  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList
        messages={this.state.messages}/>
        <ChatBar
        currentUser={this.state.currentUser.name}
        addMessage={this.addMessage} />
      </div>
    );
  }
}


export default App;
