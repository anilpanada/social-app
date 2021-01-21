import React, { useContext } from 'react'
// import { TouchableOpacity } from 'react-native'
import styled from 'styled-components/native';
import { UserContext } from '../context/UserContext';
import { FirebaseContext } from '../context/firebaseContext';

import Text from '../components/Text';

const Profile = () => {
    const [user, setUser] = useContext(UserContext);
    const Firebase =  useContext(FirebaseContext);

    const logout = async () => {
        const loggedOut = await Firebase.logout();

        if(loggedOut){
            setUser((state) => ({ ...state, isLoggedIn: false }));
        }
    }

    return (
        <Container>
            <ProfilePhotoContainer>
                <ProfilePhoto 
                    source={
                        user.profilePhotoUrl === "default" 
                            ? require("../../assets/default.jpg")
                            : { uri: user.profilePhotoUrl } 
                    }
                />
            </ProfilePhotoContainer>
            <Text medium bold margin="16px 0 32px 0">
                {user.username}
            </Text>

            <StatsContainer>
                <StatContainer>
                    <Text large light >21</Text>
                    <Text  bold small color="#c2c4cd">Posts</Text>
                </StatContainer>
                <StatContainer>
                    <Text large light >981</Text>
                    <Text  bold small color="#c2c4cd">Followers</Text>
                </StatContainer>
                <StatContainer>
                    <Text large light >63</Text>
                    <Text  bold small color="#c2c4cd">Following</Text>
                </StatContainer>
            </StatsContainer>

            <Logout onPress={logout} >
                <Text medium bold color="#23a8d9">Log Out</Text>
            </Logout>
        </Container>
    );
}

export default Profile;

const Container = styled.View`
    align-items: center;
    margin-top: 64px;
    flex: 1;
`;

const ProfilePhotoContainer = styled.View`
    /* shadow-opacity: 0.8;
    shadow-radius: 30px;
    shadow-color: #222222;
    box-shadow: 10px 10px 30px 15px rgba(0, 0, 0, 0.8);  
     */

`;

const ProfilePhoto = styled.Image`
    width: 128px;
    height: 128px;
    border-radius: 64px;
    /* border-style: solid;
    border-color: #222222; */

`;

const StatsContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    margin: 0 32px;
    flex: 1;
`;

const StatContainer = styled.View`
    align-items: center;
    flex: 1;
`;

const Logout = styled.TouchableOpacity`
    margin-bottom: 32px;
`;
