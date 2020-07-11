import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../components/Login';
import Regform from '../components/Regform';

const AuthStack = createStackNavigator();

export function AuthStackNavigator() {
    return (
        <AuthStack.Navigator
            screenOptions={{
                headerShown: false,
                animationEnabled: false
            }}>
            <AuthStack.Screen name={"Login"} component={Login} />
            <AuthStack.Screen name={"Registration"} component={Regform} />
        </AuthStack.Navigator>
    );
}

