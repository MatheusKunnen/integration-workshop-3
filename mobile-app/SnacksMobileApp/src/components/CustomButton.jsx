import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';
import * as Colors from '../utils/colors.js';

function CustomButton({ title, onPress, colorScheme}) {
    const screenWidth = Dimensions.get('window').width;

    const colorSchemes = {
        dark: {
            backgroundColor: Colors.darkGray,
            textColor: Colors.beige,
        },
        purple: {
            backgroundColor: Colors.purple,
            textColor: Colors.darkGray,
        },
        red: {
            backgroundColor: Colors.red, 
            textColor: Colors.darkGray, 
        },
        clear: {
            backgroundColor: Colors.beige, 
            textColor: Colors.darkGray,
        }
    };

    const fontSize = colorScheme === 'clear' ? 20 : 24;
    
    const { backgroundColor, textColor } = colorSchemes[colorScheme] || colorSchemes.dark;
    
    return (
    <TouchableOpacity style={[styles.button, { backgroundColor }, { width: screenWidth - 80 }]} onPress={onPress}>
        <Text style={[styles.buttonText, { color: textColor, fontSize: fontSize }]}>{title}</Text>
    </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
      borderRadius: 8, 
      paddingVertical: 18, 
      paddingHorizontal: 20,
      alignItems: 'center',
      marginTop: 12,
    },
    buttonText: {
      fontWeight: '500'
    },
});

export default CustomButton;