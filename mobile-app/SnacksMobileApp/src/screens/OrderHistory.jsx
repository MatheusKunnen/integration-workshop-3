import React, {useState, useEffect} from "react";
import { SafeAreaView, Text, View, StyleSheet, Dimensions, Image, FlatList} from "react-native";
import * as Colors from "../utils/colors.js";
import { useFocusEffect } from "@react-navigation/native";
import CustomHeader from "../components/CustomHeader.jsx";
import GetSnacks from "../services/GetSnacks.jsx";
import OrderHistoryService from "../services/OrderHistoryService.jsx";
import { useAuth } from "../AuthContext.jsx";

function OrderHistory ({route, navigation}) {
    const { child } = route.params;
    const {token} = useAuth();
    const [snacks, setSnacks] = useState([]);
    const [orders, setOrders] = useState([]);
    const dateOptions = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        timeZone: 'America/Sao_Paulo'
      };

    const getSnacksImageSet = async () => {
        await GetSnacks.execute().then((response) => {
            setSnacks(response);
        }).catch((error) => {
            console.log(error);
            alert('Failed to load snacks');
        });
    };

    const getOrderHistory = async () => {
        await OrderHistoryService.getHistory(child.id, token).then((response) => {
            console.log(response);
            if (response === null) {
                alert('Failed to get order history');
                
            } else {
                setOrders(response);
            }
        }).catch((error) => {
            console.log(error);
            alert('Failed to get order history');
        });
    }

    useEffect(() => {
        Promise.all([getSnacksImageSet(), getOrderHistory()])
            .catch((error) => {
                console.error(error);
                alert('Failed to load data');
            });
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <CustomHeader
                title={`Order History`}
                onPress={() => {
                navigation.goBack();
                }}
            />
            <View style={styles.content}>
                <FlatList
                    data={orders}
                    renderItem={({item, index}) => (
                        <View style={styles.item} key={index}>
                            <Image source={{uri: snacks[item.snackId - 1].image.url}} style={styles.image} />
                            <View style={styles.itemTextContainer}>
                                <Text style={styles.itemName}>{snacks[item.snackId - 1].name}</Text>
                                <Text style={styles.itemPrice}>
                                    R${String(item.price).slice(0, -2) || '0'},{String(item.price).slice(-2)}
                                </Text>
                                <Text style={styles.itemDate}>
                                    {new Date(item.createdAt).toLocaleString('pt-BR', dateOptions)}
                                </Text>
                            </View>
                        </View>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.beige,
        flex: 1
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 4
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 10,
        marginVertical: 10,
        borderRadius: 10,
        width: Dimensions.get('window').width * 0.9,
        borderRadius: 8,
        backgroundColor: Colors.lightPurple,
    },
    itemTextContainer: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginLeft: 10
    },
    itemName: {
        fontSize: 24,
        fontWeight: '500',
        color: Colors.darkGray
    },
    itemPrice: {
        fontSize: 24,
        fontWeight: '500',
        color: Colors.darkGray
    },
    itemDate: {
        fontSize: 20,
        fontWeight: '400',
        color: Colors.darkGray
    },
});

export default OrderHistory;

