import React from 'react';
import ReactDOM from 'react-dom';
import Login from './components/login/Login.jsx';
import Homepage from './components/homepage/Homepage.jsx';
import Logo from './components/homepage/Logo.js';

function App() {
    try {
        const user = JSON.parse(localStorage.getItem('user'));

        if(user.isLoggedIn === true){
            return <Homepage frame={Logo} />;
        } else {
            return <Login />;
        }
    } catch(err) {
        return <Login />;
    }

    return <Login />;
}

export default App;
