import React, { useState } from 'react';
import { View, Text, StyleSheet} from 'react-native';
import * as Colors from '../utils/colors.js';
import CustomButton from '../components/CustomButton.jsx';
import CustomTextInput from '../components/CustomTextInput.jsx';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomHeader from '../components/CustomHeader.jsx';

function ParentRegister( { navigation } ) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

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
                    Username
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
                onPress={() => {
                    if (password !== confirmPassword) {
                        alert('Passwords do not match');
                        return;
                    } else if (username === '' || password === '' || confirmPassword === '') {
                        alert('Please fill all the fields');
                        return;
                    } else {
                        navigation.navigate('Home', {username: username});
                    }
                }}
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