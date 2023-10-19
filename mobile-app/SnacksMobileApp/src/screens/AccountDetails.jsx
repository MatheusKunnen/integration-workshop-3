import React, { useState } from "react";
import { Text, View, StyleSheet, Dimensions, Image, Modal, TouchableHighlight } from "react-native";
import * as Colors from "../utils/colors.js";
import CustomHeader from "../components/CustomHeader.jsx";
import CustomButton from "../components/CustomButton.jsx";
import { SafeAreaView } from "react-native-safe-area-context";
import DeleteChildAccountService from "../services/DeleteChildAccountService";
import { useAuth } from "../AuthContext";

function AccountDetails({ route,navigation}) {
    const { child } = route.params;
    const { token } = useAuth();
    const screenWidth = Dimensions.get('window').width;
    const [isPopupVisible, setIsPopupVisible] = useState(false);

    const togglePopup = () => {
        setIsPopupVisible(!isPopupVisible);
    };

    const handleDeleteAccount = async () => {
        await DeleteChildAccountService.deleteChildAccount(token, child.id).then((response) => {
            console.log(response);
            navigation.navigate('Home');
        }).catch((error) => {
            console.log(error);
            alert('Failed to delete child account');
        });
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <CustomHeader
                title={`Account Details`}
                onPress={() => {
                    navigation.goBack();
                }}
            />
            
            <View style={styles.container}>
                <View style={styles.topSection} >
                    <Text style={styles.text}>
                        Name
                    </Text>

                    <Text style={[styles.info, {width: screenWidth - 80}]}>
                        {child.name}
                    </Text>

                    <Text style={styles.text}>
                        NFC Tag
                    </Text>
                    
                    <Text style={[styles.info, {width: screenWidth - 80}]}>
                        {child.tagNumber}
                    </Text>

                    <Text style={styles.text}>
                        Password Image
                    </Text>

                    <Image 
                        source={{uri: child.passwordImage.url}} 
                        style={styles.passwordImage} 
                    />
                </View>

                <View style={styles.bottom}>

                    <CustomButton
                        title={"Delete Account"}
                        colorScheme={"red"}
                        onPress={togglePopup}   
                    />
                </View>

                <Modal
                    animationType={"fade"}
                    transparent={true}
                    visible={isPopupVisible}
                    onRequestClose={togglePopup}
                    statusBarTranslucent={true}
                >
                    <View style={styles.popupContainer}>
                        <View style={styles.popup}>
                            <Image 
                                source={require('../assets/trash.png')} 
                                style={styles.trashIcon} 
                            />
                            <Text style={styles.popupText}>
                                {`Are you sure you want to delete ${child.name}'s account?`}
                            </Text>

                            <CustomButton
                                title={"Delete"}
                                colorScheme={"red"}
                                onPress={handleDeleteAccount}
                            />

                            <CustomButton
                                title={"Cancel"}
                                colorScheme={"purple"}
                                onPress={togglePopup}
                            />

                        </View>
                    </View>
                </Modal>
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
        
    },
    topSection: {
        flex: 1,
        paddingHorizontal: 40,
        paddingBottom: 40,
    },
    text: {
        fontSize: 24,
        color: Colors.darkGray,
        fontWeight: '500',
        marginBottom: 4,
        marginTop: 20,
    },
    info: {
        backgroundColor: Colors.lightPurple, 
        borderRadius: 8, 
        padding: 8,
        marginBottom: 12,
        color: Colors.darkGray,
        fontWeight: '500',
        fontSize: 24
    },
    popupContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    popup: {
        backgroundColor: Colors.darkGray,
        opacity: 0.9,
        padding: 20,
        borderRadius: 8,
    },
    popupText: {
        fontSize: 24,
        color: Colors.beige,
        fontWeight: '500',
        textAlign: 'center',
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    trashIcon: {
        width: 48,
        height: 48,
        alignSelf: 'center',
        marginBottom: 10,
    },
    passwordImage: {
        width: 220,
        height: 220,
        borderRadius: 8,
        marginBottom: 12,
        alignSelf: 'center',
        borderColor: Colors.purple,
        borderWidth: 4
    },
    bottom: {
        marginHorizontal: 40,
        marginBottom: 40,
    },
});

export default AccountDetails;