import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import * as Colors from '../utils/colors.js';
import { useFocusEffect } from '@react-navigation/native';
import AddCircleIcon from '../assets/add-circle.svg'; 
import MinusCircleIcon from '../assets/minus-circle.svg';

function BudgetControl({ allowedBudget, onBudgetChange }) {  
    const decrement = () => {
      if (parseInt(allowedBudget, 10) > 0) {
        onBudgetChange(String(parseInt(allowedBudget, 10) - 100));
      }
    };
  
    const increment = () => {
      onBudgetChange(String(parseInt(allowedBudget, 10) + 100));
    };

    useFocusEffect(
      React.useCallback(() => {
          onBudgetChange(allowedBudget);
      }, [allowedBudget, onBudgetChange])
    );
  
    const cents = String(allowedBudget).slice(-2); // Get the last two digits as cents
    const reais = String(allowedBudget).slice(0, -2) || '0'; // Get the remaining digits as dollars
  
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={decrement} style={styles.button}>
          <MinusCircleIcon style={styles.buttonImage} />
        </TouchableOpacity>
  
        <Text style={styles.number}>{`R$${reais},${cents}`}</Text>
  
        <TouchableOpacity onPress={increment} style={styles.button}>
          <AddCircleIcon style={styles.buttonImage} />
        </TouchableOpacity>
      </View>
    );
  }
  

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    button: {
        width: 36,
        height: 36,
    },
    buttonImage: {
        width: 36,
        height: 36,
    },
    buttonText: {
        fontSize: 32,
        fontWeight: '500',
        color: Colors.darkGray,
    },
    number: {
        overflow: 'hidden',
        borderRadius: 8,
        fontSize: 24,
        width: 170,
        backgroundColor: Colors.lightPurple,
        color: Colors.darkGray,
        textAlign: 'center',
        fontWeight: '500',
        padding: 4,
        margin: 10
    },
});

export default BudgetControl;