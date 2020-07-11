import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { navigationRef } from './navigators/RootNavigation';
import { AuthStackNavigator } from './navigators/AuthStackNavigator';
import { AuthContext } from './context/AuthContext';
import { MainStackNavigator } from './navigators/MainStackNavigator';
import { rootReducer } from './reducers/rootReducer';
import { UserContext } from './context/UserContext';
import Splash from './components/Splash';

const rootStack = createStackNavigator();

export default function App() {
  const { auth, state } = rootReducer();

function  renderScreen(){
  if(state.loading){
    return <rootStack.Screen name={'splash'} component={Splash} />
  }
  return state.user ? (
    <rootStack.Screen name={'MainStack'}>
      {() => (
        <UserContext.Provider value={state}>
          <MainStackNavigator />
        </UserContext.Provider>
      )}
      </rootStack.Screen>
  )
  :(<rootStack.Screen name={'AuthStack'} component={AuthStackNavigator} />)

}

  return (
    <AuthContext.Provider value={auth}>
      <NavigationContainer ref={navigationRef}>
        <rootStack.Navigator
          screenOptions={{
            headerShown: false,
            animationEnabled: false
          }}>
          {renderScreen()}
        </rootStack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

