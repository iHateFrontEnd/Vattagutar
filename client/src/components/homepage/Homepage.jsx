import React from 'react';
import ReactDOM from 'react-dom';
import Login from '../login/Login';
import AddFriend from '../add-friend/AddFriend';
import JoinGroup from '../join-group/JoinGroup';
import loadChatData from '../../loadChatData';
import '../../App.css';

var groupsArr = [];
var friendsArr = [];

var chatData = {
    friends: [],
    groups: []
};

try {
    chatData = JSON.parse(sessionStorage.getItem('chatData'));

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
} catch(err) {
    console.log(err);
    chatButtonsForFriends('add');
    chatButtonsForGroups('add');
}

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
    }
}

//this function pushes the button for friends
function chatButtonsForFriends(type) {
    if(type === 'add') {
        friendsArr.push(
            <button onclick={renderAddFriends} className='addFriendsGroups'>add friends</button>
        );
    } else {
        for (let i = 0; i <= chatData.friends.length - 1; i++) {
            friendsArr.push(
                <p>
                    <button className='friends' id={`friend${i}`}>{chatData.friends[i]}</button>
                </p>
            );
        }
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
    const addFriendContainer = document.getElementById('addFriend');
    addFriendContainer.style.transform = '1s ease';
}

//homepage
class Homepage extends React.Component {
    render() {
        return (
            <table>
                <tbody>
                    <tr>
                        <td className='navBarTd'>
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
                        </td>

                        <td className='renderTd'>{ this.props.frame }</td>
                    </tr>
                </tbody>
            </table>
        );
    }
}

export default Homepage;
