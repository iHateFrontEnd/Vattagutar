import React from 'react';
import ReactDOM from 'react-dom';
import '../../App.css';

const CreateGroup = (
    <div className='createGroup' id='createGroup'>
        <h1>Enter your group name: </h1>

        <input className='concInfoInps' id='groupName' placeholder='Enter group name' required />

        <button className='loginBtn' onClick={createGroup}>Create</button>
    </div>
);

export default CreateGroup;
