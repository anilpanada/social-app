import React, {useState, createContext } from 'react';

const UserContext = createContext([{}, () => {}])

const UserProvider = (props) => {
    const [state, setstate] = useState({
        username: "",
        email: "",
        uid: "",
        isLoggedIn: null,
        profilePhotoUrl: "default"
    })

    return <UserContext.Provider value={[state, setstate]}>{props.children}</UserContext.Provider>

}

export {UserContext,UserProvider};