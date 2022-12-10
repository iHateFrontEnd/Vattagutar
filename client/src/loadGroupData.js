import configFile from './config.json';

async function loadGroupData() {
    const currentGroupData = JSON.parse(localStorage.getItem('currentGroupData'));
    
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            groupName: currentGroupData.groupName
        })
    }  

    const res = await fetch(`${configFile.serverURL}/load-group-data`, options);
    const data = await res.json();

    localStorage.setItem('currentGroupData', JSON.stringify({
        permittedUsers: data.permittedUsers,
        requestedUsers: data.requestedUsers,
        groupName: data.groupName
    }));
}

export default loadGroupData;
