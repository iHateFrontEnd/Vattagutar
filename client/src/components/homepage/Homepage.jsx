import React from 'react';
import { createRoot } from 'react-dom/client';
import Scrollbars from 'react-custom-scrollbars-2';
import AddFriend from '../add-friend/AddFriend';
import JoinGroup from '../join-group/JoinGroup';
import TopBar from '../top-bar/TopBar';
import renderChat from '../../renderChat';
import './Homepage.css';
import { useState, useEffect } from 'react';

//this function pushes the buttons for groups
function genGroupBtn(chatData) {
  var groupsArr = [];

  if (chatData.length == 0) {
    groupsArr.push(
      <button onClick={renderAddGroups} className='addFriendsGroups'>Create or join groups</button>
    );
  } else {
    for (let i = 0; i <= chatData.groups.length - 1; i++) {
      groupsArr.push(
        <p>
          <button className="groups" onClick={() => renderChat(i, 'network', 'groups', null)} id={`group${i}`}>{chatData.groups[i]}</button>
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

  return groupsArr;
}

//this function pushes the button for friends
function genFriendsBtn(chatData) {
  var friendsArr = [];

  if (chatData.length == 0) {
    friendsArr.push(
      <button onClick={renderAddFriends} className='addFriendsGroups'>add friends</button>
    );
  } else {
    for (let i = 0; i <= chatData.friends.length - 1; i++) {
      friendsArr.push(
        <p>
          <button className='friends' onClick={() => { renderChat(i, 'network', 'dm', null) }} id={`friend${i}`}>{chatData.friends[i].username}</button>
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

  return friendsArr;
}

//rendering the page to create or join groups
function renderAddGroups() {
  const root = createRoot(document.getElementById('root'));
  root.render(<Homepage frame={JoinGroup} />);
}

//rendering the page to make friends
function renderAddFriends() {
  const root = createRoot(document.getElementById('root'));
  root.render(<Homepage frame={AddFriend} />);
}

//homepage
export default function Homepage(props) {
  const [friends, setFriends] = useState([]);
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const chatData = JSON.parse(localStorage.getItem('chatData'));

    setFriends(genFriendsBtn(chatData));
    setGroups(genGroupBtn(chatData));
  }, []);

  return (
    <>
      <TopBar />

      <table>
        <tbody>
          <tr>
            <td className='navBarTd'>
              <Scrollbars style={{ width: "100%", height: "100%" }}>
                <div className='navBar' id='navBar'>
                  <h2>Chat with: </h2>

                  <div className='friendsContainer' id='friendsContainer'>
                    {friends}
                  </div>

                  <h2>Chat in: </h2>

                  <div className='groupsContainer' id='groupsContainer'>
                    {groups}
                  </div>
                </div>
              </Scrollbars>
            </td>

            <td className='renderTd'>
              {props.frame}
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}