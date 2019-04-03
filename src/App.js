import React, { Component } from 'react';
import './App.css';
import { NONAME } from 'dns';

function NameComponent (props) {
  return (
  <h1>{props.title}</h1>
  )
}

function ActiveFriendsComponent(props){
  return (
    <div>
      <h2>Active Friends</h2>
    <ul>
    {props.list.map((friend)=> (
      <li key={friend.name}>
        <span>{friend.name}</span>
        <button onClick={()=> props.onToggleFriend(friend.name)}>Deactivate</button>
      </li>
    ))}
  </ul> 
  </div>
  )
}

function InactiveFriendsComponent(props){
  return (
    <div>
      <h2>Inactive Friends</h2>
    <ul>
    {props.list.map((friend)=> (
      <li key={friend.name}>
        <span>{friend.name}</span>
        <button onClick={()=> props.onToggleFriend(friend.name)}>Activate</button>
      </li>
    ))}
  </ul> 
  </div>
  )
}


function FriendsList(props) {
return (
  <div> 
    <hr></hr>
    <h2>All Friends</h2>
    <ul>
      {props.list.map((friend)=> (
        <li key={friend.name}>
          <span>{friend.name}</span>
          <button onClick={()=> props.onRemoveFriend(friend.name)}>Remove</button>
        </li>
      ))}
    </ul> 
  </div>
)}

class App extends Component {
    constructor(props) {
      super(props)

      this.state = { 
        friends: [
          {name: 'Jake', 
           active: true
          }, 
          {name: 'Brian', 
           active: true
          }, 
          {name: 'Jordan', 
           active: false
          },
        ],  
        input: ''
      }
      this.handleRemoveFriend = this.handleRemoveFriend.bind(this)
      this.handleAddFriend = this.handleAddFriend.bind(this)
      this.handleClearFriends = this.handleClearFriends.bind(this)
      this.handleToggleFriends = this.handleToggleFriends.bind(this)
      this.updateInput = this.updateInput.bind(this)
    }

    handleAddFriend(){
      this.setState((currentState) => {
        return {
          friends: currentState.friends.concat([{
            name: currentState.input,
            active: true

          }]),
          input: '',
        }
        
      })
    }
    
    handleRemoveFriend(name){
      this.setState((currentState)=> {
        return {
           friends: currentState.friends.filter((friend)=> friend.name !== name)
        }

      })
    }

    handleToggleFriends(name){
        this.setState((currentState) => {
          const friend = currentState.friends.find((friend) => friend.name === name)

          return {
            friends : currentState.friends.filter((friend) => friend.name !== name)
            .concat([{
               name,
               active: !friend.active
            }])
        }
      })
    } 

    updateInput(e) {
      const value = e.target.value
      console.log('updateInput')
      this.setState(() => ({
        input: value
      }))
    } 

    handleClearFriends(){
      this.setState(() => {
        return {
          friends: [],
        }
      })
    }

  render() {
    return (
      <div>
        <NameComponent title='Friends' />
        <input
          type='text'
          placeholder='Add Friend'
          value={this.state.input}
          onChange={this.updateInput}/>
          <button onClick={this.handleAddFriend}>Submit</button>
          <button onClick={this.handleClearFriends}>Clear Friends</button>
        <FriendsList
          list={this.state.friends}
          onRemoveFriend={this.handleRemoveFriend}
         />
         <ActiveFriendsComponent
            list={this.state.friends.filter((friend) => friend.active === true)}
            onToggleFriend={this.handleToggleFriends}/>
         <InactiveFriendsComponent
            list={this.state.friends.filter((friend) => friend.active === false)}
            onToggleFriend={this.handleToggleFriends}/>
        
      </div>
    );
  }
}

export default App;
