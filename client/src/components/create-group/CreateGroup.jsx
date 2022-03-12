import configFile from '../../config.json';
import Logo from '../homepage/Logo';
import Homepage from '../homepage/Homepage';
import '../../App.css';

function createGroup() {
    const user = JSON.parse(localStorage.getItem('user'));
    const groupName = document.getElementById('groupName').value;

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            groupName: groupName,
            userIndex: user.userIndex
        })
    }

    fetch(`${configFile.serverURL}/create-group`, options);

    ReactDOM.render(
        <Homepage frame={Logo} />, document.getElementById('root')
    );

    window.location.reload();
    window.location.reload();
    window.location.reload();
    window.location.reload();
}

const CreateGroup = (
    <div className='createGroup' id='createGroup'>
        <h1>Enter your group name: </h1>

        <br />
        <br />

        <input className='concInfoInps' id='groupName' placeholder='Enter group name' required />

        <br />
        <br />
        <br />

        <button className='loginBtn' onClick={createGroup}>Create</button>
    </div>
);

export default CreateGroup;
