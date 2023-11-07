import React, { useState } from 'react';
import { View, TextInput, Image, StyleSheet, Dimensions } from 'react-native';
import * as Colors from '../utils/colors.js';

function CustomTextInput({ iconSource, placeholder, secureTextEntry, onChangeText, value }) {
  const screenWidth = Dimensions.get('window').width;

  return (
    <View style={[styles.inputContainer, {width: screenWidth - 80}]}>
      {iconSource && <Image source={iconSource} style={styles.icon} />}
      
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor= {Colors.lightGray}
        secureTextEntry={secureTextEntry}
        onChangeText={onChangeText}
        value={value}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.lightPurple, 
    borderRadius: 8, 
    paddingHorizontal: 8,
    paddingVertical: Platform.OS === 'ios' ? 8 : 0,
    marginBottom: 12
  },
  icon: {
    width: 30,
    height: 30,
    marginRight: 8
  },
  input: {
    flex: 1,
    color: Colors.darkGray,
    fontWeight: '500',
    fontSize: 24
  },
});

export default CustomTextInput;
