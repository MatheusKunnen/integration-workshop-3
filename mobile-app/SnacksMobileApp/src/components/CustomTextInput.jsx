import React from 'react';
import { View, TextInput, StyleSheet, Dimensions } from 'react-native';
import * as Colors from '../utils/colors.js';
import UserIcon from '../assets/user_icon.svg';
import LockIcon from '../assets/lock_icon.svg';

function CustomTextInput({ icon, placeholder, secureTextEntry, onChangeText, value }) {
  const screenWidth = Dimensions.get('window').width;

  return (
    <View style={[styles.inputContainer, {width: screenWidth - 80}]}>
      
      {icon === 'user' ?
        <UserIcon style={styles.icon}/> 
        : icon === 'lock' ? 
        <LockIcon style={styles.icon}/>
        : null }

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
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.lightPurple, 
    borderRadius: 8, 
    paddingHorizontal: 8,
    paddingVertical: Platform.OS === 'ios' ? 8 : 0,
    marginBottom: 12
  },
  icon: {
    marginRight: 8,
    width: 30,
    height: 30,
  },
  input: {
    flex: 1,
    color: Colors.darkGray,
    fontWeight: '500',
    fontSize: 24
  },
});

export default CustomTextInput;
