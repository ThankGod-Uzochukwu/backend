import { StatusBar } from 'expo-status-bar'
import React from 'react'
import{
    InnerContainer,
    PageTitle,
    SubTitle,
    StyledFormArea,
    ButtonText,
    StyledButton,
    Line,
    HomeContainer,
    HomeImage,
    Avatar
} from './../components/styles'

const HomeScreen = ({navigation}) => {

  return (
    <>
        <StatusBar style='dark' />
        <InnerContainer>
                <HomeImage resizeMode="cover" source= {require('./../assets/2.png')}  />
            <HomeContainer>
            <PageTitle home = {true} >Inside Crib</PageTitle>
            <SubTitle home = {true} >Teegee</SubTitle>
            <SubTitle home = {true} >teegee@gmail.com</SubTitle>
                <StyledFormArea>
                <Avatar resizeMode="cover" source= {require('./../assets/1.png')} />
                    <Line />
                     <StyledButton onPress={() => navigation.navigate("Login")}>
                        <ButtonText>Logout</ButtonText>
                     </StyledButton>
                </StyledFormArea>

            </HomeContainer>

        </InnerContainer>
    </>
  )
}

export default HomeScreen