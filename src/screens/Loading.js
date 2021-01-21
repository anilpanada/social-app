import React, { useContext, useEffect } from 'react'
import styled from 'styled-components/native';
// import LottieView from "lottie-react-native";
import Text from '../components/Text';
import { UserContext } from '../context/UserContext';
import { FirebaseContext } from '../context/firebaseContext';

const Loading = () => {
    const [_, setUser] = useContext(UserContext);
    const Firebase = useContext(FirebaseContext);

    useEffect(() => {
        
        setTimeout(async () => {
            const user = Firebase.getCurrentUser();

            if(user){
                const userInfo = await Firebase.getuserInfo(user.uid);

                setUser({
                    isLoggedIn: true,
                    email: userInfo.email,
                    uid: user.uid,
                    username: userInfo.username,
                    profilePhotoUrl: userInfo.profilePhotoUrl,
                });
            } else{
                setUser((state) => ({ ...state, isLoggedIn: false}));
            }

        }, 1500);
    }, [])
    return (
            <Container>
                <Text title color="#ffffff" >Social App.</Text>
                {/* <LottieView
                    source={require("../../assets/peacock.json")}
                    autoPlay
                    loop
                    style={{width: "100%"}}
                /> */}
            </Container>
    );
}

export default Loading;

const Container = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    background-color: #222222;
`;