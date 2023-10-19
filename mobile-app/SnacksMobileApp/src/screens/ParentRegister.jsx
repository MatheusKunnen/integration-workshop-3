import React, { useState } from 'react';
import { View, Text, StyleSheet} from 'react-native';
import * as Colors from '../utils/colors.js';
import CustomButton from '../components/CustomButton.jsx';
import CustomTextInput from '../components/CustomTextInput.jsx';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomHeader from '../components/CustomHeader.jsx';
import RegisterParentService from '../services/RegisterParentService.jsx';
import LoginService from '../services/LoginService.jsx';
import { useAuth } from '../AuthContext';

function ParentRegister( { navigation } ) {
    const { login } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handlePress = async () => {
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        } else if (username === '' || password === '' || confirmPassword === '') {
            alert('Please fill all the fields');
            return;
        } else {
            await RegisterParentService.registerParent({
                email: username,
                password: password,
            }).then((response) => {
                console.log(response);
                if (response === null) {
                    alert('Parent already regitered');
                    navigation.navigate('Login');
                    return;
                } else {
                    handleLogin();
                }
            }).catch((error) => {
                console.log(error);
                alert('Failed to register parent');
            }); 
        }
    };

    const handleLogin = async () => {
        await LoginService.login({
            email: username,
            password: password,
        }).then((response) => {
            console.log(response);
            if (response === null) {
                alert('Invalid e-mail or password');
                return;
            } else {
                login({type: 'login', payload: response.token});
                navigation.navigate('Home');
            }
        }).catch((error) => {
            console.log(error);
            alert('Failed to login');
        });
    };
    
    return (
        <SafeAreaView style={styles.safeArea}>
            <CustomHeader 
                title="Create Account" 
                onPress={() => {
                    navigation.goBack();
                }}
            />

            <View style={styles.container}>
            <View style={styles.topSection}>

                <Text style={styles.text}>
                    E-mail
                </Text>
                <CustomTextInput
                    placeholder="Insert Here"
                    onChangeText={setUsername}
                    value={username}
                />

                <Text style={styles.text}>
                    Password
                </Text>
                <CustomTextInput
                    placeholder="Insert Here"
                    secureTextEntry={true}
                    onChangeText={setPassword}
                    value={password}
                />

                <Text style={styles.text}>
                    Confirm Password
                </Text>
                <CustomTextInput
                    placeholder="Insert Here"
                    secureTextEntry={true}
                    onChangeText={setConfirmPassword}
                    value={confirmPassword}
                />
            </View>

            <CustomButton
                title="Create"
                colorScheme="dark"
                onPress={handlePress}
            />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: Colors.beige,
    },
    container: {
        flex: 1,
        alignItems: 'left',
        justifyContent: 'center',
        padding: 40,
    },
    topSection: {
        flex: 1,
    },
    text: {
        fontSize: 24,
        fontWeight: '500',
        color: Colors.darkGray,
        marginBottom: 4,
    },
});

export default ParentRegister;