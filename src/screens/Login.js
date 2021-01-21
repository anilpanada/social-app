import React, { useContext, useState } from 'react';
import styled from 'styled-components/native';
import {StatusBar} from 'react-native';
import Text from '../components/Text';
import Register from "./Register";

import { UserContext } from '../context/UserContext';
import { FirebaseContext } from '../context/firebaseContext';

const Login = ({navigation}) => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [loading, setLoading] = useState(false);
    const Firebase = useContext(FirebaseContext);
    const [_, setUser] = useContext(UserContext);

    const SignIn = async () => {
        setLoading(true);
        try{
            await Firebase.Login(email, password);
            
            const uid = Firebase.getCurrentUser().uid;

            const userInfo = await Firebase.getuserInfo(uid);

            setUser({
                username: userInfo.username,
                email: userInfo.email,
                uid,
                profilePhotoUrl: userInfo.profilePhotoUrl,
                isLoggedIn: true,
            });
        }catch(error){
            console.log("error@ SignIn;", error );
        }finally{
            setLoading(false);
        }
    }


    return (
        <Container>
            <Main>
                <Text title center >Welcome Back</Text>
            </Main>

            <Auth>
                <AuthContainer>
                    <AuthTitle>Email Address</AuthTitle>
                    <AuthField 
                        autoCapitalize="none"
                        autoCompleteType="email"
                        autoCorrect={false}
                        autoFocus={false}
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

            <LoginButton onPress={SignIn} disabled={loading}>
                {loading ? (
                    <Loading />
                ) : (
                    <Text center bold color="#ffffff">
                        Login
                    </Text>
                )}
            </LoginButton>
            <RegisterButton onPress={() => navigation.navigate(Register)}>
                <Text small center>
                    New to SocialApp? <Text bold color="#8022d9">Register here..</Text></Text>
            </RegisterButton>

            <HeaderGraphic>
                <RightCircle/>
                <LeftCircle/>
            </HeaderGraphic>
            <StatusBar barStyle="light-content" />
        </Container>
    )
}

export default Login

const Container = styled.View`
    flex: 1;
`;

const Main = styled.View`
    margin-top: 192px;
`;

const Auth = styled.View`
    margin: 64px 32px 32px;
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

const LoginButton = styled.TouchableOpacity`
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

const RegisterButton = styled.TouchableOpacity`
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
