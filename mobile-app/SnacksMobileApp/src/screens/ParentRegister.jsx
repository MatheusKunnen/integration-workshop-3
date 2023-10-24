import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, CheckBox, TouchableOpacity, Image} from 'react-native';
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
    const termsText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget massa id ante feugiat consequat ac id felis. Nulla facilisi. Curabitur euismod ex quis arcu tristique, vel ultrices enim pharetra. Suspendisse in leo nulla. Sed vestibulum lectus nec scelerisque. Aenean a risus quis nisl egestas vulputate. Proin vel erat eu purus consequat congue. Duis cursus congue erat, vel efficitur risus tempus ac. Suspendisse potenti. Donec efficitur nec risus a bibendum. Donec laoreet tincidunt magna, nec accumsan sapien lobortis id.`;
    const [isChecked, setChecked] = React.useState(false);

    const handlePress = async () => {
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        } else if (username === '' || password === '' || confirmPassword === '') {
            alert('Please fill all the fields');
            return;
        } else if (!isChecked) {
            alert('Please agree to the terms and conditions');
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
    
    const updateChecked = () => {
        setChecked(!isChecked);
    }
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

                <View style={styles.termsContainer}>
                    <ScrollView style={styles.scrollView}>
                        <Text style={styles.termsText}>{termsText}</Text>
                    </ScrollView>

                    <TouchableOpacity
                        onPress={updateChecked}
                        style={styles.checkboxContainer}
                    >
                        {isChecked ?
                            <Image source={require( '../assets/tick-square.png' )} />
                            :
                            <Image source={require( '../assets/tick-square-empty.png')}/>
                        }

                        <Text style={styles.checkboxLabel}>I agree to the terms and conditions</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.bottomSection}>
                    <CustomButton
                        title="Create"
                        colorScheme="dark"
                        onPress={handlePress}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: Colors.beige,
        // height: '100%',
    },
    container: {
        flex: 1,
        alignItems: 'left',
        justifyContent: 'space-between',

    },
    topSection: {
        paddingHorizontal: 40,
    },
    text: {
        fontSize: 24,
        fontWeight: '500',
        color: Colors.darkGray,
        marginBottom: 4,
    },
    termsContainer: {
        flex: 1,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        marginHorizontal: 40,
    },
    scrollView: {
        flex: 1,
        flexGrow: 1,
    },
    termsText: {
        fontSize: 16,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkboxLabel: {
        fontSize: 16,
        marginLeft: 10,
    },
    bottomSection: {
        justifyContent: 'flex-end',
        marginHorizontal: 40,
        marginBottom: 40,
    },
});

export default ParentRegister;