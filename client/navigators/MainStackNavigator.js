import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../components/Home';
import Matches from '../components/Matches';

const MainStack = createStackNavigator();

export function MainStackNavigator() {
    return (
        <MainStack.Navigator
            screenOptions={{
                // headerShown: false,
                animationEnabled: false
            }}>
            <MainStack.Screen name={"Your next friend"} component={Home} />
            <MainStack.Screen name={"Your Matches"} component={Matches} />
        </MainStack.Navigator>
    );
}

