import React, { useContext, useState } from 'react';
import styled from 'styled-components/native';
import {StatusBar} from 'react-native';
import {Platform} from 'react-native';

import {AntDesign} from '@expo/vector-icons';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';

import Text from '../components/Text';
import Login from "./Login";

import { UserContext } from '../context/UserContext';
import { FirebaseContext } from '../context/firebaseContext';
// import { askAsync } from 'expo-permissions';

const Register = ({navigation}) => {
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [loading, setLoading] = useState(false);
    const [profilePhoto, setProfilePhoto] = useState();
    const Firebase = useContext(FirebaseContext);
    const [_, setUser] = useContext(UserContext);

    const getPermission = async () => {
        if(Platform.OS !== 'web'){
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            return status;
        }
    }

    const pickImage = async () => {
        try{
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.5
            })

            if(!result.cancelled){
                setProfilePhoto(result.uri);
            }
        } catch(error){
            console.log("Error @pickImage", error);
        }
    }

    const addProfilePhoto = async () => {
        const status = await getPermission();
        if (status !== "granted"){
            alert("we need permission to access your camera roll.");
            return;
        }
        pickImage();
    };

    const signUp = async () => {
        setLoading(true);

        const user = {username, email, password, profilePhoto}

        try{
            const createdUser = await Firebase.createUser(user);
            setUser({...createdUser, isLoggedIn: true});

        }catch(error) {
            console.log("error @signup", error);
        }finally {
            setLoading(false);
        }

    }; 

    return (
        <Container>
            <Main>
                <Text title center >Register to get started.</Text>
            </Main>

            <ProfilePhotoContainer onPress={addProfilePhoto}>
                {profilePhoto ? (
                    <ProfilePhoto source={{uri: profilePhoto}} />
                ) : (
                    <DefaultProfilePhoto>
                    <AntDesign name="plus" size={24} color="#ffffff" />
                </DefaultProfilePhoto>
                )}
            </ProfilePhotoContainer>

            <Auth>
            <AuthContainer>
                    <AuthTitle>Username:</AuthTitle>
                    <AuthField 
                        autoCapitalize="none"
                        autoCorrect={false}
                        autoFocus={false}
                        onChangeText={username => setUsername(username.trim())}
                        value={username}
                    />
                </AuthContainer>
                <AuthContainer>
                    <AuthTitle>Email Address</AuthTitle>
                    <AuthField 
                        autoCapitalize="none"
                        autoCompleteType="email"
                        autoCorrect={false}
                        keyboardType="email-address"
                        onChangeText={email => setEmail(email.trim())}
                        value={email}
                    />
                </AuthContainer>
                <AuthContainer>
                    <AuthTitle>Password</AuthTitle>
                    <AuthField 
                        autoCapitalize="none"
                        autoCompleteType="password"
                        autoCorrect={false}
                        secureTextEntry={true}
                        onChangeText={password => setPassword(password.trim())}
                        value={password}
                    />
                </AuthContainer>
            </Auth>

            <RegisterButton onPress={signUp} disabled={loading}>
                {loading ? (
                    <Loading />
                ) : (
                    <Text center bold color="#ffffff">
                        Register
                    </Text>
                )}
            </RegisterButton>
            <LoginButton onPress={() => navigation.navigate(Login)}>
                <Text small center>
                    Already have an account? {" "} <Text bold color="#8022d9">Login here..</Text></Text>
            </LoginButton>

            <HeaderGraphic>
                <RightCircle/>
                <LeftCircle/>
            </HeaderGraphic>
            <StatusBar barStyle="light-content" />
        </Container>
    )
}

export default Register;

const Container = styled.View`
    flex: 1;
    /* background-color: pink; */
`;

const Main = styled.View`
    margin-top: 160px;
`;

const ProfilePhotoContainer = styled.TouchableOpacity`
    background-color:  #e1e2e6;
    width: 80px;
    height: 80px;
    border-radius: 40px;
    align-self: center;
    margin-top:16px;
    overflow: hidden;
`;

const ProfilePhoto = styled.Image`
    flex: 1;
`;

const DefaultProfilePhoto = styled.View`
    align-items: center;
    justify-content: center;
    flex: 1;
`;

const Auth = styled.View`
    margin: 16px 32px 32px;
`;

const AuthContainer = styled.View`
    margin-bottom: 32px;
`;

const AuthTitle = styled(Text)`
    color: #8e93a1;
    font-size: 12px;
    text-transform: uppercase;
    font-weight: 300;
`;

const AuthField = styled.TextInput`
    border-bottom-color: #8e93a1;
    border-bottom-width: 0.5px;
    height: 48px;
`;

const RegisterButton = styled.TouchableOpacity`
    margin: 0 32px;
    align-items: center;
    justify-content: center;
    height: 48px;
    background-color: #8022d9;
    border-radius: 6px;
`;

const Loading = styled.ActivityIndicator.attrs((props) => ({
    color: "#ffffff",
    size: "small",
}))``;

const LoginButton = styled.TouchableOpacity`
    margin-top: 16px;
`;


const HeaderGraphic = styled.View`
    position: absolute;
    width: 100%;
    top: -50px;
    z-index: -100;
`;

const RightCircle = styled.View`
    background-color: #8022d9;
    position: absolute;
    width: 400px;
    height: 400px;
    border-radius: 200px;
    right: -100px;
    top: -200px;
`;

const LeftCircle = styled.View`
    background-color: #23a6d5;
    position: absolute;
    width: 200px;
    height: 200px;
    border-radius: 100px;
    left: -50px;
    top: -50px;
`;
