import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, StatusBar, SafeAreaView } from 'react-native';
import * as Colors from '../utils/colors.js';
import CustomButton from '../components/CustomButton';
import ChildCard from '../components/ChildCard';
import { useAuth } from '../AuthContext';
import { useFocusEffect } from '@react-navigation/native';
import GetChildrenService from '../services/GetChildrenService';
import OrderHistoryService from '../services/OrderHistoryService.jsx';
import { useState } from 'react';

function Home({ navigation }) {

    const { token } = useAuth();

    const [children, setchildren] = useState([]);
    const [totalSpent, setTotalSpent] = useState([]);

    const loadChildren = async () => {
        await GetChildrenService.getChildren(token).then((response) => {
            console.log(response);
            setchildren(response);
        }).catch((error) => {
            console.log(error);
            alert('Failed to load children');
        });
    };

    const getTotalSpent = async (id) => {
        const total = await OrderHistoryService.getTotalSpent(id, token);
        return total;
    }

    useFocusEffect(
        React.useCallback(() => {
            loadChildren();
            const array = totalSpent;
            children.forEach(async (child) => {
                
                const total = await getTotalSpent(child.id);
                array[child.id] = total;
            })
            setTotalSpent(array);

        }, [])
    );
    
    return (

      <SafeAreaView style={{flex:1}}>
        <StatusBar 
                  barStyle="dark-content" 
                  backgroundColor={styles.container.backgroundColor} 
        />

        <View style={styles.container}>
            <View style={styles.topContainer}>
                <View style={styles.topSection}>
                    <Image source={require('../assets/big_user_icon.png')} style={styles.icon} />
                    <Text style={styles.greeting}>{`Hello!`}</Text>
                </View>

                {children.length === 0 ? (
                  <View style={styles.cardSection}>
                    <ChildCard /> 
                  </View>
                ) : (
                <ScrollView style={styles.cardSection}>
                  
                    {children.map((child, index) => (
                        <ChildCard 
                            key={index} 
                            name={child.name} 
                            totalSpent={totalSpent[child.id] ? String(totalSpent[child.id]) : "000"}
                            onPress={() => {
                                navigation.navigate('ManageChildAccount', { child: child });
                            }}
                        />
                    ))}
                </ScrollView>
                )}
            </View>

            <CustomButton
                title={"Register Child"}
                colorScheme={"dark"}
                onPress={() => navigation.navigate('RegisterChild')}
            />
        </View>
        </SafeAreaView>
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
