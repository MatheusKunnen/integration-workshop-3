import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AuthProvider } from './src/AuthContext';
import Login from './src/screens/Login';
import Home from './src/screens/Home';
import ParentRegister from './src/screens/ParentRegister';
import ManageChildAccount from './src/screens/ManageChildAccount';
import AccountDetails from './src/screens/AccountDetails';
import RegisterChild from './src/screens/RegisterChild';
import BudgetAndSnacks from './src/screens/BudgetAndSnacks';
import OrderHistory from './src/screens/OrderHistory';

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
                    <Stack.Screen name="RegisterChild" component={RegisterChild} />
                    <Stack.Screen name="BudgetAndSnacks" component={BudgetAndSnacks} />
                    <Stack.Screen name="OrderHistory" component={OrderHistory} />
                </Stack.Navigator>
            </NavigationContainer>
        </AuthProvider>
    );
}

export default App;
