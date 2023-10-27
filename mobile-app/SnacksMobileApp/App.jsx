import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AuthProvider } from './src/AuthContext';
import Login from './src/screens/Login';
import Home from './src/screens/Home';
import ParentRegister from './src/screens/ParentRegister';
import ManageChildAccount from './src/screens/ManageChildAccount';
import AccountDetails from './src/screens/AccountDetails';

const Stack = createNativeStackNavigator();

function App() {
    return (
        <AuthProvider>
            <NavigationContainer>
                <Stack.Navigator
                    initialRouteName="Login"
                    screenOptions={{
                        headerShown: false
                    }}>
                    <Stack.Screen name="Login" component={Login} />
                    <Stack.Screen name="ParentRegister" component={ParentRegister} />
                    <Stack.Screen name="Home" component={Home} />
                    <Stack.Screen name="ManageChildAccount" component={ManageChildAccount} />
                    <Stack.Screen name="AccountDetails" component={AccountDetails} />
                </Stack.Navigator>
            </NavigationContainer>
        </AuthProvider>
    );
}

export default App;
