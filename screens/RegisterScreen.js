import { StatusBar } from 'expo-status-bar'
import { View, Text, TouchableOpacity } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
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

const RegisterScreen = ({navigation}) => {

    const [hidePassword, setHidePassword] = useState(true);
    const  [show, setShow] = useState(false);
    const [date, setDate] = useState(new Date(2000, 0, 1));

    const [dob, setDob] = useState();

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(false);
        setDate(currentDate);
        setDob(currentDate);
    }

    const showDatePicker = () =>{
        setShow(true);
    }

  return (
    <KeyboardAvoidingWrapper>
    <StyledContainer>
        <StatusBar style='dark' />
        <InnerContainer>
            {/* <PageLogo resizeMode="cover" source= {require('./../assets/1.png')} /> */}
            <PageTitle>My Crib</PageTitle>
            <SubTitle>Register</SubTitle>
            { show &&(
                <DateTimePicker
                textID = "dateTimePicker"
                value={date}
                mode='date'
                is24Hour= {true}
                display = "default"
                onChange = {onChange}
                />
            )}

            <Formik
            initialValues={{fullName: '', email: '', dateOfBirth: '', password: '', confirmPassword: ''}}
            onSubmit={(values) => {
                console.log(values);
                navigation.navigate("Home");
            }}
            >
                {({handleChange, handleBlur, handleSubmit, values}) => (<StyledFormArea>
                    <MyTextInput 
                        label= "Full Name"
                        icon = "person"
                        placeholder = "teegee techie"
                        placeholderTextColor = {darkLight}
                        onChangeText = {handleChange('fullName')}
                        onBlur = {handleBlur('fullName')}
                        value={values.fullName}
                     />
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
                        label= "Date of Birth"
                        icon = "calendar"
                        placeholder = "YYYY - MM - DD"
                        placeholderTextColor = {darkLight}
                        onChangeText = {handleChange('dateOfBirth')}
                        onBlur = {handleBlur('dateOfBirth')}
                        value={dob ? dob.toDateString() : ''}
                        isDate= {true}
                        editable={false}
                        showDatePicker={showDatePicker}
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
                    <MyTextInput 
                        label= "Re-Type Password"
                        icon = "lock"
                        placeholder = "* * * * * *"
                        placeholderTextColor = {darkLight}
                        onChangeText = {handleChange('confirmPassword')}
                        onBlur = {handleBlur('confirmPassword')}
                        value={values.confirmPassword}
                        secureTextEntry = {hidePassword}
                        isPassword={true}
                        hidePassword={hidePassword}
                        setHidePassword={setHidePassword}
                     />
                     <MessageBox>...</MessageBox>
                     <StyledButton onPress ={handleSubmit} >
                        <ButtonText>Register</ButtonText>
                     </StyledButton>
                     <Line />
                     <ExtraView>
                        <ExtraText>Already Registered? </ExtraText>
                        <TextLink onPress={() => navigation.navigate("Login")} >
                            <TextLinkContent>Login</TextLinkContent>
                        </TextLink>
                     </ExtraView>
                </StyledFormArea>)}

            </Formik>

        </InnerContainer>
    </StyledContainer>
    </KeyboardAvoidingWrapper>
  )
}

const MyTextInput = ({label, icon, isPassword, hidePassword, setHidePassword, isDate, showDatePicker, ...props}) =>{
    return(
        <View>
            <LeftIcon>
                <Octicons name={icon} size={30} color={brand} />
            </LeftIcon>
            <StyledInputLabel>{label}</StyledInputLabel>
            {!isDate && <StyledTextInput{...props} />}
            {isDate && <TouchableOpacity onPress={showDatePicker} >
                <StyledTextInput{...props} />
            </TouchableOpacity>}
            {isPassword && (
                <RightIcon onPress={() => setHidePassword (!hidePassword)} >
                    <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye'} size={30} color={darkLight} />
                </RightIcon>
            )}
        </View>
    )
}

export default RegisterScreen