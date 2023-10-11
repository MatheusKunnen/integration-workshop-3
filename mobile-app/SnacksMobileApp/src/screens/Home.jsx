import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import * as Colors from '../utils/colors.js';
import CustomButton from '../components/CustomButton';
import ChildCard from '../components/ChildCard';

function Home({username = 'Username'}) {

    const children = [{name: 'Ana', balance: '10,95'}, {name:'João', balance: '8,75'}];
    
    return (
        <View style={styles.container}>
        <View style={styles.topContainer}>
            <View style={styles.topSection}>
                <Image source={require('../assets/big_user_icon.png')} style={styles.icon} />
                <Text style={styles.greeting}>Hello, {username}!</Text>
            </View>

            <ScrollView style={styles.cardSection}>
                {children.map((child, index) => (
                    <ChildCard key={index} name={child.name} balance={child.balance} />
                ))}
            </ScrollView>
        </View>

        <CustomButton
            title={"Register Child"}
            colorScheme={"dark"}
            onPress={() => console.log('Register Child button pressed')}
        />
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
    backgroundColor: Colors.beige,
  },
  topContainer: {
    flex: 1,
  },
  topSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 50,
    height: 50,
    marginRight: 12,
  },
  greeting: {
    fontSize: 24,
    fontWeight: '500',
    color: Colors.darkGray,
  },
  cardSection: {
    marginTop: 40,
  },
  card: {
    backgroundColor: Colors.purple,
    padding: 20,
    borderRadius: 10,
    height: 112,
    marginBottom: 20,
  },
  cardText: {
    fontSize: 16,
  },
});

export default Home;
