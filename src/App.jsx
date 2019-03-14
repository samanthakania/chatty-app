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
      currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: []
    };
  }

  addMessage = (message) =>{
    const newMessage = {
      id: uuidv1(),
      username: this.state.currentUser.name,
      content: message,
    }
    const messages = this.state.messages.concat(newMessage)
    this.setState({messages: messages})
    this.socket.send(JSON.stringify(newMessage))
  }

  componentDidMount() {
    this.socket = new WebSocket("ws://localhost:3001");
    // Connection opened
    this.socket.addEventListener('open', (event) => {
      // this.socket.send('Hello Server!');
    });
    // Listen for messages
    this.socket.addEventListener = (event) => {
      let parsedData = JSON.parse(event.data).data;
      let parsedType = JSON.parse(event.data).type;

      console.log(parsedData)

      if(parsedType === "incomingMessage")
      this.setState( state => {
        return {
          messages:[parsedData, ...state.messages]
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
        currentUser={this.state.currentUser.name} addMessage={this.addMessage} />
      </div>
    );
  }
}


export default App;
