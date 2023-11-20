import React from "react";
import { Text, StatusBar, View, TouchableOpacity, Image } from "react-native";
import * as Colors from "../utils/colors.js";
import BackIcon from "../assets/back_icon.svg";

function CustomHeader({ title, onPress}) {
    return (
        <View
        style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: Colors.purple,
            height: 60,
            padding: 15,
        }}>
            <StatusBar barStyle="dark-content" backgroundColor={Colors.purple} />
            
            <TouchableOpacity   
                style={{
                    backgroundColor: Colors.purple,
                    borderRadius: 10,
                    padding: 10,
                    marginRight: 10,
                }}
                onPress={onPress}>

                <BackIcon width={11} height={20} />
            </TouchableOpacity>

            <Text
                style={{
                fontSize: 24,
                color: Colors.darkGray,
                fontWeight: '500',
                }}
            >
                {title}
            </Text>
        </View>
    );
}

export default CustomHeader;
