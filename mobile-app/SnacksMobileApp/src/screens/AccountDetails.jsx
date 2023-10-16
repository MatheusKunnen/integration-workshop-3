import React from "react";
import { Text, View, StyleSheet, Dimensions } from "react-native";
import * as Colors from "../utils/colors.js";
import CustomHeader from "../components/CustomHeader.jsx";
import CustomButton from "../components/CustomButton.jsx";
import { SafeAreaView } from "react-native-safe-area-context";

function AccountDetails({ route,navigation}) {
    const { name, nfcTag, } = route.params;
    const screenWidth = Dimensions.get('window').width;

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
                        {name}
                    </Text>

                    <Text style={styles.text}>
                        NFC Tag
                    </Text>
                    
                    <Text style={[styles.info, {width: screenWidth - 80}]}>
                        {nfcTag}
                    </Text>

                    <Text style={styles.text}>
                        Password Image
                    </Text>
                </View>

                <CustomButton
                    title={"Delete Account"}
                    colorScheme={"red"}
                    onPress={() => console.log('Delete Account button pressed')}
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
        paddingHorizontal: 40,
        paddingBottom: 40,
    },
    topSection: {
        flex: 1,
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
});

export default AccountDetails;