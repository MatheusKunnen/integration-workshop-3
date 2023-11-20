import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import * as Colors from '../utils/colors.js';
import RightArrowIcon from '../assets/right_arrow_icon.svg';


function ChildCard({ name, totalSpent = "000", onPress }) {
  return (
    <View style={styles.card}>
      {name ? (
        <TouchableOpacity onPress={onPress}>
            <Text style={styles.nameText}>
                <Text style={styles.boldText}>{name}</Text> already spent
                </Text>

            <Text style={styles.balanceText}>
                R${totalSpent.slice(0, -2) || '0'},{totalSpent.slice(-2)}
            </Text>

            <View style={styles.iconContainer}>
                <RightArrowIcon style={styles.icon} />
                <Text style={styles.buttonIndicatorText}>Manage</Text>
            </View>
        </TouchableOpacity>
      ) : (
        <Text style={styles.emptyView}>You don't have a child registered</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: Colors.purple,
        padding: 12,
        borderRadius: 10,
        height: 112,
        marginBottom: 20,
      },
    boldText: {
        fontSize: 24,
        fontWeight: '700',
        color: Colors.darkGray,
    },
    nameText: {
        fontSize: 24,
        fontWeight: '500',
        color: Colors.darkGray,
    },
    balanceText: {
        fontSize: 32,
        fontWeight: '500',
        color: Colors.darkGray,
    },
    iconContainer: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        marginBottom: 8,
    },
    icon: {
        width: 8,
        height: 15,
        marginLeft: 8,
    },
    buttonIndicatorText: {
        fontSize: 16,
        fontWeight: '500', 
        color: Colors.darkGray,
    },
    emptyView: {
        fontSize: 24,
        fontWeight: '500',
        color: Colors.darkGray,
    },
});

export default ChildCard;