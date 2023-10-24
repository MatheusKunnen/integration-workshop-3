import React from "react";
import {View } from "react-native";
import * as Colors from "../utils/colors.js";
import CustomButton from "../components/CustomButton.jsx";
import CustomHeader from "../components/CustomHeader.jsx";

function ManageChildAccount({ route,navigation}) {
    const { child } = route.params;
    return (
        <View style={{ flex: 1 }}>
            <CustomHeader
                title={`${child.name}'s Account`}
                onPress={() => {
                    navigation.goBack();
                }}
            />
        
            <View
                style={{
                flex: 1,
                alignItems: "center",
                backgroundColor: Colors.beige,
                paddingTop: 40,
                }}
            >
                <CustomButton
                    title={"View Account Details"}
                    colorScheme={"purple"}
                    onPress={() => navigation.navigate('AccountDetails', { child: child })}
                />

                <CustomButton
                    title={"Budget & Snacks"} 
                    colorScheme={"purple"}
                    onPress={() => navigation.navigate('BudgetAndSnacks', { child: child })}
                />
                
                <CustomButton
                    title={"Order History"} 
                    colorScheme={"purple"}
                    onPress={() => console.log("Order History button pressed")}
                />
            </View>
        </View>
    );
}

export default ManageChildAccount;
