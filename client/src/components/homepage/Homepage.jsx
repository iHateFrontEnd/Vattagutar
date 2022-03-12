import React from 'react';
import ReactDOM from 'react-dom';
import { Scrollbars } from 'react-custom-scrollbars-2';
import Login from '../login/Login';
import Logo from './Logo';
import AddFriend from '../add-friend/AddFriend';
import JoinGroup from '../join-group/JoinGroup';
import '../../App.css';

var groupsArr = [];
var friendsArr = [];

var chatData = {
    friends: [],
    groups: []
}

var catchCounter = 0;

function renderChatData() {
    try {
        console.log('in try');

        chatData = JSON.parse(localStorage.getItem('chatData'));

        if (chatData.friends.length === 0 && chatData.groups.length === 0) {
            chatButtonsForFriends('add');
            chatButtonsForGroups('add');
        } else if(chatData.friends.length > 0 && chatData.groups.length > 0) {
            chatButtonsForFriends('buttons');
            chatButtonsForGroups('buttons');
        } else if(chatData.friends.length === 0 && chatData.groups.length > 0) {
            chatButtonsForGroups('buttons');
            chatButtonsForFriends('add');
        } else if(chatData.friends.length > 0 && chatData.groups.length === 0) {
            chatButtonsForFriends('buttons');
            chatButtonsForGroups('add');
        }
    } catch (err) {
        console.log(err);

        catchCounter++;

        if(catchCounter === 3) {
            renderChatData()
        }

        console.log(catchCounter);
    }
}

renderChatData();

//this function pushes the buttons for groups
function chatButtonsForGroups(type) {
    if(type === 'add') {
        groupsArr.push(
            <button onClick={renderAddGroups} className='addFriendsGroups'>Create or join groups</button>
        );
    } else {
        for (let i = 0; i <= chatData.groups.length - 1; i++) {
            groupsArr.push(
                <p>
                    <button className="groups" id={`group${i}`}>{chatData.groups[i]}</button>
                </p>
            );
        }
        
        groupsArr.push(
            <>
                <br />
                
                <button onClick={renderAddGroups} className='addFriendsGroups'>Create or join groups</button>
            </>
        );
    }
}

//this function pushes the button for friends
function chatButtonsForFriends(type) {
    if(type === 'add') {
        friendsArr.push(
            <button onClick={renderAddFriends} className='addFriendsGroups'>add friends</button>
        );
    } else {
        for (let i = 0; i <= chatData.friends.length - 1; i++) {
            friendsArr.push(
                <p>
                    <button className='friends' id={`friend${i}`}>{chatData.friends[i]}</button>
                </p>
            );
        }

        friendsArr.push(
            <> 
                <br />

                <button onClick={renderAddFriends} className='addFriendsGroups'>add friends</button>
            </>
        );
    }
}

//rendering the page to create or join groups
function renderAddGroups() {
    ReactDOM.render(
        <Homepage frame={JoinGroup} />, document.getElementById('root')
    );
}

//rendering the page to make friends
function renderAddFriends() {
    ReactDOM.render(
        <Homepage frame={AddFriend} />, document.getElementById('root')
    );
}

//homepage
class Homepage extends React.Component {
    render() {
        return (
            <table>
                <tbody>
                    <tr>
                        <td className='navBarTd'>
                            <Scrollbars style={{ width: "100%", height: "100%"}}>
                                <div className='navBar' id='navBar'>
                                    <h2>Chat with: </h2>

                                    <div className='friendsContainer' id='friendsContainer'>
                                        { friendsArr }
                                    </div>

                                    <h2>Chat in: </h2>

                                    <div className='groupsContainer' id='groupsContainer'>
                                        { groupsArr }
                                    </div>
                                </div>
                            </Scrollbars>
                        </td>

                        <td className='renderTd'>{ this.props.frame }</td>
                    </tr>
                </tbody>
            </table>
        );
    }
}

export default Homepage;
