import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import {Colors} from './../components/styles'
const {primary, tertiary} = Colors


import LoginScreen from './../screens/LoginScreen';
import RegisterScreen from './../screens/RegisterScreen';
import HomeScreen from './../screens/HomeScreen';

const Stack = createStackNavigator();

const RootStack = () => {
    return(
        <NavigationContainer>
            <Stack.Navigator
            screenOptions={{
                headerStyle:{
                    backgroundColor: 'transparent'
                },
                headerTintColor: tertiary,
                headerTransparent:true,
                headerTitle: '',
                headerLeftContainerStyle: {
                    paddingLeft: 20
                }
            }}
            initialRouteName = "Login"
            >
                <Stack.Screen name ="Login" component={LoginScreen} />
                <Stack.Screen name ="Register" component={RegisterScreen} />
                <Stack.Screen options={{headerTintColor: primary}} name="Home" component={HomeScreen} />
                {/* // to change the color of the go-back button options={{headerTintColor: primary}} */}
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default RootStack