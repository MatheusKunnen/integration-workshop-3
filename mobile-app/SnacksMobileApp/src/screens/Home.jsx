import React, {useEffect} from 'react';
import { View, Text, StyleSheet, Image, ScrollView, StatusBar, SafeAreaView } from 'react-native';
import * as Colors from '../utils/colors.js';
import CustomButton from '../components/CustomButton';
import ChildCard from '../components/ChildCard';
import { useAuth } from '../AuthContext';
import GetChildrenService from '../services/GetChildrenService';
import OrderHistoryService from '../services/OrderHistoryService.jsx';
import GetBalanceService from '../services/GetBalanceService.jsx';
import { useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';

function Home({ navigation }) {

    const { token } = useAuth();

    const [children, setChildren] = useState([]);
    const [totalSpent, setTotalSpent] = useState([]);
    const [parentBalance, setParentBalance] = useState(0);

    const getTotalSpent = async (id) => {
        const total = await OrderHistoryService.getTotalSpent(id, token);
        return total;
    }

    const getParentBalance = async (token) => {
        const balance = await GetBalanceService.getBalance(token);
        return balance;
    }

    const fetchData = async () => {
      try {
          const childrenResponse = await GetChildrenService.getChildren(token);
          setChildren(childrenResponse);

          const totalSpentPromises = childrenResponse.map(async (child) => {
              const total = await getTotalSpent(child.id);
              return { id: child.id, total };
          });

          const totals = await Promise.all(totalSpentPromises);
          const totalSpentObject = totals.reduce((acc, { id, total }) => {
              acc[id] = total;
              return acc;
          }, {});

          setTotalSpent(totalSpentObject);

          // Fetch and set the parent balance
          const balance = await getParentBalance(token);
          setParentBalance(balance);
      } catch (error) {
          console.error(error);
          alert('Failed to load data');
      }
    };

    useFocusEffect(
      React.useCallback(() => {
        fetchData();
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

                <Text style={styles.balanceText}>Your Balance: R$ {String(parentBalance).slice(0, -2) || '0'},{String(parentBalance).slice(-2)}</Text>


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
  balanceText: {
    color: Colors.darkGray,
    fontSize: 24,
    fontWeight: '500',
    marginTop: 20,
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
