import { StatusBar } from 'expo-status-bar'
import { View, Text, ActivityIndicator} from 'react-native'
import axios from "axios"
import {Octicons, Ionicons, Fontisto } from '@expo/vector-icons'
import React, { useState } from 'react'
import{
    StyledContainer,
    InnerContainer,
    PageLogo,
    PageTitle,
    SubTitle,
    StyledFormArea,
    LeftIcon,
    StyledInputLabel, 
    StyledTextInput, 
    RightIcon, 
    ButtonText,
    StyledButton,
    Line,
    MessageBox,
    Colors,
    ExtraView, 
    ExtraText,
    TextLink,
    TextLinkContent
} from './../components/styles'
import { Formik } from 'formik'
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper'

const {brand, darkLight, primary} = Colors;

const LoginScreen = ({navigation}) => {

    const [hidePassword, setHidePassword] = useState(true);
    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState();

    const handleLogin = (credentials, setSubmitting) =>{
        handleMessage(null);
        const url = 'http://localhost:8888/larasix/api/login';
        axios.POST(url, credentials)
        .then((response) => {
            const result = response.data;
            const {message, status, data} = result;

            if(status !== 'SUCCESS') {
                handleMessage(message, status);
            } else{
                navigation.navigate('Home', {...data[0]});
            }
            setSubmitting(false);
        })
        .catch(error => {
            console.log(error.JSON());
            setSubmitting(false);
            handleMessage("An error occurred. Check your network and try again");
        })
    }

    const handleMessage = (message, type = 'FAILED') => {
        setMessage(message);
        setMessageType(type);
    }

  return (
    <KeyboardAvoidingWrapper>
    <StyledContainer>
        <StatusBar style='dark' />
        <InnerContainer>
            <PageLogo resizeMode="cover" source= {require('./../assets/1.png')} />
            <PageTitle>My Crib</PageTitle>
            <SubTitle>Login</SubTitle>

            <Formik
            initialValues={{email: '', password: ''}}
            onSubmit={(values, {setSubmitting}) => {
                if (values.email == '' || values.password == '') {
                    handleMessage('Please fill all fields');
                    setSubmitting(false);
                } else {
                    handleLogin(values, setSubmitting);
                }
            }}
            >
                {({handleChange, handleBlur, handleSubmit, values, isSubmitting}) => (<StyledFormArea>
                    <MyTextInput 
                        label= "Email Address"
                        icon = "mail"
                        placeholder = "teegee@gmail.com"
                        placeholderTextColor = {darkLight}
                        onChangeText = {handleChange('email')}
                        onBlur = {handleBlur('email')}
                        value={values.email}
                        keyboardType = "email-address"
                     />
                    <MyTextInput 
                        label= "Password"
                        icon = "lock"
                        placeholder = "* * * * * *"
                        placeholderTextColor = {darkLight}
                        onChangeText = {handleChange('password')}
                        onBlur = {handleBlur('password')}
                        value={values.password}
                        secureTextEntry = {hidePassword}
                        isPassword={true}
                        hidePassword={hidePassword}
                        setHidePassword={setHidePassword}
                     />
                     <MessageBox type= {messageType}>{message}</MessageBox>
                     {!isSubmitting &&(
                        <StyledButton onPress ={handleSubmit} >
                        <ButtonText>Login</ButtonText>
                     </StyledButton>)}

                     {isSubmitting && (
                        <StyledButton disabled={true}>
                        <ActivityIndicator size="large" color={primary} />
                     </StyledButton>)}

                     <Line />
                     <StyledButton google={true} onPress ={handleSubmit} >
                            <Fontisto name='google' color={primary} size={25} />
                        <ButtonText google={true}>Sign in with Google</ButtonText>
                     </StyledButton>
                     <ExtraView>
                        <ExtraText>No Account? </ExtraText>
                        <TextLink onPress={() =>navigation.navigate("Register")} >
                            <TextLinkContent>Sign Up</TextLinkContent>
                        </TextLink>
                     </ExtraView>
                </StyledFormArea>)}

            </Formik>

        </InnerContainer>
    </StyledContainer>
    </KeyboardAvoidingWrapper>
  )
}

const MyTextInput = ({label, icon, isPassword, hidePassword, setHidePassword, ...props}) =>{
    return(
        <View>
            <LeftIcon>
                <Octicons name={icon} size={30} color={brand} />
            </LeftIcon>
            <StyledInputLabel>{label}</StyledInputLabel>
            <StyledTextInput {...props} />
            {isPassword && (
                <RightIcon onPress={() => setHidePassword (!hidePassword)} >
                    <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye'} size={30} color={darkLight} />
                </RightIcon>
            )}
        </View>
    )
}

export default LoginScreen


// whispering-headland-00232.herokuapp.com